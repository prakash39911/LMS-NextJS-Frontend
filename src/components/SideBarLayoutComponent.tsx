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
      <div className="fixed top-0 left-0 z-50 mt-3 ml-1 md:ml-0 text-white">
        <SidebarTrigger />
      </div>
    </SidebarProvider>
  );
}
