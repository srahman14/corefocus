"use client";
import Sidebar from "@/app/components/Sidebar";
import useUIStore from "@/app/store/uiStore";
import CreateHabitModal from "../components/Modals/CreateHabitModal";
import CreateGoalModal from "../components/Modals/CreateGoalModal";
import CreateJournalModal from "../components/Modals/CreateJournalModal";

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
      <CreateHabitModal />
      <CreateGoalModal />
      <CreateJournalModal />

    </div>
  );
}
