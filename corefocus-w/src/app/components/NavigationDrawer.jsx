"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import useModalStore from "@/app/store/modalStore";
import { LayoutDashboard, Plus, BookOpen, Eye, BarChart3, X } from "lucide-react";

export default function NavigationDrawer() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { openModal } = useModalStore();

  const handleNavigate = (href) => {
    router.push(href);
    setOpen(false);
  };

  const handleCreate = () => {
    openModal();
    setOpen(false);
  };

  const menuItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Create",
      action: handleCreate,
      icon: Plus,
      isAction: true,
    },
    {
      label: "Journal",
      href: "/journal",
      icon: BookOpen,
    },
    {
      label: "Viewer",
      href: "/dashboard/viewer",
      icon: Eye,
    },
    {
      label: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
    },
  ];

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="lg:hidden rounded-lg hover:bg-white/10 transition-colors text-white text-xl">
          <i className="fa-solid fa-bars bg-white text-black p-1.5 rounded-lg"></i>
        </button>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-in fade-in duration-300" />
        
        <Dialog.Content className="fixed right-0 top-0 z-50 h-screen w-[280px] bg-gradient-to-b from-[#1a0033] to-[#0d001a] dark:from-[#070A29] dark:to-[#050015] shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-300 outline-none">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
          <Dialog.Title className="text-white font-bold text-lg">Navigation</Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white">
                <X size={24} />
              </button>
            </Dialog.Close>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = false; // Can be enhanced with usePathname

              return (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.isAction) {
                      item.action();
                    } else {
                      handleNavigate(item.href);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-[#520dd0] text-white shadow-lg"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-white/10 p-4">
            <p className="text-xs text-gray-500 text-center">CoreFocus v1.0</p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
