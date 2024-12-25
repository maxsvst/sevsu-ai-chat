"use client";

import React, { ReactElement, useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";
import { Spin } from "antd";

import {
  fetchMessages,
  selectChats,
  sendMessage,
} from "@/entities/chat/model/chatSlice";
import { useAppDispatch } from "@/app/store";

import { dateToHH_MM } from "@/shared/ui";
import { Header } from "@/shared/ui/molecules/header";
import { SendIcon } from "@/shared/ui/atoms/sendIcon/SendIcon";

import styles from "./ChatPicked.module.scss";
import { CopyIcon } from "@/shared/ui/atoms/copyIcon";

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
  const dispatch = useAppDispatch();
  const { chats, isLoading } = useSelector(selectChats);

  const scrollElement = useRef<any>(null);
  const [question, setQuestion] = useState("");

  const messages =
    !!chats && chats?.find((chat) => chat.id === chatId)?.messages;

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
      <ul
        className={!!messages?.length ? styles.chat : styles.emptyChat}
        ref={scrollElement}
      >
        {!!messages?.length ? (
          messages.map(({ id, createdAt, content, isAi }) => (
            <li
              key={id}
              className={isAi ? styles.chatAiMessage : styles.chatMessage}
            >
              <span style={{ fontSize: "14px" }}>{content}</span>
              <div
                className={
                  isAi ? styles.chatMessageMeta : styles.chatMessageTime
                }
              >
                {isAi && <CopyIcon text={content} />}
                <span style={{ alignSelf: "end", fontSize: "12px" }}>
                  {dateToHH_MM(createdAt)}
                </span>
              </div>
            </li>
          ))
        ) : (
          <div className={styles.emptyMessages}>Сообщения отсутствуют</div>
        )}
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
