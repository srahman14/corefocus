"use client";
import Sidebar from "../components/SidebarComponents/Sidebar";
import useUIStore from "@/app/store/uiStore";
import useModalStore from "../store/modalStore";
import CreateModal from "../components/Modals/CreateModal";

export default function DashboardLayout({ children }) {
  const collapsed = useUIStore(state => state.sidebarCollapsed);
  const sidebarWidth = collapsed ? 64 : 256;
  const { isModalOpen, closeModal } = useModalStore();

  return (
    <div className="flex h-screen overflow-hidden relative">
      <Sidebar />
      <div
        className="flex-1 transition-all duration-300 ease-in-out"
        style={{ marginLeft: sidebarWidth }}
      >
        {children}

      </div>
      {isModalOpen && <CreateModal onClose={closeModal} />}
    </div>
  );
}
