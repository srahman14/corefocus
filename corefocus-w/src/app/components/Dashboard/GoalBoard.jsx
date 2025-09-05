import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { db } from "@/app/firebase";
import { Timestamp, onSnapshot } from "firebase/firestore";
import { OrbitingCircles } from "../magicui/orbiting-circles";
import { CircleDot, Clock, Trophy } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";

const calculateDaysRemaining = (deadlineTimestamp) => {
  if (!deadlineTimestamp || !(deadlineTimestamp instanceof Timestamp))
    return Infinity;
  const deadlineDate = deadlineTimestamp.toDate();
  const now = new Date();
  const diffInTime = deadlineDate.getTime() - now.getTime();
  const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
  return diffInDays;
};

const priorityConfig = {
  High: { color: "text-[#7B0099] dark:text-red-500", icon: CircleDot },
  Medium: { color: "text-[#6C46A2] #dark:text-orange-500", icon: Clock },
  Low: { color: "text-[#A18CD1] dark:text-green-500", icon: Trophy },
};

export default function GoalBoard() {
  const { currentUser } = useAuth();
  const [showGoals, setShowGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [goalsByDeadline, setGoalsByDeadline] = useState({
    outer: [],
    middle: [],
    inner: [],
  });

  // Fetch goals from Firestore
  useEffect(() => {
    if (!currentUser) return;

    const goalsRef = collection(db, "users", currentUser.uid, "goals");
    const unsubscribe = onSnapshot(
      goalsRef,
      (snapshot) => {
        const fetchedGoals = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          let progress = 0;
          if (data.createdAt && data.deadline) {
            const start =
              data.createdAt instanceof Timestamp
                ? data.createdAt.toDate()
                : new Date(data.createdAt);
            const end =
              data.deadline instanceof Timestamp
                ? data.deadline.toDate()
                : new Date(data.deadline);
            const now = new Date();
            if (now >= end) {
              progress = 100;
            } else if (now <= start) {
              progress = 0;
            } else {
              progress = Math.min(
                100,
                Math.round(((now - start) / (end - start)) * 100)
              );
            }
          }
          fetchedGoals.push({ id: doc.id, progress, ...data });
        });

        // Group goals by deadline
        const outerRingGoals = [];
        const middleRingGoals = [];
        const innerRingGoals = [];

        fetchedGoals.forEach((goal) => {
          const daysLeft = calculateDaysRemaining(goal.deadline);
          if (daysLeft <= 30) {
            outerRingGoals.push(goal);
          } else if (daysLeft > 30 && daysLeft <= 90) {
            middleRingGoals.push(goal);
          } else {
            innerRingGoals.push(goal);
          }
        });

        setGoalsByDeadline({
          outer: outerRingGoals,
          middle: middleRingGoals,
          inner: innerRingGoals,
        });
      },
      (error) => {
        console.error("Error fetching goals in real-time", error);
      }
    );

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [currentUser]);

  // Icon with tooltip & click handler
  const renderIcon = (Icon, label, goalData, colorClass) => (
    <Tooltip.Provider delayDuration={150}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div
            className={`group cursor-pointer ${colorClass}`}
            onClick={() => setSelectedGoal(goalData || { title: label })}
          >
            <Icon />
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            sideOffset={8}
            className="rounded bg-black text-white px-2 py-1 text-xs shadow-lg"
          >
            {label}
            <Tooltip.Arrow className="fill-black" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );

  return (
    <>
      {/* Main Goal Board */}
      <div className="bg-gradient-to-br from-[#C0AFE2] via-[#CEC2EB] to-[#C0AFE2] dark:from-[#070C2F] dark:via-[#110E2D] dark:to-[#13153F] p-6 rounded-xl text-white">
        <h2 className="text-xl font-semibold mb-2">🎯 Goal Board</h2>

        <div className="flex flex-row flex-wrap gap-4 p-6">
          <div className="relative h-[500px] w-[500px] mx-auto flex items-center justify-center">
            {/* Outer shell (Urgent: < 30 days) */}
            <OrbitingCircles speed={0.7} radius={240}>
              {goalsByDeadline.outer.map((goal) => {
                const config =
                  priorityConfig[goal.goalPriority] || priorityConfig.High;
                return (
                  <div key={goal.id}>
                    {renderIcon(config.icon, goal.goalName, goal, config.color)}
                  </div>
                );
              })}
            </OrbitingCircles>

            {/* Middle shell (Medium: 31–90 days) */}
            <OrbitingCircles radius={120} speed={0.5} reverse={true}>
              {goalsByDeadline.middle.map((goal) => {
                const config =
                  priorityConfig[goal.goalPriority] || priorityConfig.Medium;
                return (
                  <div key={goal.id}>
                    {renderIcon(config.icon, goal.goalName, goal, config.color)}
                  </div>
                );
              })}
            </OrbitingCircles>

            {/* Inner shell (Long-term: > 90 days) */}
            <OrbitingCircles radius={60} speed={0.3}>
              {goalsByDeadline.inner.map((goal) => {
                const config =
                  priorityConfig[goal.goalPriority] || priorityConfig.Low;
                return (
                  <div key={goal.id}>
                    {renderIcon(config.icon, goal.goalName, goal, config.color)}
                  </div>
                );
              })}
            </OrbitingCircles>
          </div>
        </div>
      </div>

      {/* Dialog (Dark Side Panel) */}
      <Dialog.Root
        open={!!selectedGoal}
        onOpenChange={(open) => {
          if (!open) setSelectedGoal(null);
        }}
      >
        <Dialog.Portal>
          {/* Overlay */}
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />

          {/* Side panel */}
          <Dialog.Content
            className="
              fixed right-0 top-0 z-50 h-screen w-[420px]
              border-l border-white/10
              bg-[#fff] text-black
              dark:bg-[#0F1020] dark:text-white
              p-6
              shadow-2xl
              transform transition-transform duration-300
              data-[state=closed]:translate-x-full
              data-[state=open]:translate-x-0
              focus:outline-none
            "
          >
            <div className="flex items-start justify-between">
              <Dialog.Title className="text-lg font-semibold">
                {selectedGoal?.goalName || selectedGoal?.title || "Goal"}
              </Dialog.Title>
              <Dialog.Close
                className="rounded-md p-2 hover:bg-white/10 transition cursor-pointer"
                aria-label="Close"
              >
                ✕
              </Dialog.Close>
            </div>

            <Dialog.Description className="mt-1 text-sm text-black font-semibold dark:text-violet-200/80">
              Quick glance at your goal details.
            </Dialog.Description>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400 dark:text-violet-200/80">
                  Priority
                </span>
                <span className="font-medium">
                  {selectedGoal?.goalPriority || "—"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400 dark:text-violet-200/80 dark:text-violet-200/80">
                  Due
                </span>
                <span className="font-medium">
                  {selectedGoal?.deadline instanceof Timestamp
                    ? selectedGoal.deadline.toDate().toLocaleDateString()
                    : selectedGoal?.deadline || "—"}
                </span>
              </div>

              {/* Progress */}
              <div>
                <span className="text-sm text-gray-400 dark:text-violet-200/80">
                  Progress
                </span>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-300 dark:bg-white/10">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-[#520dd0] to-[#500DCA]"
                    style={{ width: `${selectedGoal?.progress ?? 0}%` }}
                  />
                </div>
                <div className="mt-1 text-right text-xs text-violet-200/70">
                  {selectedGoal?.progress ?? 0}%
                </div>
              </div>

              <div>
                <span className="text-sm text-gray-400 dark:text-violet-200/800">
                  Goal Motivation
                </span>
                <p className="mt-2 rounded-lg bg-gray-200 dark:bg-white/5 p-3 text-sm leading-relaxed">
                  {selectedGoal?.goalMotivation || "No goal motivation set."}
                </p>
              </div>

              {/* Notes */}
              <div>
                <span className="text-sm text-gray-400 dark:text-violet-200/800">
                  Notes
                </span>
                <p className="mt-2 rounded-lg bg-gray-200 dark:bg-white/5 p-3 text-sm leading-relaxed">
                  {selectedGoal?.notes || "No notes yet."}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-3">
              <button className="rounded-xl bg-gray-200 dark:bg-white/10 px-4 py-2 text-sm font-medium hover:bg-gray-200/80 dark:hover:bg-white/15 transition cursor-pointer">
                Edit Goal
              </button>
              <Link href={"dashboard/viewer"} passHref>
                <button className="rounded-xl text-white bg-[#520dd0] px-4 py-2 text-sm font-medium hover:bg-[#520dd0]/90 transition cursor-pointer">
                  Open Details
                </button>
              </Link>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
