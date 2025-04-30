import React from "react";
import Navbar from "../components/navbar/Navbar";
import SideBarLayoutComponent from "../components/SideBarLayoutComponent";
import { Toaster } from "@/components/ui/sonner";
import { auth, currentUser } from "@clerk/nextjs/server";
import Chat from "@/components/chat/Chat";
import { Message } from "@/components/chat/ChatMessage";

export default async function Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, getToken } = await auth();
  const currentUserData = await currentUser();

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

  return (
    <div className="grid grid-cols-[auto_1fr] bg-gray-900">
      <div>
        <SideBarLayoutComponent
          userId={userId}
          currentUserData={currentUserData?.publicMetadata}
        />
      </div>
      <div className="bg-gray-900">
        <Navbar />
        <main className="relative top-14">{children}</main>
        <Toaster />
      </div>
      <Chat initialMessages={initialMessages} />
    </div>
  );
}
