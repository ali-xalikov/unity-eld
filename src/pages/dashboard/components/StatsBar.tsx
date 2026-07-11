import { ChevronDown, PieChart, TriangleAlert } from "lucide-react";
import type { Driver } from "../types/driver";

interface StatsBarProps {
  drivers: Driver[];
}

function StatCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 items-center gap-5 rounded-2xl bg-white dark:bg-[#1B2140] px-6 py-4 shadow-sm">
      <h2 className="text-sm font-semibold text-[#1B2140] dark:text-white whitespace-nowrap">
        {title}
      </h2>
      <div className="flex flex-1 items-center gap-5 text-sm">{children}</div>
    </div>
  );
}

function StatPill({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <span className="whitespace-nowrap">
      <span className="text-gray-400 dark:text-gray-500">{label} </span>
      <span className={`font-semibold ${color}`}>{value}</span>
    </span>
  );
}

function DriversStatusCard() {
  return (
    <StatCard title="Drivers">
      <StatPill
        label="Off duty"
        value={12}
        color="text-gray-500 dark:text-gray-300"
      />
      <StatPill label="On duty" value={4} color="text-blue-500" />
      <StatPill label="Driving" value={6} color="text-green-500" />
      <StatPill label="Sleeping" value={0} color="text-orange-500" />
    </StatCard>
  );
}

function ViolationsChartCard({ drivers }: { drivers: Driver[] }) {
  const total = drivers.length;
  const violations = drivers.filter((d) => d.violation === "Violation").length;
  const signature = drivers.filter(
    (d) => d.violation === "Form & Signature"
  ).length;

  const pct = (count: number) =>
    total === 0 ? 0 : Math.round((count / total) * 100);

  return (
    <StatCard title="Violations Chart">
      <span className="flex items-center gap-1 whitespace-nowrap">
        <TriangleAlert size={12} className="text-red-500" />
        <span className="text-gray-400 dark:text-gray-500">Violations</span>
        <span className="font-semibold text-red-500">
          {violations} ({pct(violations)}%)
        </span>
      </span>
      <span className="flex items-center gap-1 whitespace-nowrap">
        <PieChart size={12} className="text-amber-500" />
        <span className="text-gray-400 dark:text-gray-500">Signature</span>
        <span className="font-semibold text-amber-500">
          {signature} ({pct(signature)}%)
        </span>
      </span>
    </StatCard>
  );
}

function OverviewCard({ drivers }: { drivers: Driver[] }) {
  return (
    <div className="flex flex-1 items-stretch gap-2.5">
      <StatCard title="Overview">
        <span className="whitespace-nowrap">
          <span className="font-semibold text-green-500">
            {drivers.length}{" "}
          </span>
          <span className="text-gray-400 dark:text-gray-500">
            Active drivers
          </span>
        </span>
        <span className="whitespace-nowrap">
          <span className="font-semibold text-red-500">44 </span>
          <span className="text-gray-400 dark:text-gray-500">
            Active vehicles
          </span>
        </span>
        <span className="whitespace-nowrap">
          <span className="font-semibold text-[#1B2140] dark:text-white">
            890{" "}
          </span>
          <span className="text-gray-400 dark:text-gray-500">Inspection</span>
        </span>
      </StatCard>

      <button
        aria-label="Overview options"
        className="flex w-11 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-[#1B2140] shadow-sm hover:bg-gray-50 dark:hover:bg-white/10"
      >
        <ChevronDown size={16} className="text-gray-400 dark:text-gray-500" />
      </button>
    </div>
  );
}

export default function StatsBar({ drivers }: StatsBarProps) {
  return (
    <div className="mt-3 grid grid-cols-3 gap-4">
      <DriversStatusCard />
      <ViolationsChartCard drivers={drivers} />
      <OverviewCard drivers={drivers} />
    </div>
  );
}
