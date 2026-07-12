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
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
  label?: string;
}) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-xs text-gray-500 dark:text-gray-400">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#12162C] px-4 text-sm text-gray-700 dark:text-gray-200 outline-none focus:border-orange-500 hover:border-orange-400 transition-all cursor-pointer"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function DriversFilterBar({
  filters,
  driverNames,
  onChange,
}: DriversFilterBarProps) {
  return (
    <div className="rounded-3xl dark:border-gray-700">
      {/* Include / Exclude Toggle */}
      <div className="mb-6 flex items-center gap-6">
        <button
          onClick={() => onChange("includeMode", true)}
          className="flex items-center gap-2 text-sm font-medium text-[#1B2140] dark:text-white"
        >
          <span
            className={`h-4 w-4 rounded-full border-2 transition-all ${
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
            className={`h-4 w-4 rounded-full border-2 transition-all ${
              !filters.includeMode
                ? "border-orange-500 bg-orange-500"
                : "border-gray-300 bg-white dark:bg-[#1B2140]"
            }`}
          />
          Exclude
        </button>
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-6 gap-4">
        <SelectField
          value={filters.nameFilter}
          onChange={(v) => onChange("nameFilter", v)}
          placeholder="Name"
          options={driverNames.map((n) => ({ value: n, label: n }))}
          label="Haydovchi"
        />

        <SelectField
          value=""
          onChange={() => {}}
          placeholder="Company"
          options={[]}
          label="Kompaniya"
        />

        <SelectField
          value={filters.violationFilter || ""}
          onChange={(v) =>
            onChange("violationFilter", v as DriverFilters["violationFilter"])
          }
          placeholder="Violations"
          options={[
            { value: "Violation", label: "Violation" },
            { value: "Form & Signature", label: "Form & Signature" },
          ]}
          label="Qoidabuzarlik"
        />

        <SelectField
          value=""
          onChange={() => {}}
          placeholder="Date"
          options={[]}
          label="Sana"
        />

        <SelectField
          value={filters.eldFilter || ""}
          onChange={(v) =>
            onChange("eldFilter", v as DriverFilters["eldFilter"])
          }
          placeholder="Eld connection"
          options={[
            { value: "Connected", label: "Connected" },
            { value: "Not connected", label: "Not connected" },
          ]}
          label="ELD holati"
        />

        <SelectField
          value=""
          onChange={() => {}}
          placeholder="Cycle"
          options={[]}
          label="Cycle"
        />
      </div>
    </div>
  );
}
