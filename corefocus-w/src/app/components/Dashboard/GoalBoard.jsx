import {
  collection,
  getDocs,
  updateDoc,
  setDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { db } from "@/app/firebase";
import { Timestamp } from "firebase/firestore";
import { OrbitingCircles } from "../magicui/orbiting-circles";
import { File, Settings, Search } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip"

export default function GoalBoard() {
  const { currentUser, loading } = useAuth();
  const [showGoals, setShowGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);

  // const renderIcon = (Icon, label) => (
  //   <Tooltip.Provider delayDuration={150}>
  //     <Tooltip.Root>
  //       <Tooltip.Trigger asChild>
  //         <div className="group cursor-pointer">
  //           <Icon />
  //         </div>
  //       </Tooltip.Trigger>
  //       <Tooltip.Portal>
  //         <Tooltip.Content
  //           side="top"
  //           sideOffset={8}
  //           className="rounded bg-black text-white px-2 py-1 text-xs shadow-lg"
  //         >
  //           {label}
  //           <Tooltip.Arrow className="fill-black" />
  //         </Tooltip.Content>
  //       </Tooltip.Portal>
  //     </Tooltip.Root>
  //   </Tooltip.Provider>
  // );

  const renderIcon = (IconComponent, label, goalData) => (
    <div
      className="group relative cursor-pointer"
      onMouseEnter={() => setSelectedGoal(goalData)}
      onMouseLeave={() => setSelectedGoal(null)}
    >
      <IconComponent className="w-8 h-8 text-white" />
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity">
        {label}
      </span>
    </div>
  );

  const SidePanel = ({ goal }) => {
    if (!goal) return null;
    return (
      <div className="w-64 p-4 bg-white text-black rounded-lg shadow-lg">
        <h3 className="font-bold text-lg">{goal.name}</h3>
        <p className="text-sm text-gray-700">{goal.motivation}</p>
        <p className="text-xs text-gray-500 mt-2">
          Deadline: {goal.deadline}
        </p>
        <div className="mt-2 text-xs">
          Tags: {goal.tags?.join(", ")}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!currentUser) return;
    const fetchGoals = async () => {
      try {
        const docSnap = await getDocs(
          collection(db, "users", currentUser.uid, "goals")
        );

        const goals = [];

        docSnap.forEach((doc) => {
          const data = doc.data();
          goals.push({ id: doc.id, ...data });
        });

        setShowGoals(goals);
        console.log("Goals set", showGoals);
      } catch (err) {
        console.error("Errro fetching goals", err);
      }
    };

    fetchGoals();
  }, [currentUser]);

  useEffect(() => {
    console.log("showGoals updated:", showGoals);
  }, [showGoals]);

  return (
    <div className="bg-gradient-to-br from-[#C0AFE2] via-[#CEC2EB] to-[#C0AFE2] dark:from-[#070C2F] dark:via-[#110E2D] dark:to-[#13153F] p-6 rounded-xl text-white">
      <h2 className="text-xl font-semibold mb-2">🎯 Goal Board</h2>
      
      <div className="flex flex-row flex-wrap gap-4 p-6">
        <div className="relative h-[500px] w-[500px] mx-auto flex items-center justify-center">
          <OrbitingCircles>
            {renderIcon(File, "File", {
              name: "Goal 1",
              motivation: "Read 10 books",
              deadline: "2025-09-01",
              tags: ["Reading", "Personal Growth"],
            })}
            {renderIcon(Search, "Search", {
              name: "Goal 2",
              motivation: "Research AI models",
              deadline: "2025-09-15",
              tags: ["AI", "Research"],
            })}
            {renderIcon(Settings, "Settings", {
              name: "Goal 3",
              motivation: "Refactor code",
              deadline: "2025-10-01",
              tags: ["Coding", "Optimization"],
            })}
          </OrbitingCircles>
        </div>

        <SidePanel goal={selectedGoal} />
      </div>

      {/* <ul className="flex gap-20">
      {showGoals.map((goal) => {
        const deadlineDate = goal.deadline instanceof Timestamp
          ? goal.deadline.toDate()
          : new Date(goal.deadline);

        return (
          <li 
          key={goal.id} 
          className="bg-[#111] p-45 rounded-full font-bold">
            <p>Goal Name: {goal.goalName}</p>
            <p>Goal Motivation: {goal.goalMotivation}</p>
            <p>Goal Deadline: {deadlineDate.toLocaleDateString()}</p>
            <p>Goal Tags: {Array.isArray(goal.tags) ? goal.tags.join(", ") : goal.tags}</p>
          </li>
        );
      })}
      </ul> */}
    </div>
  );
}
