"use client";

import { useEffect, useRef, useState } from "react";

import { truncate } from "lodash";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  createChat,
  deleteChat,
  getChats,
  selectChats,
} from "@/entities/chat/model/chatSlice";
import { selectModal } from "@/entities/modal/model/modalSlice";
import { useAppDispatch } from "@/app/store";

import { dateToHH_MM } from "@/shared/ui";
import { NewChatIcon } from "@/shared/ui/atoms/newChatIcon";
import { NextButton } from "@/shared/ui/molecules/nextButton";

import styles from "./layout.module.scss";

export default function ChatsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();

  const { chats } = useSelector(selectChats);
  const { isSettingsVisible, isProfileVisible, isQuitVisible } =
    useSelector(selectModal);

  // console.log("chats", chats);

  const [chatId, setChatId] = useState<string>("");

  const scrollElement = useRef<any>(null);

  if (!!scrollElement.current) {
    scrollElement.current!.scrollTo({
      top: scrollElement.current!.scrollHeight,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    dispatch(getChats());
  }, []);

  const router = useRouter();

  const createNewChat = async () => {
    try {
      const newChat = await dispatch(createChat()).unwrap();
      router.push(`/chatPicked/${newChat.id}`);
    } catch (error) {
      console.error("Failed to create new chat", error);
      // Handle error here (e.g., show a notification)
    }
  };

  const removeChat = (id: string) => {
    dispatch(deleteChat(id));
  };

  const isBlur = isSettingsVisible || isProfileVisible || isQuitVisible;

  return (
    <div className={isBlur ? styles.wrapperBlured : styles.wrapper}>
      <section className={styles.chatSectionWrapper}>
        <ul className={styles.chatListWrapper}>
          {!!chats.length &&
            chats.map(({ id, messages, title }) => (
              <li
                key={id}
                className={
                  (
                    !!chatId
                      ? chatId === id
                      : document.URL.split("/").at(-1) === id
                  )
                    ? styles.chatItemWrapperPicked
                    : styles.chatItemWrapper
                }
                onClick={() => {
                  setChatId(id);
                  router.push(`/chatPicked/${id}`);
                }}
              >
                <div className={styles.chatItem}>
                  <span>{!!title ? title : "Тема чата"}</span>
                  {!!messages.length ? (
                    <span style={{ fontSize: "12px" }}>
                      {truncate(messages[messages.length - 1].content, {
                        length: 25,
                      })}
                    </span>
                  ) : (
                    <span style={{ fontSize: "12px" }}>Сообщений нет</span>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "end",
                    gap: "8px",
                  }}
                >
                  {!!messages.length && (
                    <span style={{ fontSize: "12px" }}>
                      {dateToHH_MM(messages[messages.length - 1].createdAt)}
                    </span>
                  )}
                  <svg
                    onClick={() => removeChat(id)}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.333 1.333a0.667 0.667 0 0 0 -0.667 0.667v0.667h2.667V2a0.667 0.667 0 0 0 -0.667 -0.667zm3.333 1.333V2A2 2 0 0 0 8.666 0h-1.333a2 2 0 0 0 -2 2v0.667H2a0.667 0.667 0 0 0 0 1.333h0.07l1.136 10.221A2 2 0 0 0 5.194 16h5.613a2 2 0 0 0 1.989 -1.779L13.93 4h0.07a0.667 0.667 0 1 0 0 -1.333zm1.922 1.333H3.411l1.12 10.074a0.667 0.667 0 0 0 0.662 0.594h5.613a0.667 0.667 0 0 0 0.662 -0.594zm-5.92 2.002a0.667 0.667 0 0 1 0.667 0.667V12a0.667 0.667 0 1 1 -1.333 0V6.667a0.667 0.667 0 0 1 0.667 -0.667m2.667 0a0.667 0.667 0 0 1 0.667 0.667V12a0.667 0.667 0 1 1 -1.333 0V6.667a0.667 0.667 0 0 1 0.667 -0.667"
                      fill="#ffffff"
                      id="id_102"
                    />
                  </svg>
                </div>
              </li>
            ))}
        </ul>
        <NextButton
          text="Новый чат"
          icon={<NewChatIcon />}
          onClick={createNewChat}
        />
      </section>
      {children}
    </div>
  );
}
