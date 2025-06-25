"use client";
import Sidebar from "@/app/components/Sidebar";
import useUIStore from "@/app/store/uiStore";

export default function DashboardLayout({ children }) {
  const collapsed = useUIStore(state => state.sidebarCollapsed);
  const sidebarWidth = collapsed ? 64 : 256;

  return (
    <div className="flex h-screen overflow-hidden relative">
      <Sidebar />
      <div
        className="flex-1 transition-all duration-300 ease-in-out"
        style={{ marginLeft: sidebarWidth }}
      >
        {children}
      </div>
    </div>
  );
}
