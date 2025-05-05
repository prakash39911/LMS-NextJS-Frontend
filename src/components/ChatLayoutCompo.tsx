import React from "react";
import { Message } from "@/components/chat/ChatMessage";
import Chat from "./chat/Chat";

export default async function ChatLayoutCompo({ getToken, userId }: any) {
  const API_END_POINT = process.env.NEXT_PUBLIC_API_BASE_URL;

  const token = await getToken();

  const result = await fetch(`${API_END_POINT}api/chat/getChatHistory`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();

  if (!data?.status) {
    console.log("error while fetching messages");
  }

  const initialMessages: Message[] = data?.data;
  return <div>{userId && <Chat initialMessages={initialMessages} />}</div>;
}
