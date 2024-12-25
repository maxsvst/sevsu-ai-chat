"use client";

import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  selectModal,
  setMenuVisibility,
} from "@/entities/modal/model/modalSlice";
import { getUser, selectUser } from "@/entities/user/model/userSlice";
import { useAppDispatch } from "@/app/store";

import QuitModal from "../quitModal/QuitModal";
import ProfileModal from "../profileModal/ProfileModal";
import { ProfileIcon } from "../../atoms/profileIcon";
import SettingsModal from "../settingsModal/SettingsModal";
import { HealthIconSmall } from "../../atoms/healthIconSmall";

import styles from "./Header.module.scss";
import { MenuModal } from "../menuModal/MenuModal";

export const Header = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isSettingsVisible, isQuitVisible, isProfileVisible, isMenuVisible } =
    useSelector(selectModal);
  const { fullName } = useSelector(selectUser);

  useEffect(() => {
    dispatch(getUser());
  }, [fullName]);

  return (
    <div className={styles.header}>
      <div className={styles.headerItem} onClick={() => router.push("/")}>
        <HealthIconSmall />
        <span style={{ userSelect: "none" }}>AIChat</span>
      </div>
      <div className={styles.headerItemWrapper}>
        <div
          className={styles.headerItem}
          onClick={() => dispatch(setMenuVisibility(!isMenuVisible))}
        >
          <span style={{ userSelect: "none" }}>{fullName}</span>
          <ProfileIcon />
        </div>
        {isMenuVisible && <MenuModal />}
      </div>
      {isSettingsVisible && <SettingsModal />}
      {isQuitVisible && <QuitModal />}
      {isProfileVisible && <ProfileModal />}
    </div>
  );
};
