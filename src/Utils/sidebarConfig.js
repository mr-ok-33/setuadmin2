import { FaHome, FaMedkit, FaBriefcase } from "react-icons/fa";

export const sidebarConfig = [
  {
    title: "Home",
    path: "/home",
    icon: FaHome,
  },
  {
    title: "Drug Directory",
    icon: FaMedkit,
    subItems: [
      { title: "Brand", path: "/brand" },
      { title: "Drug", path: "/drug" },
      { title: "Category", path: "/category" },
      { title: "Drug Category", path: "/drug-category" },
    ],
  },
  {
    title: "Jobs",
    icon: FaBriefcase,
    subItems: [
      { title: "Jobs", path: "/jobs" },
      { title: "Company", path: "/company" },
    ],
  },
];
