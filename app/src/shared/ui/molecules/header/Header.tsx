"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import {
  selectModal,
  setMenuVisibility,
  setSettingsVisibility,
} from "@/entities/modal/model/modalSlice";
import { getUser, selectUser } from "@/entities/user/model/userSlice";
import { useAppDispatch } from "@/app/store";

import { HealthIconSmall } from "../../atoms/healthIconSmall";
import { ProfileIcon } from "../../atoms/profileIcon";
import SettingsModal from "../settingsModal/SettingsModal";
import { SmallProfileIcon } from "../../atoms/smallProfile";

import styles from "./Header.module.scss";
import { SettingsIcon } from "../../atoms/settingsIcon";
import { QuitIcon } from "../../atoms/quitIcon";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { isSettingsVisible, isMenuVisible } = useSelector(selectModal);
  const { fullName } = useSelector(selectUser);

  const router = useRouter();

  useEffect(() => {
    dispatch(getUser());
  }, [fullName]);

  const backToRoot = () => router.push("/");

  console.log(isSettingsVisible);

  return (
    <div className={styles.header}>
      <div className={styles.headerItem} onClick={backToRoot}>
        <HealthIconSmall />
        AIChat
      </div>
      <div className={styles.headerItemWrapper}>
        <div
          className={styles.headerItem}
          onClick={() => dispatch(setMenuVisibility(!isMenuVisible))}
        >
          {fullName}
          <ProfileIcon />
        </div>
        {isMenuVisible && (
          <div className={styles.menuModal}>
            <button className={styles.menuItem}>
              <SmallProfileIcon />
              <span>Профиль</span>
            </button>
            <button
              className={styles.menuItem}
              onClick={() => {
                dispatch(setMenuVisibility(false));
                dispatch(setSettingsVisibility(true));
              }}
            >
              <SettingsIcon />
              <span>Настройки</span>
            </button>
            <button className={styles.menuItem} onClick={backToRoot}>
              <QuitIcon />
              <span>Выйти</span>
            </button>
          </div>
        )}
      </div>

      {isSettingsVisible && <SettingsModal />}
      {/* {isQuitVisible && (<)} */}
    </div>
  );
};
