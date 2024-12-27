"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { WithModal } from "@/entities/user/ui";
import { CloseIcon } from "../../atoms/closeIcon";

import { resetChat } from "@/entities/chat/model/chatSlice";
import { logout, resetUser } from "@/entities/user/model/userSlice";
import { setQuitVisibility } from "@/entities/modal/model/modalSlice";
import { useAppDispatch } from "@/app/store";

import styles from "./QuitModal.module.scss";

const QuitModal = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <div className={styles.quitModalWrapper}>
      <CloseIcon clickHandler={() => dispatch(setQuitVisibility(false))} />
      <div className={styles.quitModalTitle}>Выход</div>
      <span className={styles.quitModalDesc}>
        Вы действительно хотиты выйте из аккаунта?
      </span>
      <div className={styles.quitBtnWrapper}>
        <button
          className={styles.quitModalCancelBtn}
          onClick={() => dispatch(setQuitVisibility(false))}
        >
          Отмена
        </button>
        <button
          className={styles.quitModalLeaveBtn}
          onClick={() => {
            dispatch(setQuitVisibility(false));
            dispatch(logout());
            dispatch(resetUser());
            dispatch(resetChat());
            router.push("/");
          }}
        >
          Выйти
        </button>
      </div>
    </div>
  );
};

export default WithModal(QuitModal, "quit");
