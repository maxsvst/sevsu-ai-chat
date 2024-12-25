"use client";

import React, { useEffect, useState } from "react";
import styles from "./SettingsModal.module.scss";
import { WithUserModal } from "@/entities/user/ui";
import { Input } from "../input";
import { CloseIcon } from "../../atoms/closeIcon";
import { api } from "@/shared/api";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/app/store";
import { useSelector } from "react-redux";
import { editUser, getUser, selectUser } from "@/entities/user/model/userSlice";
import { setSettingsVisibility } from "@/entities/modal/model/modalSlice";

const SettingsModal = () => {
  const dispatch = useAppDispatch();
  const { fullName, email, weight, height } = useSelector(selectUser);

  const {
    register,
    reset,
    handleSubmit,
    // formState: { errors },
  } = useForm<any>({
    // resolver: zodResolver(FormDataSchema),
  });

  // console.log(fullName, email, weight, height);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const processForm: any = async (data: any) => {
    const { fullName, email, weight, height } = data;
    const payload: any = {};

    if (!!fullName) {
      payload.fullName = fullName;
    }
    if (!!email) {
      payload.email = email;
    }
    if (!!weight) {
      payload.weight = weight;
    }
    if (!!height) {
      payload.height = height;
    }

    dispatch(editUser(payload));
    dispatch(setSettingsVisibility(false));
  };

  return (
    <form
      className={styles.settingsModalWrapper}
      onSubmit={handleSubmit(processForm)}
    >
      <CloseIcon clickHandler={() => dispatch(setSettingsVisibility(false))} />
      <div className={styles.settingsModalTitle}>Настройки</div>
      <div className={styles.settingsModalForm}>
        <Input
          type="text"
          placeholder={fullName || "Имя"}
          register={register("fullName")}
        />
        <Input
          type="text"
          placeholder={email || "E-mail"}
          register={register("email")}
        />
        <hr className={styles.settingsModalDivider} />
        <Input
          type="number"
          placeholder={String(height) || "Рост"}
          register={register("height")}
        />
        <Input
          type="number"
          placeholder={String(weight) || "Вес"}
          register={register("weight")}
        />
        <hr className={styles.settingsModalDivider} />
        <Input type="password" placeholder="Новый пароль" />
      </div>
      <button className={styles.settingsModalSaveBtn} type="submit">
        Сохранить
      </button>
    </form>
  );
};

export default WithUserModal(SettingsModal);
