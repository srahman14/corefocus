import { collection, getDocs, updateDoc, setDoc, doc, onSnapshot } from "firebase/firestore"
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { db } from "@/app/firebase";
import { Timestamp } from "firebase/firestore";


export default function GoalBoard() {
  const { currentUser, loading } = useAuth(); 
  const [ showGoals, setShowGoals] = useState([]);

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
        
        setShowGoals(goals)
        console.log("Goals set", showGoals);
      } catch (err) {
        console.error("Errro fetching goals", err);
      }
    };

    fetchGoals();

  }, [currentUser])
  
  
  useEffect(() => {
    console.log("showGoals updated:", showGoals);
  }, [showGoals]);

  return (
    <div className="bg-gradient-to-br from-[#070C2F] via-[#110E2D] to-[#13153F] p-6 rounded-xl text-white min-h-[200px]">
      <h2 className="text-xl font-semibold mb-2">🎯 Goal Board</h2>
      <ul className="flex gap-20">
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
      </ul>
    </div>
  );
}
