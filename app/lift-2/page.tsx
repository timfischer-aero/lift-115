"use client";
import { useState, useMemo } from "react";
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
  Input,
} from "@aeroflow/af-components";
import { patients } from "./mock-patients";
import {
  columnPickerGroups,
  columnPickerLayout,
  patientColumnDefinitions,
} from "./column-picker-config";
import { PatientNotesDrawer } from "./patient-notes-drawer";
//Types
import type { Patient } from "./mock-patients";
import type { UseDataTableProps } from "@aeroflow/af-components";

// Display null values as an em dash while keeping the data null.
const displayValue = ({ getValue }: { getValue: () => unknown }) => {
  const value = getValue();
  return value == null ? "—" : String(value);
};

function displayLink(onClick: (patient: Patient) => void) {
  return function PatientNotesLink({
    getValue,
    row,
  }: {
    getValue: () => unknown;
    row: { original: Patient };
  }) {
    const value = getValue();
    if (value == null) return "—";

    return (
      <button
        type="button"
        className="cursor-pointer text-blue-700 underline hover:text-blue-900"
        onClick={(event) => {
          event.stopPropagation();
          onClick(row.original);
        }}
      >
        {String(value)}
      </button>
    );
  };
}

const renderColumnHeader: NonNullable<
  UseDataTableProps<Patient>["columns"][number]["header"]
> = ({ column }) => {
  const label = column.columnDef.meta?.picker?.label ?? column.id;

  return (
    <div className="flex items-center gap-2">
      <DataTableDragHandle aria-label={`Move ${label} column`} />
      <DataTableColumnHeader column={column} title={label} />
    </div>
  );
};

const sortDateValues: import("@tanstack/react-table").SortingFn<Patient> = (
  a,
  b,
  columnId,
) => {
  const timestamp = (value: unknown) => {
    if (typeof value !== "string") return 0;
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  };
  return timestamp(a.getValue(columnId)) - timestamp(b.getValue(columnId));
};

function createColumns(
  openPatientNotes: (patient: Patient) => void,
): UseDataTableProps<Patient>["columns"] {
  const hcpcCell: NonNullable<
    UseDataTableProps<Patient>["columns"][number]["cell"]
  > = ({ row }) => (
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
          {row.original.hcpc}
        </button>
      </PopoverTrigger>
      <PopoverContent
        aria-label="Patient details"
        align="start"
        onClick={(event) => event.stopPropagation()}
      >
        <PopoverHeader>
          <PopoverTitle id={`patient-title-${row.id}`}>
            HCPC info for {row.original.hcpc}
          </PopoverTitle>
          <PopoverDescription id={`patient-description-${row.id}`}>
            This popup could give information on a specific code. Others can
            toggle a drawer on the right to edit patient details
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
  return [
    {
      id: "selection",
      header: () => <span className="sr-only">&nbsp;</span>,
      size: 48,
      enableResizing: false,
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => (
        <RadioGroupItem
          value={row.id}
          aria-label={`Select patient ${row.original.patientNumber}, ${row.original.hcpc}`}
          onClick={(event) => event.stopPropagation()}
        />
      ),
    },
    ...patientColumnDefinitions.map(({ key, label, group, order, kind }) => ({
      accessorKey: key,
      meta: { picker: { label, group, order } },
      header: renderColumnHeader,
      cell:
        key === "patientNumber"
          ? displayLink(openPatientNotes)
          : key === "hcpc"
            ? hcpcCell
            : displayValue,
      sortingFn:
        kind === "date"
          ? sortDateValues
          : kind === "number"
            ? ("basic" as const)
            : ("alphanumeric" as const),
    })),
  ];
}

export default function LiftTableShell() {
  //Row Selection variables
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const selectedRowId =
    Object.keys(rowSelection).find((id) => rowSelection[id]) ?? "";

  //Column Visibility selection variables
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({});

  //Drawer Visibility
  const [drawerOpen, setDrawerOpen] = useState(false);

  //Active Patient
  const [activePatient, setActivePatient] = useState<Patient | null>(null);

  //Colum order - needed to control seleciton as always the first option
  const [columnOrder, setColumnOrder] = useState<string[]>([]);

  //State for pagination
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const handleColumnOrderChange: NonNullable<
    UseDataTableProps<Patient>["onColumnOrderChange"]
  > = (updater) => {
    setColumnOrder((current) => {
      const next = typeof updater === "function" ? updater(current) : updater;

      return ["selection", ...next.filter((id) => id !== "selection")]; //Removes selection from list and always has it listed as first item in newly built array
    });
  };

  const tableCols = useMemo(
    () =>
      createColumns((patient) => {
        setActivePatient(patient);
        setDrawerOpen(true);
      }),
    [],
  );

  const table = useDataTable<Patient>({
    data: patients,
    columns: tableCols,
    getRowId: (row) => row.id,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: setRowSelection,
    rowSelection,
    columnVisibility,
    onColumnVisibilityChange: setColumnVisibility,
    columnOrder,
    onColumnOrderChange: handleColumnOrderChange,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    pagination,
    onPaginationChange: setPagination,
    paginate: true,
  });

  const pickerGroups = columnPickerGroups.map((group) => ({
    ...group,
    columns: table
      .getAllLeafColumns()
      .filter(
        (column) =>
          column.getCanHide() &&
          column.columnDef.meta?.picker?.group === group.id,
      )
      .sort(
        (a, b) =>
          (a.columnDef.meta?.picker?.order ?? 0) -
          (b.columnDef.meta?.picker?.order ?? 0),
      ),
  }));

  return (
    <div className="flex h-dvh w-full min-w-0 flex-col overflow-hidden [&>header]:shrink-0">
      <PageHeader headerText="Billing Report"></PageHeader>
      <div className="min-h-0 flex-1 overflow-auto">
        {/* Right Side Drawer */}
        <PatientNotesDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          patient={activePatient}
        />

        {/* Action Top Panel */}
        <div className="flex w-full flex-nowrap items-center justify-between gap-4 overflow-x-auto bg-muted px-4 py-3">
          <div className="flex shrink-0 flex-nowrap items-center justify-start gap-4">
            <div className="w-64 shrink-0">
              <Input
                defaultValue=""
                label="Patient Number"
                labelPosition="inline"
                placeholder="Number"
                size="default"
                type="text"
              />
            </div>
            <div className="w-72 shrink-0">
              <Input
                defaultValue=""
                label="Patient Name"
                labelPosition="inline"
                placeholder="Name"
                size="default"
                type="text"
              />
            </div>
          </div>
          <div className="ml-auto flex shrink-0 flex-nowrap items-center justify-end gap-2">
            <Button variant="outline">All Remit</Button>
            <Button variant="outline">Patient Notes</Button>
            <Button variant="outline">AR History</Button>
            <Button variant="outline">Biller Note History</Button>
          </div>
        </div>
        {/* Datatable */}
        <RadioGroup
          aria-label="Select a billing report row"
          value={selectedRowId}
          onValueChange={(id) => setRowSelection({ [id]: true })}
        >
          <DataTable
            table={table}
            variant="grid"
            headerClassName="bg-table-row-stripe [&_th]:font-bold! [&_button]:font-bold!"
            rowClassName={(row) =>
              row.getIsSelected()
                ? "bg-sky-100 hover:bg-sky-50"
                : "hover:bg-slate-100"
            }
            onRowClick={(claim) => table.getRow(claim.id).toggleSelected()}
            enableColumnReordering={true}
          />
        </RadioGroup>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-[1fr_auto_1fr] shrink-0 items-center gap-4 border-t border-gray-200 bg-gray-100 px-4 py-3">
        <div className="justify-self-start">{patients.length} Results</div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>

          <span>
            Page {pagination.pageIndex + 1} of{" "}
            {Math.max(1, table.getPageCount())}
          </span>

          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
        <div className="justify-self-end">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Show/Hide Columns</Button>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              side="top"
              aria-label="Choose visible columns"
              className="w-[1360px] max-w-[calc(100vw-2rem)] max-h-[calc(100dvh-6rem)] overflow-auto"
            >
              <div className="grid min-w-[1320px] grid-cols-5 gap-3">
                {columnPickerLayout.map((groupIds, index) => (
                  <div key={index} className="min-w-0 space-y-6">
                    {groupIds.map((groupId) => {
                      const group = pickerGroups.find(
                        (group) => group.id === groupId,
                      )!;
                      return (
                        <fieldset key={group.id} className="min-w-0">
                          <legend className="mb-3 max-w-full break-words text-sm font-semibold uppercase">
                            {group.label}
                          </legend>

                          <div className="space-y-1">
                            {group.columns.map((column) => (
                              <label
                                key={column.id}
                                className="flex cursor-pointer items-start gap-2 text-sm"
                              >
                                <input
                                  type="checkbox"
                                  className="mt-1 shrink-0"
                                  checked={column.getIsVisible()}
                                  onChange={(event) =>
                                    column.toggleVisibility(
                                      event.target.checked,
                                    )
                                  }
                                />
                                <span className="min-w-0 [overflow-wrap:anywhere]">
                                  {column.columnDef.meta?.picker?.label}
                                </span>
                              </label>
                            ))}
                          </div>
                        </fieldset>
                      );
                    })}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
