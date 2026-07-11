import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarPopoverProps {
  onClose: () => void;
  onSelectDate: (date: Date) => void;
  selectedDate: Date | null;
}

const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getStartOffset(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export default function CalendarPopover({
  onClose,
  onSelectDate,
  selectedDate,
}: CalendarPopoverProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(
    selectedDate ? selectedDate.getFullYear() : today.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(
    selectedDate ? selectedDate.getMonth() : today.getMonth()
  );

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const startOffset = getStartOffset(viewYear, viewMonth);
  const cells = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const monthLabel = new Date(viewYear, viewMonth).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const goPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const isSameDay = (day: number) =>
    selectedDate &&
    selectedDate.getFullYear() === viewYear &&
    selectedDate.getMonth() === viewMonth &&
    selectedDate.getDate() === day;

  const isToday = (day: number) =>
    today.getFullYear() === viewYear &&
    today.getMonth() === viewMonth &&
    today.getDate() === day;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-12 z-50 w-72 rounded-xl border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-[#1B2140]">
        <div className="mb-3 flex items-center justify-between">
          <button
            onClick={goPrevMonth}
            className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-semibold text-[#1B2140] dark:text-white">
            {monthLabel}
          </span>
          <button
            onClick={goNextMonth}
            className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 dark:text-gray-400">
          {weekDays.map((d) => (
            <span key={d} className="py-1">
              {d}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) =>
            day === null ? (
              <span key={`empty-${i}`} />
            ) : (
              <button
                key={day}
                onClick={() => {
                  onSelectDate(new Date(viewYear, viewMonth, day));
                  onClose();
                }}
                className={`h-8 w-8 rounded-lg text-sm transition ${
                  isSameDay(day)
                    ? "bg-orange-500 text-white"
                    : isToday(day)
                    ? "border border-orange-500 text-orange-500"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10"
                }`}
              >
                {day}
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
}
