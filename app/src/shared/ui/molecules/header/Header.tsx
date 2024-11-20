"use client";

import React from "react";

import styles from "./Header.module.scss";

import { HealthIconSmall } from "../../atoms/healthIconSmall";
import { ProfileIcon } from "../../atoms/profileIcon";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  return (
    <div className={styles.header}>
      <div className={styles.headerItem} onClick={() => router.push("/")}>
        <HealthIconSmall />
        AIChat
      </div>
      <div className={styles.headerItem}>
        Ivan Ivanov
        <ProfileIcon />
      </div>
    </div>
  );
};
