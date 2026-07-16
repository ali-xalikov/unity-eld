import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

interface LogsTableProps {
  search: string;
}

interface LogEntry {
  id: string;
  driverName: string;
  truckNo: string;
  status: "OK" | "OFF" | "SB" | "D";
  location: string;
  updated: string;
  violations: string[];
  timeValidation: {
    break: string;
    drive: string;
    shift: string;
    cycle: string;
    recap: string;
  };
}

const mockLogsData: LogEntry[] = [
  {
    id: "1",
    driverName: "Arjana Das",
    truckNo: "1015",
    status: "OK",
    location: "Main St, San Francisco",
    updated: "3 minutes ago",
    violations: [],
    timeValidation: { break: "04:37", drive: "04:34", shift: "04:34", cycle: "27:25", recap: "00:00" },
  },
  {
    id: "2",
    driverName: "Stephen Brown",
    truckNo: "3234",
    status: "SB",
    location: "Maple Ave, Los Angeles",
    updated: "15 days ago",
    violations: ["No Signature!"],
    timeValidation: { break: "04:37", drive: "04:34", shift: "04:34", cycle: "27:25", recap: "00:00" },
  },
  {
    id: "3",
    driverName: "Lalita Hartati",
    truckNo: "5647",
    status: "OK",
    location: "Cedar Ln, Houston",
    updated: "24 minutes ago",
    violations: ["Trailer is not set"],
    timeValidation: { break: "04:37", drive: "04:34", shift: "04:34", cycle: "27:25", recap: "00:00" },
  },
  {
    id: "4",
    driverName: "Emily Wilson",
    truckNo: "3467",
    status: "OFF",
    location: "Main St, Chicago",
    updated: "20 minutes ago",
    violations: ["BOL is not set"],
    timeValidation: { break: "04:37", drive: "04:34", shift: "04:34", cycle: "27:25", recap: "00:00" },
  },
  {
    id: "5",
    driverName: "Robert Moore",
    truckNo: "8543",
    status: "OFF",
    location: "Main St, New York",
    updated: "16 weeks ago",
    violations: ["11 hours driving limit"],
    timeValidation: { break: "04:37", drive: "04:34", shift: "04:34", cycle: "27:25", recap: "00:00" },
  },
  {
    id: "6",
    driverName: "Paulo Mambene",
    truckNo: "4678",
    status: "OFF",
    location: "Meade Ave, San Francisco",
    updated: "21 minutes ago",
    violations: ["8 hours break limit"],
    timeValidation: { break: "04:37", drive: "04:34", shift: "04:34", cycle: "27:25", recap: "00:00" },
  },
  {
    id: "7",
    driverName: "Shaimaa Ahabio",
    truckNo: "3788",
    status: "OFF",
    location: "Oak St, New York",
    updated: "3 minutes ago",
    violations: ["14 hours shift limit"],
    timeValidation: { break: "04:37", drive: "04:34", shift: "04:34", cycle: "27:25", recap: "00:00" },
  },
  {
    id: "8",
    driverName: "Neeraj Kumar",
    truckNo: "8653",
    status: "OK",
    location: "Cedar Ln, San Francisco",
    updated: "14 minutes ago",
    violations: ["70 hours cycle limit"],
    timeValidation: { break: "04:37", drive: "04:34", shift: "04:34", cycle: "27:25", recap: "00:00" },
  },
  {
    id: "9",
    driverName: "Davit Öztürk",
    truckNo: "3547",
    status: "SB",
    location: "Pine Rd, San Francisco",
    updated: "24 days ago",
    violations: [],
    timeValidation: { break: "04:37", drive: "04:34", shift: "04:34", cycle: "27:25", recap: "00:00" },
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "OK":
      return "bg-green-500";
    case "SB":
      return "bg-orange-500";
    case "OFF":
      return "bg-gray-400";
    case "D":
      return "bg-blue-500";
    default:
      return "bg-gray-400";
  }
};

export default function LogsTable({ search }: LogsTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const filteredLogs = useMemo(() => {
    if (!search) return mockLogsData;
    return mockLogsData.filter((log) =>
      log.driverName.toLowerCase().includes(search.toLowerCase()) ||
      log.truckNo.includes(search)
    );
  }, [search]);

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div className="mt-6 bg-white dark:bg-[#1B2140] rounded-lg overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-[#13172d]">ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-[#13172d]">Driver</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-[#13172d]">Truck no</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-[#13172d]">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-[#13172d]">Location</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-[#13172d]">Updated</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-[#13172d]">Warnings</th>
              <th colSpan={5} className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-[#13172d]">Validation</th>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th colSpan={7}></th>
              <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-[#13172d]">Break</th>
              <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-[#13172d]">Drive</th>
              <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-[#13172d]">Shift</th>
              <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-[#13172d]">Cycle</th>
              <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-[#13172d]">Recap</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log, index) => (
              <tr
                key={log.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#222847] transition-colors"
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-200">{index + 1}</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-200">{log.driverName}</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-200">{log.truckNo}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center justify-center w-8 h-8 rounded text-white text-xs font-bold ${getStatusColor(
                      log.status
                    )}`}
                  >
                    {log.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-200">{log.location}</td>
                <td className="px-4 py-3 text-xs text-blue-600 dark:text-blue-400">{log.updated}</td>
                <td className="px-4 py-3">
                  {log.violations.length > 0 ? (
                    <button
                      onClick={() => toggleRow(log.id)}
                      className="flex items-center gap-1 text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                    >
                      <span className="text-xs font-medium">
                        {log.violations[0]}
                      </span>
                      {log.violations.length > 1 && (
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${
                            expandedRows.has(log.id) ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>
                  ) : (
                    <span className="text-gray-400 text-xs">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-center text-gray-900 dark:text-gray-200">{log.timeValidation.break}</td>
                <td className="px-4 py-3 text-sm text-center text-gray-900 dark:text-gray-200">{log.timeValidation.drive}</td>
                <td className="px-4 py-3 text-sm text-center text-gray-900 dark:text-gray-200">{log.timeValidation.shift}</td>
                <td className="px-4 py-3 text-sm text-center text-gray-900 dark:text-gray-200">{log.timeValidation.cycle}</td>
                <td className="px-4 py-3 text-sm text-center text-gray-900 dark:text-gray-200">{log.timeValidation.recap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
