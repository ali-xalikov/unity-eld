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
    <div className="mt-6 flex items-start gap-8 rounded-3xl">
      {/* Cycle Option (hozircha static) */}
      <div>
        <p className="mb-2 text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-medium">
          Cycle option
        </p>
        <select className="h-12 w-44 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#12162C] px-4 text-sm text-gray-700 dark:text-gray-200 outline-none focus:border-orange-500 hover:border-orange-400 transition-all">
          <option>Cycle</option>
        </select>
      </div>

      {/* Sort */}
      <div>
        <p className="mb-2 text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-medium">
          Sort drivers
        </p>
        <div className="flex gap-3">
          <select
            value={orderBy}
            onChange={(e) => onChange("orderBy", e.target.value as OrderBy)}
            className="h-12 w-44 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#12162C] px-4 text-sm text-gray-700 dark:text-gray-200 outline-none focus:border-orange-500 hover:border-orange-400 transition-all cursor-pointer"
          >
            <option value="name">Order by name</option>
            <option value="date">Order by date</option>
            <option value="cycle">Order by cycle</option>
          </select>

          <select
            value={direction}
            onChange={(e) => onChange("direction", e.target.value as Direction)}
            className="h-12 w-44 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#12162C] px-4 text-sm text-gray-700 dark:text-gray-200 outline-none focus:border-orange-500 hover:border-orange-400 transition-all cursor-pointer"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
}
