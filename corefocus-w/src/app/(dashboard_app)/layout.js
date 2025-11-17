"use client";
import { useEffect, useState } from "react";
import Sidebar from "../components/SidebarComponents/Sidebar";
import useUIStore from "@/app/store/uiStore";
import useModalStore from "../store/modalStore";
import CreateModal from "../components/Modals/CreateModal";

export default function DashboardLayout({ children }) {
  const collapsed = useUIStore((state) => state.sidebarCollapsed);
  const sidebarWidth = collapsed ? 64 : 256;
  const { isModalOpen, closeModal } = useModalStore();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden relative">
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <div
        className="flex-1 transition-all duration-300 ease-in-out"
        style={{ marginLeft: isDesktop ? sidebarWidth : 0 }}
      >
        {children}
      </div>
      {isModalOpen && <CreateModal onClose={closeModal} />}
    </div>
  );
}
