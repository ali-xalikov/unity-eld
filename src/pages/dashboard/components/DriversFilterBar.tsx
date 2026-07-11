import type { DriverFilters } from "../types/driver";

interface DriversFilterBarProps {
  filters: DriverFilters;
  driverNames: string[];
  onChange: <K extends keyof DriverFilters>(
    key: K,
    value: DriverFilters[K]
  ) => void;
}

function SelectField({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-11 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 text-sm text-gray-500 dark:text-gray-300 outline-none"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default function DriversFilterBar({
  filters,
  driverNames,
  onChange,
}: DriversFilterBarProps) {
  return (
    <div className="rounded-xl">
      <div className="mb-4 flex items-center gap-6">
        <button
          onClick={() => onChange("includeMode", true)}
          className="flex items-center gap-2 text-sm font-medium text-[#1B2140] dark:text-white"
        >
          <span
            className={`h-4 w-4 rounded-full border-2 ${
              filters.includeMode
                ? "border-orange-500 bg-orange-500"
                : "border-gray-300 bg-white dark:bg-[#1B2140]"
            }`}
          />
          Include
        </button>
        <button
          onClick={() => onChange("includeMode", false)}
          className="flex items-center gap-2 text-sm font-medium text-[#1B2140] dark:text-white"
        >
          <span
            className={`h-4 w-4 rounded-full border-2 ${
              !filters.includeMode
                ? "border-orange-500 bg-orange-500"
                : "border-gray-300 bg-white dark:bg-[#1B2140]"
            }`}
          />
          Exclude
        </button>
      </div>

      <div className="grid grid-cols-6 gap-3">
        <SelectField
          value={filters.nameFilter}
          onChange={(v) => onChange("nameFilter", v)}
          placeholder="Name"
          options={driverNames.map((n) => ({ value: n, label: n }))}
        />

        <SelectField
          value=""
          onChange={() => {}}
          placeholder="Company"
          options={[]}
        />

        <SelectField
          value={filters.violationFilter}
          onChange={(v) =>
            onChange("violationFilter", v as DriverFilters["violationFilter"])
          }
          placeholder="Violations"
          options={[
            { value: "Violation", label: "Violation" },
            { value: "Form & Signature", label: "Form & Signature" },
          ]}
        />

        <SelectField
          value=""
          onChange={() => {}}
          placeholder="Date"
          options={[]}
        />

        <SelectField
          value={filters.eldFilter}
          onChange={(v) =>
            onChange("eldFilter", v as DriverFilters["eldFilter"])
          }
          placeholder="Eld connection"
          options={[
            { value: "Connected", label: "Connected" },
            { value: "Not connected", label: "Not connected" },
          ]}
        />

        <SelectField
          value=""
          onChange={() => {}}
          placeholder="Cycle"
          options={[]}
        />
      </div>
    </div>
  );
}
