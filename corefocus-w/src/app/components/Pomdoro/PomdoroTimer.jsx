"use client";

import { useState, useEffect, useRef } from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function PomodoroTimer() {
  const [focusDuration, setFocusDuration] = useState(25); // in minutes
  const [breakDuration, setBreakDuration] = useState(5); // in minutes

  const [timeLeft, setTimeLeft] = useState(focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(true);
  const intervalRef = useRef(null);

  const startSound = useRef(null);
  const switchSound = useRef(null);
  const stopSound = useRef(null);

  const totalDuration = isFocusMode ? focusDuration * 60 : breakDuration * 60;
  const percentage = ((totalDuration - timeLeft) / totalDuration) * 100;

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // ⏱ Timer countdown
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0 && isRunning) {
      switchSound.current?.play();
      setIsRunning(false); // stop timer on switch
      setIsFocusMode((prev) => !prev);
      setTimeLeft(!isFocusMode ? focusDuration * 60 : breakDuration * 60);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, isFocusMode, focusDuration, breakDuration]);

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

      {/* Progress */}
      <div className="w-64 h-64">
        <CircularProgressbarWithChildren
          value={percentage}
          styles={buildStyles({
            pathColor: isFocusMode ? "#8e51ff" : "#bda0f3ff",
            trailColor: "#333",
          })}
        >
          <div className="text-3xl font-mono">{formatTime(timeLeft)}</div>
          <div className="text-sm mt-1 italic">{isFocusMode ? "Focus" : "Break"}</div>
        </CircularProgressbarWithChildren>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <button
          onClick={handleStartPause}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          {isRunning ? "Pause" : "Start"}
        </button>

        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-800 transition"
        >
          Reset
        </button>

        {!isFocusMode && (
          <button
            onClick={handleJumpToFocus}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition"
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
