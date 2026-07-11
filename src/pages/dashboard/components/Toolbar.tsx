import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import CalendarPopover from "./CalendarPopver";

export default function Toolbar() {
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="mt-6 flex justify-end gap-3">
      <div className="relative">
        <button
          onClick={() => setCalendarOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 hover:bg-gray-50 dark:border-gray-700 dark:bg-[#1B2140] dark:text-white dark:hover:bg-white/10"
        >
          <Calendar size={16} className="text-gray-500 dark:text-gray-300" />
          {selectedDate && (
            <span className="text-sm text-gray-600 dark:text-gray-200">
              {selectedDate.toLocaleDateString()}
            </span>
          )}
        </button>
        {calendarOpen && (
          <CalendarPopover
            onClose={() => setCalendarOpen(false)}
            onSelectDate={(date) => {
              setSelectedDate(date);
              toast(`Sana tanlandi: ${date.toLocaleDateString()}`);
            }}
            selectedDate={selectedDate}
          />
        )}
      </div>

      <button
        onClick={() => setAutoRefresh((prev) => !prev)}
        className="flex h-9 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:bg-[#1B2140] dark:text-gray-200 dark:hover:bg-white/10"
      >
        Auto Refresh {autoRefresh ? "on" : "off"}
        <ChevronDown size={14} />
      </button>

      <button
        onClick={() => toast("Ma'lumotlar yangilandi")}
        className="flex h-9 items-center gap-2 rounded-lg bg-white text-gray-500 px-4 text-sm font-medium hover:bg-gray-50 border border-gray-200 dark:border-gray-700 dark:bg-[#1B2140] dark:text-gray-200 dark:hover:bg-white/10"
      >
        Refresh
      </button>
    </div>
  );
}
