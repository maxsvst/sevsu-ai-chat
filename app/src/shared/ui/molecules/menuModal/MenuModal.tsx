"use client";

import React from "react";

import { usePathname } from "next/navigation";

import {
  setMenuVisibility,
  setProfileVisibility,
  setQuitVisibility,
  setSettingsVisibility,
} from "@/entities/modal/model/modalSlice";
import { useAppDispatch } from "@/app/store";

import { QuitIcon } from "../../atoms/quitIcon";
import { SettingsIcon } from "../../atoms/settingsIcon";
import { SmallProfileIcon } from "../../atoms/smallProfile";

import styles from "./MenuModal.module.scss";

export const MenuModal = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  return (
    <div
      className={
        pathname === "/chat" ? styles.menuModalWelcome : styles.menuModal
      }
    >
      <button
        className={styles.menuItem}
        onClick={() => {
          dispatch(setMenuVisibility(false));
          dispatch(setProfileVisibility(true));
        }}
      >
        <SmallProfileIcon />
        <span style={{ userSelect: "none" }}>Профиль</span>
      </button>
      <button
        className={styles.menuItem}
        onClick={() => {
          dispatch(setMenuVisibility(false));
          dispatch(setSettingsVisibility(true));
        }}
      >
        <SettingsIcon />
        <span style={{ userSelect: "none" }}>Настройки</span>
      </button>
      <hr className={styles.menuItemDivider} />
      <button
        className={styles.menuItem}
        onClick={() => {
          dispatch(setMenuVisibility(false));
          dispatch(setQuitVisibility(true));
        }}
      >
        <QuitIcon />
        <span style={{ userSelect: "none" }}>Выйти</span>
      </button>
    </div>
  );
};
