"use client";

import { ProfileIcon } from "@/shared/ui/atoms/profileIcon";
import React, { ReactElement } from "react";
import styles from "./ChatPicked.module.scss";
import { HealthIconSmall } from "@/shared/ui/atoms/healthIconSmall";
import { SendIcon } from "@/shared/ui/atoms/sendIcon/SendIcon";
import { NextButton } from "@/shared/ui/molecules/nextButton";
import { NewChatIcon } from "@/shared/ui/atoms/newChatIcon";
import { useRouter } from "next/navigation";
import { Header } from "@/shared/ui/molecules/header";

export interface ChatElement {
  id: number;
  theme: string;
  message: string;
  time: string;
}

export interface Message {
  id: number;
  type: "IN" | "OUT";
  text: string;
  time: string;
}

export const IconBuffer = ({ children }: { children: ReactElement }) => {
  return <>{children}</>;
};

export const ChatPicked = () => {
  const chatsArray: ChatElement[] = [
    {
      id: 0,
      theme: "Тема чата",
      message: "Сообщение",
      time: "10:00",
    },
  ];

  const messagesArray: Message[] = [
    {
      id: 0,
      type: "IN",
      text: "qwerqwerqwQWEQWEQWEQWWWWWWWWWWerwq",
      time: "10:00",
    },
    {
      id: 1,
      type: "OUT",
      text: "qwerqwerqwerwq",
      time: "10:00",
    },
    {
      id: 2,
      type: "OUT",
      text: "qwerqwerqwerwq",
      time: "10:00",
    },
    {
      id: 3,
      type: "OUT",
      text: "qwerqwerqwerwq",
      time: "10:00",
    },
    {
      id: 4,
      type: "OUT",
      text: "qwerqwerqwerwq",
      time: "10:00",
    },
    {
      id: 5,
      type: "OUT",
      text: "qwerqwerqwerwq",
      time: "10:00",
    },
    {
      id: 6,
      type: "OUT",
      text: "qwerqwerqwerwq",
      time: "10:00",
    },
    {
      id: 6,
      type: "OUT",
      text: "qwerqwerqwerwq",
      time: "10:00",
    },
    {
      id: 6,
      type: "OUT",
      text: "qwerqwerqwerwq",
      time: "10:00",
    },
    {
      id: 6,
      type: "OUT",
      text: "qwerqwerqwerwq",
      time: "10:00",
    },
  ];

  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <section className={styles.chatSectionWrapper}>
        <ul className={styles.chatListWrapper}>
          {chatsArray.map(({ id, theme, message, time }) => (
            <li key={id} className={styles.chatItemWrapper}>
              <div className={styles.chatItem}>
                <span>{theme}</span>
                <span style={{ fontSize: "12px" }}>{message}</span>
              </div>
              <span style={{ fontSize: "12px" }}>{time}</span>
            </li>
          ))}
        </ul>
        <NextButton text="Новый чат" icon={<NewChatIcon />} />
      </section>
      <section className={styles.chatWrapper}>
        <Header />
        <ul className={styles.chat}>
          {messagesArray.map(({ id, type, text, time }) => (
            <li key={id} className={styles.chatMessage}>
              <span style={{ fontSize: "14px" }}>{text}</span>
              <span style={{ alignSelf: "end", fontSize: "12px" }}>{time}</span>
            </li>
          ))}
        </ul>
        <div className={styles.inputWrapper}>
          <input
            className={styles.searchInput}
            placeholder="Напишите запрос..."
          />
          <SendIcon onClickHandler={() => router.push("/")} />
        </div>
      </section>
    </div>
  );
};
