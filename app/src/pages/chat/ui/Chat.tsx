import React from "react";

import styles from "./Chat.module.scss";

import { Header } from "@/shared/ui/molecules/header";
import { Hints } from "@/shared/ui/molecules/hints";
import { SearchInput } from "@/shared/ui/molecules/searchInput";

export const Chat = () => {
  return (
    <div className={styles.wrapper}>
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
};
