"use client";
import { useState } from 'react';
import { PageHeader } from "@/components/page-header";
import { useDataTable, DataTable, DataTableColumnHeader, DataTableDragHandle } from "@aeroflow/af-components";
import type { UseDataTableProps } from "@aeroflow/af-components";

type Patient = {
  id: string;
  payer: string;
  patientNumber: string;
  hcpc: string;
  dateOfService: string;
  endServiceDate: string;
  sentDate: string | null;
  xmit: number | null;
  denialDate: string | null;
  denialCode: string | null;
  denialCode2: string | null;
  denialCode3: string | null;
  rm1: string | null;
  cmn: string | null;
  remit: string | null;
  serviceStatus: string | null;
};

const patients: Patient[] = [
  {
    id: "sample-row-1",
    payer: "MOLINA SC MEDICAID",
    patientNumber: "1851449",
    hcpc: "A4927",
    dateOfService: "3/13/2026",
    endServiceDate: "3/13/2026",
    sentDate: "5/1/2026",
    xmit: 2,
    denialDate: "5/12/2026",
    denialCode: "CO22",
    denialCode2: null,
    denialCode3: null,
    rm1: "N479",
    cmn: null,
    remit: null,
    serviceStatus: "S",
  },
  {
    id: "sample-row-2",
    payer: "TEST PAYER A",
    patientNumber: "TEST-002",
    hcpc: "A4927",
    dateOfService: "3/16/2026",
    endServiceDate: "3/16/2026",
    sentDate: "5/2/2026",
    xmit: 1,
    denialDate: null,
    denialCode: null,
    denialCode2: null,
    denialCode3: null,
    rm1: null,
    cmn: null,
    remit: null,
    serviceStatus: "S",
  },
  {
    id: "sample-row-3",
    payer: "TEST PAYER B",
    patientNumber: "TEST-003",
    hcpc: "A4927",
    dateOfService: "3/18/2026",
    endServiceDate: "3/20/2026",
    sentDate: "5/4/2026",
    xmit: 2,
    denialDate: "5/14/2026",
    denialCode: "CO22",
    denialCode2: null,
    denialCode3: null,
    rm1: "N479",
    cmn: null,
    remit: null,
    serviceStatus: "U",
  },
  {
    id: "sample-row-4",
    payer: "TEST PAYER A",
    patientNumber: "TEST-004",
    hcpc: "A4927",
    dateOfService: "3/23/2026",
    endServiceDate: "3/23/2026",
    sentDate: null,
    xmit: null,
    denialDate: null,
    denialCode: null,
    denialCode2: null,
    denialCode3: null,
    rm1: null,
    cmn: null,
    remit: null,
    serviceStatus: "U",
  },
  {
    id: "sample-row-5",
    payer: "TEST PAYER C",
    patientNumber: "TEST-005",
    hcpc: "A4927",
    dateOfService: "3/25/2026",
    endServiceDate: "3/27/2026",
    sentDate: "5/6/2026",
    xmit: 3,
    denialDate: "5/18/2026",
    denialCode: "CO22",
    denialCode2: null,
    denialCode3: null,
    rm1: "N479",
    cmn: null,
    remit: null,
    serviceStatus: "S",
  },
  {
    id: "sample-row-6",
    payer: "TEST PAYER B",
    patientNumber: "TEST-006",
    hcpc: "A4927",
    dateOfService: "3/30/2026",
    endServiceDate: "3/30/2026",
    sentDate: "5/8/2026",
    xmit: 1,
    denialDate: null,
    denialCode: null,
    denialCode2: null,
    denialCode3: null,
    rm1: null,
    cmn: null,
    remit: null,
    serviceStatus: "S",
  },
];

// Display null values as an em dash while keeping the data null.
const displayValue = ({ getValue }: { getValue: () => unknown }) => {
  const value = getValue();
  return value == null ? "—" : String(value);
};

const tableCols: UseDataTableProps<Patient>["columns"] = [
  { accessorKey: "payer", header: ({ column }) => (
        <div className="flex items-center gap-2">
            <DataTableDragHandle aria-label="Move Payer column" />
            <DataTableColumnHeader column={column} title="Payer" />
        </div>
    ) },
  { accessorKey: "patientNumber", header: ({ column }) => (
      <div className="flex items-center gap-2">
        <DataTableDragHandle aria-label="Move pt# column" />
        <DataTableColumnHeader column={column} title="pt#" />
      </div>
    ) },
  { accessorKey: "hcpc", header: ({ column }) => (
      <div className="flex items-center gap-2">
        <DataTableDragHandle aria-label="Move hcpc column" />
        <DataTableColumnHeader column={column} title="hcpc" />
      </div>
    ) },
  { accessorKey: "dateOfService", header: ({ column }) => (
      <div className="flex items-center gap-2">
        <DataTableDragHandle aria-label="Move dos column" />
        <DataTableColumnHeader column={column} title="dos" />
      </div>
    ) },
  { accessorKey: "endServiceDate", header: ({ column }) => (
      <div className="flex items-center gap-2">
        <DataTableDragHandle aria-label="Move end_service_date column" />
        <DataTableColumnHeader column={column} title="end_service_date" />
      </div>
    ) },
  { accessorKey: "sentDate", header: ({ column }) => (
      <div className="flex items-center gap-2">
        <DataTableDragHandle aria-label="Move sentdt column" />
        <DataTableColumnHeader column={column} title="sentdt" />
      </div>
    ), cell: displayValue },
  { accessorKey: "xmit", header: ({ column }) => (
      <div className="flex items-center gap-2">
        <DataTableDragHandle aria-label="Move xmit column" />
        <DataTableColumnHeader column={column} title="xmit" />
      </div>
    ), cell: displayValue },
  { accessorKey: "denialDate", header: ({ column }) => (
      <div className="flex items-center gap-2">
        <DataTableDragHandle aria-label="Move denydt column" />
        <DataTableColumnHeader column={column} title="denydt" />
      </div>
    ), cell: displayValue },
  { accessorKey: "denialCode", header: ({ column }) => (
      <div className="flex items-center gap-2">
        <DataTableDragHandle aria-label="Move denycd column" />
        <DataTableColumnHeader column={column} title="denycd" />
      </div>
    ), cell: displayValue },
  { accessorKey: "denialCode2", header: ({ column }) => (
      <div className="flex items-center gap-2">
        <DataTableDragHandle aria-label="Move denycd2 column" />
        <DataTableColumnHeader column={column} title="denycd2" />
      </div>
    ), cell: displayValue },
  { accessorKey: "denialCode3", header: ({ column }) => (
      <div className="flex items-center gap-2">
        <DataTableDragHandle aria-label="Move denycd3 column" />
        <DataTableColumnHeader column={column} title="denycd3" />
      </div>
    ), cell: displayValue },
  { accessorKey: "rm1", header: ({ column }) => (
      <div className="flex items-center gap-2">
        <DataTableDragHandle aria-label="Move rm1 column" />
        <DataTableColumnHeader column={column} title="rm1" />
      </div>
    ), cell: displayValue },
  { accessorKey: "cmn", header: ({ column }) => (
      <div className="flex items-center gap-2">
        <DataTableDragHandle aria-label="Move cmn column" />
        <DataTableColumnHeader column={column} title="cmn" />
      </div>
    ), cell: displayValue },
  { accessorKey: "remit", header: ({ column }) => (
      <div className="flex items-center gap-2">
        <DataTableDragHandle aria-label="Move remit column" />
        <DataTableColumnHeader column={column} title="remit" />
      </div>
    ), cell: displayValue },
  { accessorKey: "serviceStatus", header: ({ column }) => (
      <div className="flex items-center gap-2">
        <DataTableDragHandle aria-label="Move S/U column" />
        <DataTableColumnHeader column={column} title="S/U" />
      </div>
    ), cell: displayValue },
];


export default function LiftTableShell() {
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

    const table = useDataTable<Patient>({
        data: patients,
        columns: tableCols,
        getRowId: row => row.id,
        enableRowSelection: true,
        enableMultiRowSelection: false,
        onRowSelectionChange: setRowSelection,
        rowSelection,
    });

    return (
        <div className="w-full">
            <PageHeader headerText="Billing Report"></PageHeader>
            <DataTable
                table={table}
                variant="grid"
                headerClassName="bg-table-row-stripe [&_th]:font-bold! [&_button]:font-bold!"
                rowClassName={(row) => row.getIsSelected() ? "bg-blue-100" : undefined }
                onRowClick={claim => table.getRow(claim.id).toggleSelected()}
                enableColumnReordering={true} />
        </div>
    );
}
