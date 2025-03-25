"use client";

import React from "react";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { usePathname } from "next/navigation";

export default function SideBarLayoutComponent({
  userId,
  currentUserData,
}: {
  userId: string | null;
  currentUserData: any;
}) {
  const pathname = usePathname();
  if (pathname.startsWith("/learn")) return null;

  return (
    <SidebarProvider>
      <AppSidebar userId={userId} currentUserData={currentUserData} />
      <div className="bg-gray-900 text-gray-400 border-r mt-3 border-gray-900">
        <SidebarTrigger />
      </div>
    </SidebarProvider>
  );
}
