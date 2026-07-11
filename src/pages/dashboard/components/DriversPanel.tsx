import { useMemo, useState } from "react";
import type { Driver, DriverFilters } from "../types/driver";
import DriversFilterBar from "./DriversFilterBar";
import DriversSortBar from "./DriversSortBar";
import DriversTable from "./DriversTable";
import AddDriverModal from "./AddDriverModal";

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
  return h * 60 + m;
}

export default function DriversPanel({
  drivers,
  onAddDriver,
  search,
}: DriversPanelProps) {
  const [filters, setFilters] = useState<DriverFilters>(defaultFilters);
  const [modalOpen, setModalOpen] = useState(false);

  const updateFilter = <K extends keyof DriverFilters>(
    key: K,
    value: DriverFilters[K]
  ) => setFilters((prev) => ({ ...prev, [key]: value }));

  const visibleDrivers = useMemo(() => {
    let filtered = drivers.filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase())
    );

    if (filters.violationFilter) {
      filtered = filtered.filter((d) => d.violation === filters.violationFilter);
    }

    if (filters.eldFilter) {
      filtered = filtered.filter((d) => d.eld === filters.eldFilter);
    }

    if (filters.nameFilter) {
      filtered = filters.includeMode
        ? filtered.filter((d) => d.name === filters.nameFilter)
        : filtered.filter((d) => d.name !== filters.nameFilter);
    }

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
    <div className="mt-[35px] rounded-xl">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[32px] font-medium text-[#1B2140] dark:text-white">
          Drivers info
        </h2>
        <button
          onClick={() => setModalOpen(true)}
          className="rounded-lg bg-orange-500 px-5 py-2 text-white font-medium hover:bg-orange-600"
        >
          + Add Driver
        </button>
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

      <div className="mt-5">
        <DriversTable drivers={visibleDrivers} />
      </div>

      <AddDriverModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={onAddDriver}
      />
    </div>
  );
}