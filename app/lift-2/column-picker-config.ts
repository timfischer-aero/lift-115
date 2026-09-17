import type { RowData } from "@tanstack/react-table";

export const columnPickerGroups = [
  { id: "patient", label: "Patient & Demographics" },
  { id: "claim", label: "Claim & Order Details" },
  { id: "payer", label: "Payer & Coverage" },
  { id: "billing", label: "Billing & Remittance" },
] as const;

export type ColumnPickerGroup =
  (typeof columnPickerGroups)[number]["id"];

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    picker?: {
      label: string;
      group: ColumnPickerGroup;
      order: number;
    };
  }
}