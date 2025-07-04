import React from "react";
import Navbar from "../components/navbar/Navbar";
import SideBarLayoutComponent from "../components/SideBarLayoutComponent";
import { Toaster } from "@/components/ui/sonner";
import { auth, currentUser } from "@clerk/nextjs/server";
import ChatLayoutCompo from "@/components/ChatLayoutCompo";

export default async function Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, getToken } = await auth();

  const currentUserData = await currentUser();

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
      {userId && <ChatLayoutCompo getToken={getToken} userId={userId} />}
    </div>
  );
}
