import { useState } from "react";
import { Bell, Moon, Search, Sun } from "lucide-react";
import NotificationsPanel from "./NotificationsPanel";

interface TopHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function TopHeader({
  search,
  onSearchChange,
  darkMode,
  onToggleDarkMode,
}: TopHeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-4xl font-bold text-[#1B2140] dark:text-white">
        Dashboard
      </h1>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-11 w-[220px] rounded-lg border border-gray-200 bg-white pl-10 outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-[#1B2140] dark:text-white"
          />
        </div>

        <button
          onClick={onToggleDarkMode}
          className="rounded-lg bg-white p-3 shadow-sm hover:bg-gray-50 dark:bg-[#1B2140] dark:text-white dark:hover:bg-white/10"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="relative">
          <button
            onClick={() => setNotificationsOpen((prev) => !prev)}
            className="rounded-lg bg-white p-3 shadow-sm hover:bg-gray-50 dark:bg-[#1B2140] dark:text-white dark:hover:bg-white/10"
          >
            <Bell size={18} />
          </button>
          {notificationsOpen && (
            <NotificationsPanel onClose={() => setNotificationsOpen(false)} />
          )}
        </div>
      </div>
    </div>
  );
}
