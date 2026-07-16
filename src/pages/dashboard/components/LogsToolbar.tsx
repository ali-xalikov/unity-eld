import { Calendar, ChevronDown, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import CalendarPopover from "./CalendarPopver";

export default function LogsToolbar() {
  const [activeTab, setActiveTab] = useState("drivers");
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const tabs = [
    { id: "map", label: "Map" },
    { id: "drivers", label: "Drivers" },
    { id: "logs", label: "Logs" },
    { id: "validation", label: "Validation" },
    { id: "trackings", label: "Trackings" },
  ];

  const handleTabClick = (tabId: string) => {
    if (tabId === "drivers") {
      setActiveTab(tabId);
    } else {
      toast("Bu sahifa hali ishlab chiqilmoqda");
    }
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`px-6 py-2.5 rounded-2xl font-medium text-sm transition-all ${
              activeTab === tab.id
                ? "bg-[#1B2140] text-white dark:bg-white dark:text-[#1B2140]"
                : "bg-white text-gray-600 dark:bg-[#1B2140] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#222847]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex justify-end gap-3">
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
                ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
            }`}
          >
            {autoRefresh ? "ON" : "OFF"}
          </span>
          <ChevronDown size={16} />
        </button>

        {/* Refresh Button */}
        <button
          onClick={() => toast.success("Ma'lumotlar yangilandi")}
          className="flex h-12 items-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-[#1B2140] dark:text-gray-200 dark:hover:bg-white/10 active:scale-[0.985] transition-all"
        >
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>
    </div>
  );
}
