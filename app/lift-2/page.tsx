"use client";
import { useState, useMemo } from 'react';
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
  Select,
  PopoverTrigger,
  PopoverContent, 
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  Input,
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  DrawerTitle,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@aeroflow/af-components";
import { patients } from "./mock-patients";
import { columnPickerGroups } from "./column-picker-config";

//Types
import type { Patient } from "./mock-patients";
import type { UseDataTableProps } from "@aeroflow/af-components";

// Display null values as an em dash while keeping the data null.
const displayValue = ({ getValue }: { getValue: () => unknown }) => {
  const value = getValue();
  return value == null ? "—" : String(value);
};

function displayLink(onClick: (patient: Patient) => void) {
  return ({
    getValue,
    row,
  }: {
    getValue: () => unknown;
    row: { original: Patient };
  }) => {
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

function createColumns(
  openPatientNotes: (patient: Patient) => void
): UseDataTableProps<Patient>["columns"] {
  return [
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

  { accessorKey: "payer",
    meta: { picker: { label: "Payer", group: "payer", order: 1 } },
    header: renderColumnHeader,
  
  },
  { accessorKey: "patientNumber",
    meta: { picker: { label: "pt#", group: "patient", order: 1 } },
    header: renderColumnHeader,
    cell: displayLink(openPatientNotes),
  },
  { accessorKey: "hcpc",
    meta: { picker: { label: "hcpc", group: "claim", order: 3 } },
    header: renderColumnHeader,
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
            { row.original.hcpc }
          </button>
        </PopoverTrigger>
        <PopoverContent
          aria-label="Patient details"
          align="start"
          onClick={(event) => event.stopPropagation()}
          >
            <PopoverHeader>
              <PopoverTitle id={`patient-title-${row.id}`}>
                HCPC info for { row.original.hcpc }
              </PopoverTitle>
              <PopoverDescription id={`patient-description-${row.id}`}>
                This popup could give information on a specific code. Others can toggle a drawer on the right to edit patient details
              </PopoverDescription>
            </PopoverHeader>
            
          </PopoverContent>
      </Popover>
    )
  },
  { accessorKey: "dateOfService",
    meta: { picker: { label: "dos", group: "claim", order: 1 } },
    header: renderColumnHeader },
  { accessorKey: "endServiceDate",
    meta: { picker: { label: "end_service_date", group: "claim", order: 2 } },
    header: renderColumnHeader },
  { accessorKey: "sentDate",
    meta: { picker: { label: "sentdt", group: "billing", order: 1 } },
    header: renderColumnHeader, cell: displayValue },
  { accessorKey: "xmit",
    meta: { picker: { label: "xmit", group: "billing", order: 2 } },
    header: renderColumnHeader, cell: displayValue },
  { accessorKey: "denialDate",
    meta: { picker: { label: "denydt", group: "billing", order: 3 } },
    header: renderColumnHeader, cell: displayValue },
  { accessorKey: "denialCode",
    meta: { picker: { label: "denycd", group: "billing", order: 4 } },
    header: renderColumnHeader },
  { accessorKey: "denialCode2",
    meta: { picker: { label: "denycd2", group: "billing", order: 5 } },
    header: renderColumnHeader },
  { accessorKey: "denialCode3",
    meta: { picker: { label: "denycd3", group: "billing", order: 6 } },
    header: renderColumnHeader},
  { accessorKey: "rm1",
    meta: { picker: { label: "rm1", group: "billing", order: 7 } },
    header: renderColumnHeader },
  { accessorKey: "cmn",
    meta: { picker: { label: "cmn", group: "billing", order: 8 } },
    header: renderColumnHeader },
  { accessorKey: "remit",
    meta: { picker: { label: "remit", group: "billing", order: 9 } },
    header: renderColumnHeader, cell: displayValue },
  { accessorKey: "serviceStatus",
    meta: { picker: { label: "S/U", group: "billing", order: 10 } },
    header: renderColumnHeader, cell: displayValue },
];
}

export default function LiftTableShell() {
    //Row Selection variables  
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const selectedRowId =
      Object.keys(rowSelection).find((id) => rowSelection[id]) ?? "";

    //Column Visibility selection variables
    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});

    //Drawer Visibility
    const [drawerOpen, setDrawerOpen] = useState(false);

    //Active Patient
    const [activePatient, setActivePatient] = useState<Patient | null>(null);

    const tableCols = useMemo(
      () =>
        createColumns((patient) => {
          setActivePatient(patient);
          setDrawerOpen(true);
        }),
      []
    );

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

    const pickerGroups = columnPickerGroups.map((group) => ({
      ...group,
      columns: table
        .getAllLeafColumns()
        .filter(
          (column) =>
            column.getCanHide() &&
            column.columnDef.meta?.picker?.group === group.id
        )
        .sort(
          (a, b) =>
            (a.columnDef.meta?.picker?.order ?? 0) -
            (b.columnDef.meta?.picker?.order ?? 0)
        ),
    }));

    return (
        <div className="flex h-dvh w-full min-w-0 flex-col overflow-hidden [&>header]:shrink-0">
            <PageHeader headerText="Billing Report"></PageHeader>
            <div className="min-h-0 flex-1 overflow-auto">
              {/* Right Side Drawer */}
               <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                 <DrawerContent side="right" aria-describedby={undefined}>
                   <DrawerHeader actions={<Button variant='outline'>Create New</Button>}>
                     <DrawerTitle> 
                      <Select
                        label="View"
                        labelPosition='beside'
                        defaultValue='patNotes'
                        options={[
                          {
                            label: 'Patient Notes',
                            value: 'patNotes',
                          },
                       ]}
                      >
                      Patient Notes
                      </Select>
                      </DrawerTitle>
                   </DrawerHeader>
                   <DrawerBody className="p-4">
                     <Accordion type="single" variant="panel">
                       <AccordionItem value="first-section">
                         <AccordionTrigger>Patient & Demographics</AccordionTrigger>
                         <AccordionContent>
                           First section content goes here.
                         </AccordionContent>
                       </AccordionItem>
                       <AccordionItem value="second-section">
                         <AccordionTrigger>Claim & Order Details</AccordionTrigger>
                         <AccordionContent>
                           Second section content goes here.
                         </AccordionContent>
                       </AccordionItem>
                       <AccordionItem value="third-section">
                         <AccordionTrigger>Diagnoses & Modifiers</AccordionTrigger>
                         <AccordionContent>
                           Third section content goes here.
                         </AccordionContent>
                       </AccordionItem>
                       <AccordionItem value="fourth-section">
                         <AccordionTrigger>Payer & Coverage</AccordionTrigger>
                         <AccordionContent>
                           Fourth section content goes here.
                         </AccordionContent>
                       </AccordionItem>
                       <AccordionItem value="fifth-section">
                         <AccordionTrigger>Provider & Location Info</AccordionTrigger>
                         <AccordionContent>
                           Fifth section content goes here.
                         </AccordionContent>
                       </AccordionItem>
                     </Accordion>
                   </DrawerBody>
                 </DrawerContent>
               </Drawer>

              {/* Action Top Panel */}
              <div className="flex w-full flex-nowrap items-center justify-between gap-4 overflow-x-auto bg-muted px-4 py-3">
                <div className="flex shrink-0 flex-nowrap items-center justify-start gap-4">
                  <div className="w-64 shrink-0">
                    <Input
                      defaultValue=""
                      label="Patient Number"
                      labelPosition="beside"
                      placeholder="Number"
                      size="default"
                      type="text"
                    />
                  </div>
                  <div className="w-72 shrink-0">
                    <Input
                      defaultValue=""
                      label="Patient Name"
                      labelPosition="beside"
                      placeholder="Name"
                      size="default"
                      type="text"
                    />
                  </div>
                </div>
                <div className="ml-auto flex shrink-0 flex-nowrap items-center justify-end gap-2">
                  <Button variant="outline">
                    All Remit
                  </Button>
                  <Button variant="outline">
                    Patient Notes
                  </Button>
                  <Button variant="outline">
                    AR History
                  </Button>
                  <Button variant="outline">
                    Biller Note History
                  </Button>
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
                    rowClassName={(row) => row.getIsSelected() ? "bg-sky-100 hover:bg-sky-50" : "hover:bg-slate-100" }
                    onRowClick={claim => table.getRow(claim.id).toggleSelected()}
                    enableColumnReordering={true} />
              </RadioGroup>
            </div>
             
             {/* Footer */}
            <div className="flex shrink-0 items-center justify-between gap-4 border-t border-gray-200 bg-gray-100 px-4 py-3">
              <div className="text-left">{patients.length} Results</div>
              <div className="ml-auto shrink-0">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">Show/Hide Columns</Button>
                  </PopoverTrigger>

                  <PopoverContent
                    align="end"
                    side="top"
                    aria-label="Choose visible columns"
                    className="w-fit max-w-[calc(100vw-2rem)] max-h-[70dvh] overflow-auto"
                  >
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                      {pickerGroups.map((group) => (
                        <fieldset key={group.id} className="min-w-0">
                          <legend className="mb-3 max-w-full break-words text-sm font-semibold uppercase">
                            {group.label}
                          </legend>

                          <div className="space-y-1">
                            {group.columns.map((column) => (
                              <label
                                key={column.id}
                                className="flex cursor-pointer items-center gap-2 text-sm"
                              >
                                <input
                                  type="checkbox"
                                  checked={column.getIsVisible()}
                                  onChange={(event) =>
                                    column.toggleVisibility(event.target.checked)
                                  }
                                />
                                <span>{column.columnDef.meta?.picker?.label}</span>
                              </label>
                            ))}
                          </div>
                        </fieldset>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
        </div>
    );
}
