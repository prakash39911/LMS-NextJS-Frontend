import React from "react";
import Navbar from "./navbar/Navbar";
import SideBarLayoutComponent from "./SideBarLayoutComponent";
import { Toaster } from "./ui/toaster";
import { auth } from "@clerk/nextjs/server";

export default async function Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  return (
    <div className="grid grid-cols-[auto_1fr]">
      <div>
        <SideBarLayoutComponent userId={userId} />
      </div>
      <div className="bg-gray-800">
        <Navbar />
        {children}
        <Toaster />
      </div>
    </div>
  );
}
