"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

export default function MonthlyHabitsChart({ habitLogs }) {
  const today = new Date();
  const daysInMonth = today.getDate(); // current day of the month
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const currentMonth = new Date().toLocaleString("en-US", { month: "short" });

  const chartData = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const date = new Date(today.getFullYear(), today.getMonth(), day);
    const dateStr = format(date, "yyyy-MM-dd");

    return {
      day: day,
      count: habitLogs[dateStr]?.count || 0,
    };
  });

  console.log("[MonthlyHabitsChart] chartData:", chartData);
  return (
    <div className="w-full h-100 p-4 rounded-xl bg-gradient-to-br from-[#C0AFE2] via-[#CEC2EB] to-[#C0AFE2] dark:from-[#070C2F] dark:via-[#110E2D] dark:to-[#13153F]">
      <h2 className="text-xl font-bold mb-4 text-white">Monthly Habit Progress</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(122, 122, 122, 1)" />
          <XAxis
            dataKey="day"
            label={{
              value: "Day of Month",
              position: "insideBottom",
              offset: -10,
            }}
          />
          <YAxis
            allowDecimals={false}
            label={{
              value: "Habits Completed",
              angle: -90,
              position: "Left",
            }}
          />

          <Tooltip
            formatter={(value) => [value, "Completed"]}
            labelFormatter={(day) => `${day} ${currentMonth}`} // currentMonth = 'Sep' for example
          />

          <Line
            type="monotone"
            dataKey="count"
            stroke="#7E4E9E"
            strokeWidth={3}
            dot={{ r: 0 }}
            activeDot={{ r: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
