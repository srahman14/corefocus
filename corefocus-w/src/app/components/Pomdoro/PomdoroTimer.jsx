"use client";

import { useState, useEffect, useRef } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import * as Dialog from "@radix-ui/react-dialog";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useAuth } from "@/app/context/AuthContext";

export default function PomodoroTimer() {
  const { currentUser } = useAuth();
  const [userId, setUserId] = useState(null);
  // for naming sessions
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sessionName, setSessionName] = useState("");
  // track start time of current session
  const [sessionStartTime, setSessionStartTime] = useState(null);
  // in minutes
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  // in seconds
  const [timeLeft, setTimeLeft] = useState(focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(true);
  const intervalRef = useRef(null);
  // sounds
  const startSound = useRef(null);
  const switchSound = useRef(null);
  const stopSound = useRef(null);
  // converting into seconds
  const totalDuration = isFocusMode ? focusDuration * 60 : breakDuration * 60;
  const percentage = ((totalDuration - timeLeft) / totalDuration) * 100;

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;s
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // ⏱ Timer countdown
  useEffect(() => {
    if (isRunning && !sessionStartTime) {
      setSessionStartTime(new Date());
    }

    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0 && isRunning) {
      const saveSession = async () => {
        if (!currentUser?.uid) {
          console.log("User not auth, cannot save session");
          return;
        }

        // Only save Focus sessions
        if (!isFocusMode) return;

        try {
          // Format today’s date (YYYY-MM-DD)
          const sessionDate = new Date().toISOString().split("T")[0];

          const sessionData = {
            sessionName: sessionName || "Focus Session",
            duration: focusDuration, // in minutes
            startTime: sessionStartTime,
            endTime: serverTimestamp(),
            type: "Focus",
          };

          // Reference: users/{uid}/pomodoroSessions/{date}/sessions/{autoId}
          const sessionsCollectionRef = collection(
            db,
            "users",
            currentUser.uid,
            "pomodoroSessions",
            sessionDate,
            "sessions"
          );

          await addDoc(sessionsCollectionRef, sessionData);

          console.log("Focus session saved under date:", sessionDate);
        } catch (error) {
          console.error("Error saving session:", error);
        }
      };
      saveSession();

      // Switch modes
      setIsRunning(false);
      setIsFocusMode((prev) => !prev);
      setTimeLeft(!isFocusMode ? focusDuration * 60 : breakDuration * 60);
      setSessionStartTime(null); // Reset start time for the next session
    }

    return () => clearInterval(intervalRef.current);
  }, [
    isRunning,
    timeLeft,
    isFocusMode,
    focusDuration,
    breakDuration,
    sessionStartTime,
    sessionName,
  ]);

  const handleStartPause = () => {
    if (timeLeft === 0) return;
    setIsRunning((prev) => {
      const newState = !prev;
      if (newState) startSound.current?.play();
      if (!newState) stopSound.current?.play();
      return newState;
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTimeLeft(isFocusMode ? focusDuration * 60 : breakDuration * 60);
  };

  const handleJumpToFocus = () => {
    setIsRunning(false);
    setIsFocusMode(true);
    clearInterval(intervalRef.current);
    setTimeLeft(focusDuration * 60);
  };

  const handleCustomDuration = (type, value) => {
    const minutes = parseInt(value);
    if (isNaN(minutes) || minutes <= 0) return;

    if (type === "focus") {
      setFocusDuration(minutes);
      if (isFocusMode) {
        setTimeLeft(minutes * 60);
      }
    } else {
      setBreakDuration(minutes);
      if (!isFocusMode) {
        setTimeLeft(minutes * 60);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-22 text-white gap-6">
      {/* Load sounds */}
      <audio ref={startSound} src="/sounds/start.mp3" preload="auto" />
      <audio ref={switchSound} src="/sounds/switch.mp3" preload="auto" />
      <audio ref={stopSound} src="/sounds/stop.mp3" preload="auto" />
      {/* Input for session names */}
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Trigger asChild>
          <button className="text-xl font-bold cursor-pointer hover:text-white/50">
            {sessionName || "Click to name your session"}
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/50 fixed inset-0 z-10" />
          <Dialog.Content className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-6 rounded-lg shadow-lg z-20 w-1/2">
            <Dialog.Title className="text-white text-lg font-bold">
              Name Your Session
            </Dialog.Title>
            <div className="mt-4">
              <input
                type="text"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                placeholder="e.g., 'Writing Blog Post'"
                className="w-full p-2 rounded bg-gray-700 text-white outline-none"
              />
            </div>
            <div className="mt-4 flex justify-center gap-2">
              <Dialog.Close asChild>
                <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition">
                  Cancel
                </button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <button
                  onClick={() => {
                    // Logic to save the name if needed, though it's already updated by onChange
                  }}
                  className="px-4 py-2 bg-[#7E4E9E] rounded hover:bg-[#7E4E9E]/70 transition"
                >
                  Save
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Progress */}
      <div className="w-64 h-64">
        <CircularProgressbarWithChildren
          value={percentage}
          styles={buildStyles({
            pathColor: isFocusMode ? "#7E4E9E" : "#bda0f3ff",
            trailColor: "#333",
          })}
        >
          <div className="text-3xl font-mono">{formatTime(timeLeft)}</div>
          <div className="text-sm mt-1 italic">
            {isFocusMode ? "Focus" : "Break"}
          </div>
        </CircularProgressbarWithChildren>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <button
          onClick={handleStartPause}
          className="px-4 py-2 cursor-pointer bg-[#B19CD7] hover:bg-[#B19CD7]/50 dark:bg-blue-600 rounded dark:hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          {isRunning ? "Pause" : "Start"}
        </button>

        <button
          onClick={handleReset}
          className="px-4 py-2 cursor-pointer bg-gray-700 rounded hover:bg-gray-800 transition duration-300 ease-in-out"
        >
          Reset
        </button>

        {!isFocusMode && (
          <button
            onClick={handleJumpToFocus}
            className="px-4 py-2 cursor-pointer bg-[#7E4E9E] rounded hover:bg-[#7E4E9E]/70 transition duration-300 ease-in-out"
          >
            Start Focus Now
          </button>
        )}
      </div>

      {/* Custom Durations */}
      <div className="flex gap-4 mt-6 text-sm">
        <label className="flex flex-col items-center">
          Focus (min)
          <input
            type="number"
            min={1}
            value={focusDuration}
            onChange={(e) => handleCustomDuration("focus", e.target.value)}
            className="w-20 outline-none mt-1 px-2 py-1 text-white font-bold text-3xl items-center justify-center rounded"
          />
        </label>

        <label className="flex flex-col items-center">
          Break (min)
          <input
            type="number"
            min={1}
            value={breakDuration}
            onChange={(e) => handleCustomDuration("break", e.target.value)}
            className="w-20 outline-none mt-1 px-2 py-1 text-white font-bold text-3xl items-center justify-center rounded"
          />
        </label>
      </div>
    </div>
  );
}
