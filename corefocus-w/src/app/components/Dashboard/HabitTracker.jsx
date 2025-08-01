import { useEffect, useRef, useState } from 'react';
import { collection, getDocs, updateDoc, getDoc, setDoc, doc } from 'firebase/firestore';
import debounce from 'lodash.debounce';
import { format } from "date-fns"
import { db } from '@/app/firebase';
import { useAuth } from '@/app/context/AuthContext';
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from '@radix-ui/react-icons';

export default function TodaysHabits() {
  const { currentUser, loading } = useAuth(); 
  const [todaysHabits, setTodaysHabits] = useState([]);
  const [completedHabits, setCompletedHabits] = useState([]);

  const fullToShortDayMap = {
    Sunday: 'Sun',
    Monday: 'Mon',
    Tuesday: 'Tues',
    Wednesday: 'Wed',
    Thursday: 'Thurs',
    Friday: 'Fri',
    Saturday: 'Sat',
  };

  const todayFull = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const today = fullToShortDayMap[todayFull];

  useEffect(() => {
    const fetchHabits = async () => {
      if (!currentUser) return;

      try {
        const snapshot = await getDocs(collection(db, 'users', currentUser.uid, 'habits'));
        const habits = [];

        snapshot.forEach(doc => {
          const data = doc.data();
          if (data.habitFreq?.includes(today)) {
            habits.push({ id: doc.id, ...data });
          }
        });

        setTodaysHabits(habits);
      } catch (err) {
        console.error('Error fetching habits:', err);
      }
    };

    fetchHabits();
  }, [currentUser, today]);

  function toggleHabit(habitName) {
    setCompletedHabits((prev) => {
      const updated = prev.includes(habitName)
        ? prev.filter((h) => h !== habitName)
        : [...prev, habitName];

      // Fire the debounced update
      debouncedUpdateHabits(updated);
      return updated;
    });
  }

  const debouncedUpdateHabits = useRef(
    debounce(async (updatedList) => {
      if (!currentUser) return;
      const docRef = doc(db, "habitLogs", currentUser.uid);

      try {
        const snapshot = await getDoc(docRef);
        const prevData = snapshot.exists() ? snapshot.data() : {};

        await setDoc(
          docRef,
          {
            [today]: {
              completedHabits: updatedList,
              count: updatedList.length,
            },
          },
          { merge: true }
        );
      } catch (error) {
        console.error("Error updating habit log:", error);
      }
    }, 300)
  ).current;

  const progress = todaysHabits.length 
    ? Math.round((completedHabits.length / todaysHabits.length) * 100) 
    : 0;

    if (loading) {
      return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Habits for Today 
      </h2>

      {todaysHabits.length === 0 ? (
        <p className="text-gray-500 italic">No habits scheduled for today.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {todaysHabits.map(habit => (
              <li
                key={habit.id}
                className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <Checkbox.Root
                  className="flex size-[25px] min-w-[25px] appearance-none items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow focus:outline-none focus:ring-2 focus:ring-violet-500"
                  checked={completedHabits.includes(habit.id)}
                  onCheckedChange={() => toggleHabit(habit.id)}
                  id={`habit-${habit.id}`}
                >
                  <Checkbox.Indicator className="text-violet-600">
                    <CheckIcon />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <label
                  htmlFor={`habit-${habit.id}`}
                  className={`text-lg select-none cursor-pointer ${
                    completedHabits.includes(habit.id)
                      ? 'line-through text-gray-400'
                      : 'text-gray-800 dark:text-white'
                  }`}
                >
                  {habit.habitName}
                </label>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
              <span>{completedHabits.length} of {todaysHabits.length} complete</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-violet-500 h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}