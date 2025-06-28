import {
  Book,
  BookAIcon,
  ChartNoAxesCombined,
  Inbox,
  Paperclip,
  Settings,
} from "lucide-react";

export const teacherLinks = [
  {
    title: "All Courses",
    url: "/all-courses",
    icon: Book,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: ChartNoAxesCombined,
  },
  {
    title: "My Courses",
    url: "/my-courses",
    icon: Inbox,
  },

  {
    title: "Create Course",
    url: "/create-course",
    icon: BookAIcon,
  },
  {
    title: "Profile",
    url: "/manage-account",
    icon: Settings,
  },
];

export const studentLinks = [
  {
    title: "All Courses",
    url: "/all-courses",
    icon: Book,
  },

  {
    title: "My Learnings",
    url: "/my-learnings",
    icon: Inbox,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: Paperclip,
  },
  {
    title: "Profile",
    url: "/manage-account",
    icon: Settings,
  },
];

export const publicLink = [
  {
    title: "All Courses",
    url: "/all-courses",
    icon: Book,
  },
];
