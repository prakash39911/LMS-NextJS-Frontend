import { Calendar, Book, Inbox, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import React from "react";

// Menu items.
const items = [
  {
    title: "All Courses",
    url: "#",
    icon: Book,
  },
  {
    title: "My Learnings",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Billing",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Profile",
    url: "/manage-account",
    icon: Settings,
  },
];

export function AppSidebar({ userId }: { userId: string }) {
  return (
    <Sidebar className="dark">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl font-semibold">
            LMS
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-4">
              {items.map((item) => {
                if (item.title === "Profile" && !userId) return;
                return (
                  <div key={item.title}>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="py-7">
                        <a href={item.url} className="text-gray-400">
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </div>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
