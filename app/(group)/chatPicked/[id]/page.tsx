import React from "react";

import { ChatPicked } from "@/pages/chatPicked";

export default async function ChatPage({ params }: { params: any }) {
  const id = await params.id;
  return <ChatPicked chatId={id} />;
}
