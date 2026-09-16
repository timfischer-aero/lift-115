"use client";
import { useState } from 'react';
import { PageHeader } from "@/components/page-header";
import { 
  useDataTable, 
  DataTable, 
  DataTableColumnHeader, 
  DataTableDragHandle, 
  Button, 
  RadioGroup, 
  RadioGroupItem,
  Popover,
  PopoverTrigger,
  PopoverContent, 
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@aeroflow/af-components";
import { patients } from "./mock-patients";

//Types
import type { Patient } from "./mock-patients";
import type { UseDataTableProps } from "@aeroflow/af-components";

// Display null values as an em dash while keeping the data null.
const displayValue = ({ getValue }: { getValue: () => unknown }) => {
  const value = getValue();
  return value == null ? "—" : String(value);
};

const displayLink = ({ getValue }: { getValue: () => unknown }) => {
  const value = getValue();
  if (value == null) return "—";

  return (
    <button
      type="button"
      className="cursor-pointer text-blue-700 underline hover:text-blue-900"
      onClick={(event) => event.stopPropagation()}
    >
      {String(value)}
    </button>
  );
};

const tableCols: UseDataTableProps<Patient>["columns"] = [
  { id: "selection",
    header: () => <span className="sr-only">&nbsp;</span>,
    size:48,
    enableSorting: false,
    enableHiding: false,
    cell: ({row}) => (
      <RadioGroupItem
        value={row.id}
        aria-label={`Select patient ${row.original.patientNumber}, ${row.original.hcpc}`}
        onClick={(event) => event.stopPropagation()}
      />
    ),
  },

  { accessorKey: "payer", header: ({ column }) => (
        <div className="flex items-center gap-2">
            <DataTableDragHandle aria-label="Move Payer column" />
            <DataTableColumnHeader column={column} title="Payer" />
        </div>
    ),
  
  },
  { accessorKey: "patientNumber", header: ({ column }) => (
      <div className="flex items-center gap-2">
        <DataTableDragHandle aria-label="Move pt# column" />
        <DataTableColumnHeader column={column} title="pt#" />
      </div>
    ),
    cell: ({row}) => (
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="cursor-pointer text-blue-700 underline hover:text-blue-900"
            onClick={(event) => {
              event.stopPropagation();
              //TODO
            }}
          > 
            { row.original.patientNumber }
          </button>
        </PopoverTrigger>
        <PopoverContent
          aria-label="Patient details"
          align="start"
          onClick={(event) => event.stopPropagation()}
          >
            <PopoverHeader>
              <PopoverTitle id={`patient-title-${row.id}`}>
                Patient info for { row.original.patientNumber }
              </PopoverTitle>
              <PopoverDescription id={`patient-description-${row.id}`}>
                This popup could give information on a specific patient, or could instead toggle a drawer on the right to edit patient details
              </PopoverDescription>
            </PopoverHeader>
            
          </PopoverContent>
      </Popover>
    )
  },
  { accessorKey: "hcpc", header: ({ column }) => (
      <div className="flex items-center gap-2">
        <DataTableDragHandle aria-label="Move hcpc column" />
        <DataTableColumnHeader column={column} title="hcpc" />
      </div>
    ), cell: displayLink },
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
    ), cell: displayLink },
  { accessorKey: "denialCode2", header: ({ column }) => (
      <div className="flex items-center gap-2">
        <DataTableDragHandle aria-label="Move denycd2 column" />
        <DataTableColumnHeader column={column} title="denycd2" />
      </div>
    ), cell: displayLink },
  { accessorKey: "denialCode3", header: ({ column }) => (
      <div className="flex items-center gap-2">
        <DataTableDragHandle aria-label="Move denycd3 column" />
        <DataTableColumnHeader column={column} title="denycd3" />
      </div>
    ), cell: displayLink },
  { accessorKey: "rm1", header: ({ column }) => (
      <div className="flex items-center gap-2">
        <DataTableDragHandle aria-label="Move rm1 column" />
        <DataTableColumnHeader column={column} title="rm1" />
      </div>
    ), cell: displayLink },
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
    //Row Selection variables  
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const selectedRowId =
      Object.keys(rowSelection).find((id) => rowSelection[id]) ?? "";

    //Visibility selection variables
    const [columnVisibility, setColumnVisibility] = useState({});

    const table = useDataTable<Patient>({
        data: patients,
        columns: tableCols,
        getRowId: row => row.id,
        enableRowSelection: true,
        enableMultiRowSelection: false,
        onRowSelectionChange: setRowSelection,
        rowSelection,
        columnVisibility,
        onColumnVisibilityChange: setColumnVisibility,
    });

    return (
        <div className="flex h-dvh w-full min-w-0 flex-col overflow-hidden [&>header]:shrink-0">
            <PageHeader headerText="Billing Report"></PageHeader>
            <div className="min-h-0 flex-1 overflow-auto">
              <RadioGroup
                aria-label="Select a billing report row"
                value={selectedRowId}
                onValueChange={(id) => setRowSelection({ [id]: true })}
              >
                <DataTable
                    table={table}
                    variant="grid"
                    headerClassName="bg-table-row-stripe [&_th]:font-bold! [&_button]:font-bold!"
                    rowClassName={(row) => row.getIsSelected() ? "bg-sky-100 hover:bg-sky-50" : "hover:bg-slate-100" }
                    onRowClick={claim => table.getRow(claim.id).toggleSelected()}
                    enableColumnReordering={true} />
              </RadioGroup>
            </div>
             
             {/* Footer */}
            <div className="flex shrink-0 items-center justify-between gap-4 border-t border-gray-200 bg-gray-100 px-4 py-3">
              <div className="text-left">{patients.length} Results</div>
              <div className="ml-auto shrink-0">
                <Button variant='outline'>
                Show/Hide Columns
                </Button>
              </div>
            </div>
        </div>
    );
}
