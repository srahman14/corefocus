"use client";
import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css"; // default styling
import { addDays, format } from "date-fns";

export default function Heatmap({ habitLogs }) {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), 0, 1);

  const values = Object.entries(habitLogs || {}).map(([date, log]) => ({
    date,
    count: log.completedHabits?.length || 0,
  }));

  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow-xl container p-12">
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
