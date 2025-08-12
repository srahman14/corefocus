"use client";

import React from "react";
import { motion } from "framer-motion";
import useModalStore from "@/app/store/modalStore";
import useUIStore from "@/app/store/uiStore";
import { SidebarActionItem } from "./SidebarActionItem";
import { SidebarItem } from "./SidebarItem";

export default function Sidebar() {
  const collapsed = useUIStore((state) => state.sidebarCollapsed);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  let hoverTimeout = null;
  const sidebarWidth = collapsed ? 64 : 256;

  const { openModal } = useModalStore();

  return (
    <motion.div
      animate={{ width: sidebarWidth }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
      // Optional
      onMouseEnter={() => toggleSidebar(false)}
      onMouseLeave={() => toggleSidebar(true)}
      className="h-full bg-[#] dark:bg-[#070A29] text-white z-40 flex flex-col fixed top-0 left-0 shadow-3xl shadow-[#fff]"
    >
      {/* Menu Items */}
      <div className="flex-1 overflow-y-none mt-4 px-1">
        <SidebarItem
          href="/dashboard"
          icon="fa-table-columns"
          label="Dashboard"
          collapsed={collapsed}
        />

        <SidebarActionItem
          icon="fa-plus"
          label="Create"
          collapsed={collapsed}
          onClick={openModal}
        />

        <SidebarItem
          href="/journal"
          icon="fa-pen-to-square"
          label="Journal"
          collapsed={collapsed}
        />

          <SidebarItem
          href="/dashboard/analytics"
          icon="fa-chart-simple"
          label="Analytics"
          collapsed={collapsed}
        />
      </div>
    </motion.div>
  );
}
