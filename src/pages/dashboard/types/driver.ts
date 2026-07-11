export type EldStatus = "Connected" | "Not connected";
export type ViolationType = "" | "Violation" | "Form & Signature";

export interface Driver {
  id: string;
  name: string;
  violation: ViolationType;
  date: string;
  eld: EldStatus;
  cycle: string;
  company: string;
  updated: string;
}

export type OrderBy = "name" | "date" | "cycle";
export type Direction = "asc" | "desc";

export interface DriverFilters {
  search: string;
  includeMode: boolean;
  nameFilter: string;
  violationFilter: ViolationType | "";
  eldFilter: EldStatus | "";
  orderBy: OrderBy;
  direction: Direction;
}
