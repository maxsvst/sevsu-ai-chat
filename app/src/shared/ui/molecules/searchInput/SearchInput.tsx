"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./SearchInput.module.scss";

import { SendIcon } from "../../atoms/sendIcon";
import { api } from "@/shared/api";
import { title } from "process";

export const SearchInput = () => {
  const router = useRouter();

  const [message, setMessage] = useState("");

  const clickHandler = async () => {
    const chat = await api.post("/chat", JSON.stringify({ title: message }));
    const messageRes = await api.get(`/ai/get-mock-answer/${chat.id}/${message}`);
    const chats = await api.get("/chat");
    router.push(`/chatPicked/${chat.id}`)
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={styles.searchInput}
        placeholder="Напишите запрос..."
      />
      <SendIcon onClickHandler={clickHandler} />
    </div>
  );
};
