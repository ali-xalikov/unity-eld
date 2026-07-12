import { useState } from "react";
import { Calendar, ChevronDown, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import CalendarPopover from "./CalendarPopver";

export default function Toolbar() {
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="mt-8 flex justify-end gap-3">
      {/* Calendar */}
      <div className="relative">
        <button
          onClick={() => setCalendarOpen((prev) => !prev)}
          className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3 hover:bg-gray-50 dark:border-gray-700 dark:bg-[#1B2140] dark:text-white dark:hover:bg-white/10 transition-all active:scale-[0.985]"
        >
          <Calendar size={18} className="text-gray-500 dark:text-gray-400" />
          {selectedDate ? (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {selectedDate.toLocaleDateString("uz-UZ")}
            </span>
          ) : (
            <span className="text-sm text-gray-500">Bugungi sana</span>
          )}
        </button>

        {calendarOpen && (
          <CalendarPopover
            onClose={() => setCalendarOpen(false)}
            onSelectDate={(date) => {
              setSelectedDate(date);
              toast.success(
                `Sana tanlandi: ${date.toLocaleDateString("uz-UZ")}`
              );
            }}
            selectedDate={selectedDate}
          />
        )}
      </div>

      {/* Auto Refresh */}
      <button
        onClick={() => {
          setAutoRefresh((prev) => !prev);
          toast.info(
            autoRefresh ? "Auto Refresh o'chirildi" : "Auto Refresh yoqildi"
          );
        }}
        className="flex h-12 items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:bg-[#1B2140] dark:text-gray-200 dark:hover:bg-white/10 transition-all"
      >
        Auto Refresh
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            autoRefresh
              ? "bg-green-100 text-green-600"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {autoRefresh ? "ON" : "OFF"}
        </span>
        <ChevronDown size={16} />
      </button>

      {/* Refresh Button */}
      <button
        onClick={() => toast.success("Ma'lumotlar yangilandi")}
        className="flex h-12 items-center gap-3 rounded-2xl bg-orange-500 px-6 text-sm font-semibold text-white hover:bg-orange-600 active:scale-[0.985] transition-all shadow-sm"
      >
        <RefreshCw size={18} />
        Refresh
      </button>
    </div>
  );
}
