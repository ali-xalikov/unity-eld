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
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute right-6 top-20 z-50 w-80 rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-[#1B2140]">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={goPrevMonth}
            className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10 transition-all active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>

          <span className="text-lg font-semibold text-[#1B2140] dark:text-white">
            {monthLabel}
          </span>

          <button
            onClick={goNextMonth}
            className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10 transition-all active:scale-95"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Week days */}
        <div className="grid grid-cols-7 gap-1 mb-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400">
          {weekDays.map((d) => (
            <div key={d} className="py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) =>
            day === null ? (
              <div key={`empty-${i}`} className="h-10" />
            ) : (
              <button
                key={day}
                onClick={() => {
                  onSelectDate(new Date(viewYear, viewMonth, day));
                  onClose();
                }}
                className={`h-10 w-10 rounded-2xl text-sm font-medium transition-all hover:bg-orange-100 dark:hover:bg-white/10 ${
                  isSameDay(day)
                    ? "bg-orange-500 text-white shadow-md"
                    : isToday(day)
                    ? "border-2 border-orange-500 text-orange-500"
                    : "text-gray-700 dark:text-gray-200 hover:text-orange-500"
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
