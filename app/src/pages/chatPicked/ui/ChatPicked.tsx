"use client";

import React, { ReactElement, useEffect, useId, useRef, useState } from "react";
import styles from "./ChatPicked.module.scss";
import { SendIcon } from "@/shared/ui/atoms/sendIcon/SendIcon";
import { useRouter } from "next/navigation";
import { Header } from "@/shared/ui/molecules/header";
import { api } from "@/shared/api";
import { dateToHH_MM } from "@/shared/ui";
import { useSelector } from "react-redux";
import {
  fetchMessages,
  selectChats,
  sendMessage,
} from "@/entities/chat/model/chatSlice";
import { useAppDispatch } from "@/app/store";
import { Spin } from "antd";
import { selectModal } from "@/entities/modal/model/modalSlice";

export interface Message {
  id: number;
  isAi: boolean;
  content: string;
  createdAt: string;
}

export const IconBuffer = ({ children }: { children: ReactElement }) => {
  return <>{children}</>;
};

export const ChatPicked = ({ chatId }: { chatId: string }) => {
  const { chats, isLoading } = useSelector(selectChats);
  const { isSettingsVisible } = useSelector(selectModal);
  const dispatch = useAppDispatch();
  const messages =
    !!chats && chats?.find((chat) => chat.id === chatId)?.messages;
  const [question, setQuestion] = useState("");

  const scrollElement = useRef<any>(null);

  useEffect(() => {
    if (!!scrollElement.current) {
      scrollElement.current!.scrollTo({
        top: scrollElement.current!.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    !!chatId && dispatch(fetchMessages(chatId)).unwrap();
  }, [dispatch, chatId]);

  const sendMessageHandler = async () => {
    try {
      await dispatch(sendMessage({ chatId, question })).unwrap();
      setQuestion("");
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  // console.log("messages", messages);

  return (
    <section className={styles.chatWrapper}>
      <Header />
      <ul className={styles.chat} ref={scrollElement}>
        {!!messages?.length &&
          messages.map(({ id, createdAt, content, isAi }) => (
            <li
              key={id}
              className={isAi ? styles.chatAiMessage : styles.chatMessage}
            >
              <span style={{ fontSize: "14px" }}>{content}</span>
              <span style={{ alignSelf: "end", fontSize: "12px" }}>
                {dateToHH_MM(createdAt)}
              </span>
            </li>
          ))}
      </ul>
      <div className={styles.inputWrapper}>
        <input
          className={styles.searchInput}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Напишите запрос..."
        />
        {isLoading ? (
          <Spin style={{ marginRight: "5px" }} />
        ) : (
          <SendIcon
            style={!question.length && { cursor: "not-allowed" }}
            onClickHandler={() => {
              !!question.length && sendMessageHandler();
            }}
          />
        )}
      </div>
    </section>
  );
};
