import type { DriverFilters, Direction, OrderBy } from "../types/driver";

interface DriversSortBarProps {
  orderBy: OrderBy;
  direction: Direction;
  onChange: <K extends keyof DriverFilters>(
    key: K,
    value: DriverFilters[K]
  ) => void;
}

export default function DriversSortBar({
  orderBy,
  direction,
  onChange,
}: DriversSortBarProps) {
  return (
    <div className="mt-4 flex items-start gap-8">
      <div>
        <p className="mb-1 text-xs text-gray-400 dark:text-gray-500">
          Cycle option
        </p>
        <select className="h-11 w-40 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 text-sm text-gray-500 dark:text-gray-300 outline-none">
          <option>Cycle</option>
        </select>
      </div>

      <div>
        <p className="mb-1 text-xs text-gray-400 dark:text-gray-500">
          Sort drivers
        </p>
        <div className="flex gap-3">
          <select
            value={orderBy}
            onChange={(e) => onChange("orderBy", e.target.value as OrderBy)}
            className="h-11 w-40 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 text-sm text-gray-500 dark:text-gray-300 outline-none"
          >
            <option value="name">Order by name</option>
            <option value="date">Order by date</option>
            <option value="cycle">Order by cycle</option>
          </select>

          <select
            value={direction}
            onChange={(e) => onChange("direction", e.target.value as Direction)}
            className="h-11 w-40 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 text-sm text-gray-500 dark:text-gray-300 outline-none"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
}
