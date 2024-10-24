"use client";

import { api } from "@/shared/api";
import React from "react";

export default function ChatPage() {
  const onClickHandler = async () => {
    const res = await api.get("/users/all");
    console.log(res);
  };

  return (
    <div style={{ color: "white", textAlign: "center" }}>
      <button onClick={onClickHandler}>Chat</button>
    </div>
  );
}
