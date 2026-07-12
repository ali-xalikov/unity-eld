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
      <h1 className="text-4xl font-bold tracking-tight text-[#1B2140] dark:text-white">
        Dashboard
      </h1>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            placeholder="Qidirish..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-12 w-[260px] rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-[#1B2140] dark:text-white placeholder:text-gray-400 transition-all"
          />
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={onToggleDarkMode}
          className="rounded-2xl bg-white p-3.5 shadow-sm hover:bg-gray-50 dark:bg-[#1B2140] dark:text-white dark:hover:bg-white/10 transition-all active:scale-95"
          title={darkMode ? "Yorug' rejim" : "Qorong'u rejim"}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen((prev) => !prev)}
            className="rounded-2xl bg-white p-3.5 shadow-sm hover:bg-gray-50 dark:bg-[#1B2140] dark:text-white dark:hover:bg-white/10 transition-all active:scale-95 relative"
          >
            <Bell size={20} />
            <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center">
              <span className="text-[10px] text-white font-medium">3</span>
            </div>
          </button>

          {notificationsOpen && (
            <NotificationsPanel onClose={() => setNotificationsOpen(false)} />
          )}
        </div>
      </div>
    </div>
  );
}
