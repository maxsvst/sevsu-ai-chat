"use client";

import React, { useEffect } from "react";

import { useSelector } from "react-redux";

import { getUser, selectUser } from "@/entities/user/model/userSlice";
import { setProfileVisibility } from "@/entities/modal/model/modalSlice";
import { useAppDispatch } from "@/app/store";

import { WithModal } from "@/entities/user/ui";
import { CloseIcon } from "../../atoms/closeIcon";
import { ProfileIcon } from "../../atoms/profileIcon";

import styles from "./ProfileModal.module.scss";

const ProfileModal = () => {
  const dispatch = useAppDispatch();
  const { fullName, email, weight, height } = useSelector(selectUser);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div className={styles.profileModalWrapper}>
      <CloseIcon clickHandler={() => dispatch(setProfileVisibility(false))} />
      <div className={styles.profileModalTitle}>Профиль</div>
      <div className={styles.profileModalForm}>
        <div className={styles.profileModalFormItem}>
          <ProfileIcon />
          {fullName}
        </div>
        <hr className={styles.profileModalDivider} />
        <div className={styles.profileModalFormItem}>{email}</div>
        <div className={styles.profileModalFormItem}>Вес - {weight}</div>
        <div className={styles.profileModalFormItem}>Рост - {height}</div>
      </div>
    </div>
  );
};

export default WithModal(ProfileModal, "profile");
