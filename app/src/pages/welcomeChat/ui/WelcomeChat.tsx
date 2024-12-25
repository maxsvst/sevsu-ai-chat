"use client";

import React, { useState } from "react";

import styles from "./WelcomeChat.module.scss";

import { Header } from "@/shared/ui/molecules/header";
import { Hints } from "@/shared/ui/molecules/hints";
import { SearchInput } from "@/shared/ui/molecules/searchInput";
import { api } from "@/shared/api";
import { useSelector } from "react-redux";
import { selectModal } from "@/entities/modal/model/modalSlice";

export function WelcomeChat() {
  const { isSettingsVisible } = useSelector(selectModal);

  return (
    <div className={isSettingsVisible ? styles.wrapperBlured : styles.wrapper}>
      <Header />
      <section className={styles.sectionWrapper}>
        <article className={styles.sectionArticle}>
          Чем я могу Вам помочь?
        </article>
        <Hints />
        <SearchInput />
      </section>
    </div>
  );
}
