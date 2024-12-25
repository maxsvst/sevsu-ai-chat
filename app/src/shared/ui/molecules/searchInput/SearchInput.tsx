"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { api } from "@/shared/api";
import { SendIcon } from "../../atoms/sendIcon";

import styles from "./SearchInput.module.scss";

export const SearchInput = () => {
  const router = useRouter();

  const [message, setMessage] = useState("");

  const clickHandler = async () => {
    const chat = await api.post("/chat", JSON.stringify({ title: message }));
    const messageRes = await api.get(
      `/ai/get-mock-answer/${chat.id}/${message}`
    );
    const chats = await api.get("/chat");
    router.push(`/chatPicked/${chat.id}`);
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
