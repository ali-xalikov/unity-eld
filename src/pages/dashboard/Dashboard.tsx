import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopHeader from "./components/TopHeader";
import Toolbar from "./components/Toolbar";
import StatsBar from "./components/StatsBar";
import DriversPanel from "./components/DriversPanel";
import { initialDrivers } from "./data/drivers";
import type { Driver } from "./types/driver";

export default function Dashboard() {
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleAddDriver = (driver: Driver) => {
    setDrivers((prev) => [driver, ...prev]);
  };
  const [collapsed, setCollapsed] = useState(false);


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

          <Toolbar />

          <StatsBar drivers={drivers} />

          <DriversPanel
            drivers={drivers}
            onAddDriver={handleAddDriver}
            search={search}
          />
        </main>
      </div>
    </div>
  );
}
