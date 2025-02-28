import React from "react";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export default function SideBarLayoutComponent({ userId }: { userId: string }) {
  return (
    <SidebarProvider>
      <AppSidebar userId={userId} />
      <div className="bg-gray-800 text-gray-400 pt-4 border-r border-gray-900">
        <SidebarTrigger />
      </div>
    </SidebarProvider>
  );
}
