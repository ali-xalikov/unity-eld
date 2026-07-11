import type { Driver } from "../types/driver";

interface DriversTableProps {
  drivers: Driver[];
}

const gridCols = "grid-cols-[1.6fr_1.2fr_1.3fr_1.2fr_0.8fr_1.1fr_1fr]";

function TableHeader() {
  return (
    <div
      className={`grid ${gridCols} gap-4 px-4 pb-2 text-sm text-gray-500 dark:text-gray-300`}
    >
      <span>Name</span>
      <span>Violations</span>
      <span>Date</span>
      <span>Eld connection</span>
      <span>Cycle</span>
      <span>Company</span>
      <span>Updated</span>
    </div>
  );
}

function DriverRow({ driver }: { driver: Driver }) {
  return (
    <div
      className={`grid ${gridCols} items-center gap-4 rounded-xl bg-white dark:bg-[#1B2140] px-4 py-4 text-sm hover:shadow-sm transition`}
    >
      <span className="font-medium text-[#1B2140] dark:text-white">
        {driver.name}
      </span>
      <span
        className={`font-medium ${
          driver.violation === "Violation"
            ? "text-red-500"
            : driver.violation
            ? "text-orange-500"
            : "text-gray-400 dark:text-gray-500"
        }`}
      >
        {driver.violation || "—"}
      </span>
      <span className="text-gray-600 dark:text-gray-300">{driver.date}</span>
      <span
        className={`font-medium ${
          driver.eld === "Connected" ? "text-green-600" : "text-red-500"
        }`}
      >
        {driver.eld}
      </span>
      <span className="font-medium text-[#1B2140] dark:text-white">
        {driver.cycle}
      </span>
      <span className="text-gray-600 dark:text-gray-300">{driver.company}</span>
      <span className="text-sky-500">{driver.updated}</span>
    </div>
  );
}

export default function DriversTable({ drivers }: DriversTableProps) {
  return (
    <div className="mt-2">
      <TableHeader />
      <div className="space-y-2">
        {drivers.map((driver) => (
          <DriverRow key={driver.id} driver={driver} />
        ))}

        {drivers.length === 0 && (
          <div className="rounded-xl bg-white dark:bg-[#1B2140] px-4 py-8 text-center text-sm text-gray-400 dark:text-gray-500">
            No drivers match the current filters.
          </div>
        )}
      </div>
    </div>
  );
}
