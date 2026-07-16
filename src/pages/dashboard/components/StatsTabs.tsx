import type { Driver } from "../types/driver";

interface StatsTabsProps {
  drivers: Driver[];
}

interface StatTab {
  id: string;
  label: string;
  count: number;
  color: string;
}

function getStatTabs(drivers: Driver[]): StatTab[] {
  return [
    {
      id: "on-duty",
      label: "On duty",
      count: drivers.filter((d) => d.eld === "Connected").length,
      color: "text-blue-500",
    },
    {
      id: "drive",
      label: "Drive",
      count: drivers.filter((d) => d.eld === "Connected").length,
      color: "text-green-500",
    },
    {
      id: "off-duty",
      label: "Off duty",
      count: drivers.filter((d) => d.eld === "Not connected").length,
      color: "text-gray-500",
    },
    {
      id: "sleeper",
      label: "Sleeper",
      count: 6,
      color: "text-orange-500",
    },
  ];
}

export default function StatsTabs({ drivers }: StatsTabsProps) {
  const tabs = getStatTabs(drivers);

  return (
    <div className="mt-6 flex gap-4">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#222847] cursor-pointer transition-colors"
        >
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            {tab.count}
          </span>
          <span className={`text-sm font-medium ${tab.color}`}>
            {tab.label}
          </span>
        </div>
      ))}
    </div>
  );
}
