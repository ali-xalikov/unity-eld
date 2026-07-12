import type { Driver } from "../types/driver";

interface DriversTableProps {
  drivers: Driver[];
}

const gridCols = "grid-cols-[1.6fr_1.2fr_1.3fr_1.2fr_0.8fr_1.1fr_1fr]";

function TableHeader() {
  return (
    <div
      className={`grid ${gridCols} gap-4 px-6 pb-4 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700`}
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
      className={`grid ${gridCols} items-center gap-4 rounded-2xl bg-white dark:bg-[#1B2140] px-6 py-5 text-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border border-transparent hover:border-gray-100 dark:hover:border-gray-700`}
    >
      <span className="font-semibold text-[#1B2140] dark:text-white">
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

      <span className="text-gray-600 dark:text-gray-300 font-medium">
        {driver.date}
      </span>

      <span
        className={`inline-flex items-center gap-1.5 font-medium ${
          driver.eld === "Connected" ? "text-green-600" : "text-red-500"
        }`}
      >
        <span
          className={`h-2 w-2 rounded-full ${
            driver.eld === "Connected" ? "bg-green-500" : "bg-red-500"
          }`}
        />
        {driver.eld}
      </span>

      <span className="font-semibold text-[#1B2140] dark:text-white">
        {driver.cycle}
      </span>

      <span className="text-gray-600 dark:text-gray-300">{driver.company}</span>

      <span className="text-sky-500 font-medium text-xs">{driver.updated}</span>
    </div>
  );
}

export default function DriversTable({ drivers }: DriversTableProps) {
  return (
    <div>
      <TableHeader />

      <div className="mt-3 space-y-3">
        {drivers.map((driver) => (
          <DriverRow key={driver.id} driver={driver} />
        ))}

        {drivers.length === 0 && (
          <div className="rounded-3xl bg-white dark:bg-[#1B2140] py-16 text-center border border-dashed border-gray-200 dark:border-gray-700">
            <p className="text-gray-400 dark:text-gray-500 text-lg">
              No drivers match the current filters.
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Try changing your filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
