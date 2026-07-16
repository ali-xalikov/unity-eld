import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopHeader from "./components/TopHeader";
import LogsToolbar from "./components/LogsToolbar";
import StatsTabs from "./components/StatsTabs";
import LogsTable from "./components/LogsTable";
import { initialDrivers } from "./data/drivers";

export default function Logs() {
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const drivers = initialDrivers;
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex min-h-screen bg-[#F5F7FA] dark:bg-[#12162C]">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        <main className={`flex-1 ${!collapsed ? 'ml-72' : 'ml-15'} p-8`}>
          <TopHeader
            search={search}
            onSearchChange={setSearch}
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode((prev) => !prev)}
          />

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#1B2140] dark:text-white">Logs</h1>

            <StatsTabs drivers={drivers} />
          </div>

          <LogsToolbar />

          {/* Date Section */}
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            {currentDate}
          </div>

          <LogsTable search={search} />
        </main>
      </div>
    </div>
  );
}
