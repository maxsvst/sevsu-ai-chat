"use client";

import React from "react";

import { ConfigProvider, notification } from "antd";

export const CopyIcon = ({ text }: { text: string }) => {
  const [api, contextHolder] = notification.useNotification();

  const copyHandler = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        api.success({
          message: "Текст скопирован",
          placement: "top",
        });
      })
      .catch((error) => {
        api.success({
          message: `Текст не скопирован ${error}`,
          placement: "top",
        });
      });
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "black",

          colorBgContainer: "#f6ffed",
        },
      }}
    >
      {contextHolder}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ cursor: "pointer" }}
        onClick={() => copyHandler(text)}
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.66699 5.99999C6.2988 5.99999 6.00033 6.29847 6.00033 6.66666V13.3333C6.00033 13.7015 6.2988 14 6.66699 14H13.3337C13.7018 14 14.0003 13.7015 14.0003 13.3333V6.66666C14.0003 6.29847 13.7018 5.99999 13.3337 5.99999H6.66699ZM4.66699 6.66666C4.66699 5.56209 5.56242 4.66666 6.66699 4.66666H13.3337C14.4382 4.66666 15.3337 5.56209 15.3337 6.66666V13.3333C15.3337 14.4379 14.4382 15.3333 13.3337 15.3333H6.66699C5.56242 15.3333 4.66699 14.4379 4.66699 13.3333V6.66666Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2.66699 1.99999C2.30185 1.99999 2.00033 2.30151 2.00033 2.66666V9.33332C2.00033 9.69847 2.30185 9.99999 2.66699 9.99999C3.03518 9.99999 3.33366 10.2985 3.33366 10.6667C3.33366 11.0348 3.03518 11.3333 2.66699 11.3333C1.56547 11.3333 0.666992 10.4348 0.666992 9.33332V2.66666C0.666992 1.56513 1.56547 0.666656 2.66699 0.666656H9.33366C10.4352 0.666656 11.3337 1.56513 11.3337 2.66666C11.3337 3.03485 11.0352 3.33332 10.667 3.33332C10.2988 3.33332 10.0003 3.03485 10.0003 2.66666C10.0003 2.30151 9.6988 1.99999 9.33366 1.99999H2.66699Z"
          fill="white"
        />
      </svg>
    </ConfigProvider>
  );
};
