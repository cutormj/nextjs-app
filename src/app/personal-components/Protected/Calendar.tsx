"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type ViewMode = "daily" | "weekly" | "monthly" | "yearly";

const Calendar = () => {
  const [view, setView] = useState<ViewMode>("monthly");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentDay, setCurrentDay] = useState(new Date().getDate());

  const today = new Date(currentYear, currentMonth, currentDay);

  const getMonthWeeks = (month: number) => {
    const firstDay = new Date(currentYear, month, 1);
    const lastDay = new Date(currentYear, month + 1, 0);
    const weeks: (Date | null)[][] = [];
    let week: (Date | null)[] = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      week.push(null);
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
      week.push(new Date(currentYear, month, d));
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    if (week.length) {
      while (week.length < 7) week.push(null);
      weeks.push(week);
    }

    return weeks;
  };

  const getWeekDays = () => {
    const temp = new Date(today);
    const start = new Date(temp.setDate(temp.getDate() - temp.getDay()));
    return Array.from({ length: 7 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
  };

  const getYearMonths = () => Array.from({ length: 12 }, (_, i) => i);

  const weekdays = [
    { key: "S", label: "S" },
    { key: "M", label: "M" },
    { key: "Tu", label: "T" },
    { key: "W", label: "W" },
    { key: "Th", label: "T" },
    { key: "F", label: "F" },
    { key: "Sa", label: "S" },
  ];

  const nextMonth = () => {
    setCurrentMonth((prev) => {
      const next = prev === 11 ? 0 : prev + 1;
      if (prev === 11) setCurrentYear((y) => y + 1);
      return next;
    });
  };

  const prevMonth = () => {
    setCurrentMonth((prev) => {
      const prevM = prev === 0 ? 11 : prev - 1;
      if (prev === 0) setCurrentYear((y) => y - 1);
      return prevM;
    });
  };

  const nextDay = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    setCurrentDay((prev) => {
      if (prev >= daysInMonth) {
        nextMonth();
        return 1;
      }
      return prev + 1;
    });
  };

  const prevDay = () => {
    if (currentDay <= 1) {
      prevMonth();
      const lastDayPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
      setCurrentDay(lastDayPrevMonth);
    } else {
      setCurrentDay((prev) => prev - 1);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg w-full max-w-8xl transition-opacity duration-300 ease-in-out">
      {/* View Switcher */}
      <div className="flex gap-2 mb-4 justify-center">
        {(["daily", "weekly", "monthly", "yearly"] as ViewMode[]).map((mode) => (
          <Button key={mode} variant={view === mode ? "default" : "outline"} onClick={() => setView(mode)}>
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </Button>
        ))}
      </div>

      {/* Pagination for Month */}
      {view === "monthly" && (
        <div className="flex justify-between items-center mb-4">
          <Button onClick={prevMonth} variant="outline">❮ Prev</Button>
          <h2 className="text-lg font-bold">
            {today.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h2>
          <Button onClick={nextMonth} variant="outline">Next ❯</Button>
        </div>
      )}

      {/* Daily View */}
      {view === "daily" && (
        <div className="text-center py-6 border rounded transition-opacity duration-300 ease-in-out">
          <h3 className="text-lg font-semibold">Daily View</h3>
          <p>{today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
          <div className="flex justify-center gap-4 mt-4">
            <Button onClick={prevDay} variant="outline">❮ Prev Day</Button>
            <Button onClick={nextDay} variant="outline">Next Day ❯</Button>
          </div>
        </div>
      )}

      {/* Weekly View */}
      {view === "weekly" && (
        <>
          <div className="grid grid-cols-7 text-center font-bold">
            {weekdays.map((day) => (
              <div key={day.key} className="p-2 border-b">{day.label}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2 mt-2">
            {getWeekDays().map((day, index) => (
              <div
                key={index}
                className="p-2 border rounded text-center h-12 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  setCurrentYear(day.getFullYear());
                  setCurrentMonth(day.getMonth());
                  setCurrentDay(day.getDate());
                  setView("daily");
                }}
              >
                {day.getDate()}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Monthly View */}
      {view === "monthly" && (
        <>
          <div className="grid grid-cols-7 text-center font-bold">
            {weekdays.map((day) => (
              <div key={day.key} className="p-2 border-b">{day.label}</div>
            ))}
          </div>
          <div className="flex flex-col gap-2 mt-2">
            {getMonthWeeks(currentMonth).map((week, wIndex) => (
              <div
                key={wIndex}
                className="grid grid-cols-7 gap-2 group cursor-pointer hover:bg-gray-100 rounded transition-all"
                onClick={() => {
                  const nonNull = week.filter(Boolean) as Date[];
                  if (nonNull.length) {
                    const start = nonNull[0];
                    setCurrentYear(start.getFullYear());
                    setCurrentMonth(start.getMonth());
                    setCurrentDay(start.getDate());
                    setView("weekly");
                  }
                }}
              >
                {week.map((day, index) => (
                  <div
                    key={index}
                    className="p-2 border rounded text-center h-12 group-hover:bg-gray-200 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent week click
                      if (day) {
                        setCurrentYear(day.getFullYear());
                        setCurrentMonth(day.getMonth());
                        setCurrentDay(day.getDate());
                        setView("daily");
                      }
                    }}
                  >
                    {day ? day.getDate() : ""}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Yearly View */}
      {view === "yearly" && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {getYearMonths().map((monthIndex) => (
            <div
              key={monthIndex}
              className="p-4 border rounded bg-gray-50 cursor-pointer hover:bg-gray-100 transition-all"
              onClick={() => {
                setCurrentMonth(monthIndex);
                setView("monthly");
              }}
            >
              <h3 className="text-lg font-bold text-center">
                {new Date(currentYear, monthIndex).toLocaleDateString("en-US", { month: "long" })}
              </h3>
              <div className="grid grid-cols-7 text-center font-bold mt-4">
                {weekdays.map((day) => (
                  <div key={day.key} className="p-1 border-b text-xs">{day.label}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 mt-2">
                {getMonthWeeks(monthIndex).flat().map((day, index) => (
                  <div
                    key={index}
                    className="p-2 border rounded text-xs text-center h-8 hover:bg-gray-200 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent month click
                      if (day) {
                        setCurrentYear(day.getFullYear());
                        setCurrentMonth(day.getMonth());
                        setCurrentDay(day.getDate());
                        setView("daily");
                      }
                    }}
                  >
                    {day ? day.getDate() : ""}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calendar;
