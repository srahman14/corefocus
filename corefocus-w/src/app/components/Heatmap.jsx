"use client";
import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css"; // default styling
import { addDays, format } from "date-fns";

export default function Heatmap({ habitLogs }) {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), 0, 1);
  console.log("[Heatmap] raw habitLogs:", habitLogs);

  const values = Object.entries(habitLogs || {})
    .filter(([docId]) => docId !== "meta") // ignore meta doc
    .map(([date, log]) => {
      const count = log.count ?? log.completedHabits?.length ?? 0;
      console.log(`[Heatmap] processing date: ${date}, count: ${count}`);
      return { date, count };
    });

  console.log("[Heatmap] final values array:", values);

  return (
    <div className="bg-gradient-to-br from-[#C0AFE2] via-[#CEC2EB] to-[#C0AFE2] dark:from-[#070C2F] dark:via-[#110E2D] dark:to-[#13153F] p-4 rounded-xl shadow-xl container p-12">
      <h2 className="text-xl font-bold mb-4">Habit Heatmap</h2>
      <CalendarHeatmap
        startDate={startDate}
        endDate={today}
        values={values}
        classForValue={(value) => {
          const todayStr = format(new Date(), "yyyy-MM-dd");

          if (!value) return "color-empty";
          if (value.count === 0) return "color-empty";
          if (value.count < 2) return "color-scale-1";
          if (value.count < 4) return "color-scale-2";
          if (value.count < 6) return "color-scale-3";
          return "color-scale-4";
        }}
        tooltipDataAttrs={(value) => {
          if (!value?.date) return null;
          return {
            "data-tip": `${value.date}: ${value.count} completed`,
          };
        }}
        showWeekdayLabels
      />
    </div>
  );
}
