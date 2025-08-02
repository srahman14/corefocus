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
      // onMouseEnter={() => toggleSidebar(false)}
      // onMouseLeave={() => toggleSidebar(true)}
      className="h-full dark:bg-gray-900 text-white z-40 flex flex-col fixed top-0 left-0"
    >
      {/* Menu Items */}
      <div className="flex-1overflow-y-none mt-4 px-1">
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
          href="/"
          icon="fa-chart-simple"
          label="Analytics"
          collapsed={collapsed}
        />
      </div>

      {/* Bottom Buttons */}
      <div className="border-t border-gray-700 border-t-8 mt-auto p-4 space-y-2 font-bold">
        <div className="cursor-pointer text-black hover:bg-gray-200 transition rounded flex items-center px-4 py-3">
          <i className="fa-solid fa-right-from-bracket" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </div>

        <div className="cursor-pointer text-black hover:bg-gray-200 transition rounded flex items-center px-4 py-3">
          <i className="fa-solid fa-moon" />
          {!collapsed && <span className="ml-3">Dark Mode</span>}
        </div>
      </div>
    </motion.div>
  );
}
