"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import useModalStore from "../store/modalStore";
import useUIStore from "../store/uiStore";

// Reusable Sidebar Item
function SidebarItem({ href, icon, label, collapsed, onClick }) {
  return (
    <Link href={href}>
      <div
        onClick={onClick}
        className="w-full flex text-black items-center px-4 py-3 hover:bg-gray-200 transition rounded cursor-pointer group relative"
      >
        <i className={`fa-solid ${icon} text-lg`} />
        {!collapsed && <span className="ml-3 font-bold">{label}</span>}
        {collapsed && (
          <span className="absolute left-full ml-0 mr-20 bg-[#222] text-white text-sm px-2 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
            {label}
          </span>
        )}
      </div>
    </Link>
  );
}

export default function Sidebar() {
  const collapsed = useUIStore((state) => state.sidebarCollapsed);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const sidebarWidth = collapsed ? 64 : 256;

  const { openModal } = useModalStore();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <motion.div
      animate={{ width: sidebarWidth }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
      className="h-full bg-gray-50 text-white z-40 flex flex-col fixed top-0 left-0"
    >
      {/* Menu Items */}
      <div className="flex-1 overflow-y-none mt-4 px-1">
        <SidebarItem
          href="#"
          icon="fa-lines-leaning"
          label="Dashboard"
          collapsed={collapsed}
          onClick={toggleSidebar}
        />

        {/* Create with Dropdown */}
        <div className="relative">
          <div
            onClick={() => setShowDropdown((prev) => !prev)}
            className="w-full flex text-black items-center px-4 py-3 hover:bg-gray-200 transition rounded cursor-pointer group relative"
          >
            <i className={`fa-solid fa-plus text-lg`} />
            {!collapsed && <span className="ml-3 font-bold">Create</span>}
            {collapsed && (
              <span className="absolute left-full ml-0 mr-20 bg-[#222] text-white text-sm px-2 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
                Create
              </span>
            )}
          </div>

          {/* Dropdown menu */}
          {showDropdown && !collapsed && (
            <div className="absolute top-full left-4 mt-1  shadow-md rounded-md z-50 w-48">
              <button
                onClick={() => {
                  openModal("habit");
                  setShowDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black font-semibold tracking-tighter"
              >
                ➕ Create Habit
              </button>
              <button
                onClick={() => {
                  openModal("goal");
                  setShowDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black font-semibold tracking-tighter"
              >
                <span>
                  <i className="fa-solid fa-bullseye text-red-500"></i>
                  <p className="inline-block ml-2">Create Goal</p>
                </span>
              </button>
              <button
                onClick={() => {
                  openModal("journal");
                  setShowDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black font-semibold tracking-tighter"
              >
                📓 Create Journal
              </button>
            </div>
          )}
        </div>
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
