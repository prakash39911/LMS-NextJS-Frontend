"use client";

import {
  Calendar,
  Book,
  Inbox,
  Settings,
  BookAIcon,
  BookOpen,
} from "lucide-react";

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
    url: "/all-courses",
    icon: Book,
  },
  {
    title: "My Courses",
    url: "/my-courses",
    icon: Inbox,
  },
  {
    title: "My Learnings",
    url: "/my-learnings",
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
  {
    title: "Create Course",
    url: "/create-course",
    icon: BookAIcon,
  },
];

export function AppSidebar({
  userId,
  currentUserData,
}: {
  userId: string | null;
  currentUserData: any;
}) {
  const isTeacher = currentUserData?.role === "teacher" ? true : false;

  return (
    <Sidebar className="dark">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl font-semibold">
            <div>
              <BookOpen className="text-blue-500 mr-2" />
            </div>
            LMS
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-4">
              {items.map((item) => {
                if (item.title === "My Learnings" && isTeacher) return;
                if (
                  (item.title === "My Courses" ||
                    item.title === "Create Course") &&
                  !isTeacher
                )
                  return;
                if (
                  !userId &&
                  (item.title === "Profile" ||
                    item.title === "Billing" ||
                    item.title === "My Learnings")
                )
                  return;

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
