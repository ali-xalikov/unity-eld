import { useMemo, useState } from "react";
import type { Driver, DriverFilters } from "../types/driver";
import DriversFilterBar from "./DriversFilterBar";
import DriversSortBar from "./DriversSortBar";
import DriversTable from "./DriversTable";

interface DriversPanelProps {
  drivers: Driver[];
  onAddDriver: (driver: Driver) => void;
  search: string;
}

const defaultFilters: DriverFilters = {
  search: "",
  includeMode: true,
  nameFilter: "",
  violationFilter: "",
  eldFilter: "",
  orderBy: "name",
  direction: "asc",
};

function toSeconds(time: string) {
  const [h, m] = time.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

export default function DriversPanel({
  drivers,
  search,
}: DriversPanelProps) {
  const [filters, setFilters] = useState<DriverFilters>(defaultFilters);

  const updateFilter = <K extends keyof DriverFilters>(
    key: K,
    value: DriverFilters[K]
  ) => setFilters((prev) => ({ ...prev, [key]: value }));

  const visibleDrivers = useMemo(() => {
    let filtered = drivers.filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase())
    );

    if (filters.violationFilter) {
      filtered = filtered.filter(
        (d) => d.violation === filters.violationFilter
      );
    }

    if (filters.eldFilter) {
      filtered = filtered.filter((d) => d.eld === filters.eldFilter);
    }

    if (filters.nameFilter) {
      filtered = filters.includeMode
        ? filtered.filter((d) => d.name === filters.nameFilter)
        : filtered.filter((d) => d.name !== filters.nameFilter);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      let valA: number | string;
      let valB: number | string;

      if (filters.orderBy === "date") {
        valA = new Date(a.date).getTime();
        valB = new Date(b.date).getTime();
      } else if (filters.orderBy === "cycle") {
        valA = toSeconds(a.cycle);
        valB = toSeconds(b.cycle);
      } else {
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
      }

      if (valA < valB) return filters.direction === "asc" ? -1 : 1;
      if (valA > valB) return filters.direction === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [drivers, search, filters]);

  const driverNames = useMemo(
    () => [...new Set(drivers.map((d) => d.name))],
    [drivers]
  );

  return (
    <div className="mt-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[32px] font-semibold text-[#1B2140] dark:text-white tracking-tight">
          Drivers info
        </h2>
      </div>

      <DriversFilterBar
        filters={filters}
        driverNames={driverNames}
        onChange={updateFilter}
      />

      <DriversSortBar
        orderBy={filters.orderBy}
        direction={filters.direction}
        onChange={updateFilter}
      />

      <div className="mt-6">
        <DriversTable drivers={visibleDrivers} />
      </div>
    </div>
  );
}
