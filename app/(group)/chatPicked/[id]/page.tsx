import { ChatPicked } from "@/pages/chatPicked";
import { api } from "@/shared/api";
import React from "react";

export default async function ChatPage({ params }: { params: any }) {
  const id = await params.id;

  return <ChatPicked chatId={id} />;
}
