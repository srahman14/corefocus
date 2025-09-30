"use client";
import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css"; // default styling
import { addDays, format } from "date-fns";


export default function Heatmap({ habitLogs }) {
  const today = new Date();
  const [startDate, setStartDate] = useState(new Date(today.getFullYear(), 0, 1));

  // Responsive: show only last 2 months on small screens, full year on md+
  useEffect(() => {
    function updateStartDate() {
      const now = new Date();
      if (window.innerWidth < 768) { // Tailwind md: 768px
        // Set startDate to 2 months ago
        const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);
        setStartDate(twoMonthsAgo);
      } else {
        setStartDate(new Date(now.getFullYear(), 0, 1));
      }
    }
    updateStartDate();
    window.addEventListener("resize", updateStartDate);
    return () => window.removeEventListener("resize", updateStartDate);
  }, []);


  const values = Object.entries(habitLogs || {})
    .filter(([docId]) => docId !== "meta") // ignore meta doc
    .map(([date, log]) => {
      const count = log.count ?? log.completedHabits?.length ?? 0;
      return { date, count };
    })
    .filter(({ date }) => {
      // Only include values within the startDate and today
      const d = new Date(date);
      return d >= startDate && d <= today;
    });



  return (
    <div className="bg-gradient-to-br from-[#C0AFE2] via-[#CEC2EB] to-[#C0AFE2] dark:from-[#070C2F] dark:via-[#110E2D] dark:to-[#13153F] p-4 rounded-xl shadow-xl container p-12">
      <h2 className="text-2xl font-bold mb-4 text-white">Habit Heatmap</h2>
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
