"use client";

import React from "react";
import { useRouter } from "next/navigation";

import styles from "./SearchInput.module.scss";

import { SendIcon } from "../../atoms/sendIcon";

export const SearchInput = () => {
  const router = useRouter();

  return (
    <div className={styles.inputWrapper}>
      <input className={styles.searchInput} placeholder="Напишите запрос..." />
      <SendIcon onClickHandler={() => router.push("/chatNotPicked")} />
    </div>
  );
};
