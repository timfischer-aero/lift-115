"use client";
import { PageHeader } from "@/components/page-header";
import { useDataTable, DataTable } from "@aeroflow/af-components";
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
  { accessorKey: "payer", header: "Payer" },
  { accessorKey: "patientNumber", header: "pt#" },
  { accessorKey: "hcpc", header: "hcpc" },
  { accessorKey: "dateOfService", header: "dos" },
  { accessorKey: "endServiceDate", header: "end_service_date" },
  { accessorKey: "sentDate", header: "sentdt", cell: displayValue },
  { accessorKey: "xmit", header: "xmit", cell: displayValue },
  { accessorKey: "denialDate", header: "denydt", cell: displayValue },
  { accessorKey: "denialCode", header: "denycd", cell: displayValue },
  { accessorKey: "denialCode2", header: "denycd2", cell: displayValue },
  { accessorKey: "denialCode3", header: "denycd3", cell: displayValue },
  { accessorKey: "rm1", header: "rm1", cell: displayValue },
  { accessorKey: "cmn", header: "cmn", cell: displayValue },
  { accessorKey: "remit", header: "remit", cell: displayValue },
  { accessorKey: "serviceStatus", header: "S/U", cell: displayValue },
];


export default function LiftTableShell() {
    const table = useDataTable<Patient>({
        data: patients,
        columns: tableCols,
        getRowId: row => row.id,
    });

    return (
        <div className="w-full">
            <PageHeader headerText="Billing Report"></PageHeader>
            <DataTable table={table} variant="grid" enableColumnReordering />
        </div>
    );
}
