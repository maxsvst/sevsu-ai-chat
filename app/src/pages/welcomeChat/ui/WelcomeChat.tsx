"use client";

import React from "react";

import { useSelector } from "react-redux";

import { selectModal } from "@/entities/modal/model/modalSlice";

import { Hints } from "@/shared/ui/molecules/hints";
import { Header } from "@/shared/ui/molecules/header";
import { SearchInput } from "@/shared/ui/molecules/searchInput";

import styles from "./WelcomeChat.module.scss";

export function WelcomeChat() {
  const { isSettingsVisible, isProfileVisible, isQuitVisible } =
    useSelector(selectModal);

  const isBlur = isSettingsVisible || isProfileVisible || isQuitVisible;

  return (
    <div className={isBlur ? styles.wrapperBlured : styles.wrapper}>
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
