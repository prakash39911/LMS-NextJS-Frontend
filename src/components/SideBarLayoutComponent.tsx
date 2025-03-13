import React from "react";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export default function SideBarLayoutComponent({
  userId,
}: {
  userId: string | null;
}) {
  return (
    <SidebarProvider>
      <AppSidebar userId={userId} />
      <div className="bg-gray-800 text-gray-400 border-r mt-3 border-gray-900">
        <SidebarTrigger />
      </div>
    </SidebarProvider>
  );
}
