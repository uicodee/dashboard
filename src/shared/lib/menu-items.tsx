import {
  Inbox,
  Layers3,
  LayoutDashboard,
  LogOut,
  Mails,
  Settings2,
  Star,
  UsersRound,
} from "lucide-react";

export const topMenuItems = [
  {
    title: "Dashboard",
    link: "/",
    icon: <LayoutDashboard className="size-5" strokeWidth={1.75} />,
  },
  {
    title: "Employees",
    link: "/employees",
    icon: <UsersRound className="size-5" strokeWidth={1.75} />,
  },
  {
    title: "Skills",
    link: "/skills",
    icon: <Star className="size-5" strokeWidth={1.75} />,
  },
  {
    title: "Orders",
    link: "/orders",
    icon: <Inbox className="size-5" strokeWidth={1.75} />,
  },
  {
    title: "Mailing",
    link: "/mailing",
    icon: <Mails className="size-5" strokeWidth={1.75} />,
  },
  {
    title: "Categories",
    link: "/categories",
    icon: <Layers3 className="size-5" strokeWidth={1.75} />,
  },
];
export const bottomMenuItems = [
  {
    title: "Settings",
    link: "/settings",
    icon: <Settings2 className="size-5" strokeWidth={1.75} />,
  },
  {
    title: "Logout",
    link: "/logout",
    icon: <LogOut className="size-5" strokeWidth={1.75} />,
  },
];
