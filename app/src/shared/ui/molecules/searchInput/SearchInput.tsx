"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { SendIcon } from "../../atoms/sendIcon";

import {
  createChatWithTitle,
  getChats,
  sendMessage,
} from "@/entities/chat/model/chatSlice";
import { useAppDispatch } from "@/app/store";

import styles from "./SearchInput.module.scss";

export const SearchInput = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [message, setMessage] = useState("");

  const clickHandler = async () => {
    if (!!message) {
      const chat = await dispatch(createChatWithTitle(message)).unwrap();
      await dispatch(
        sendMessage({ chatId: chat.id, question: message })
      ).unwrap();
      await dispatch(getChats()).unwrap();
      router.push(`/chatPicked/${chat.id}`);
    }
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
