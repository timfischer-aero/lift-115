"use client";

import {
  Select,
  Button,
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

import type { Patient } from "./mock-patients";

type PatientNotesDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: Patient | null;
};

export function PatientNotesDrawer({
  open,
  onOpenChange,
  patient,
}: PatientNotesDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent side="right" aria-describedby={undefined}>
        <DrawerHeader actions={<Button variant="outline">Create New</Button>}>
          <DrawerTitle>
            <Select
              label="View"
              labelPosition="beside"
              defaultValue="patNotes"
              options={[
                {
                  label: "Patient Notes",
                  value: "patNotes",
                },
              ]}
            />
          </DrawerTitle>
        </DrawerHeader>
        <DrawerBody className="p-4">
          <Accordion type="single" variant="panel"  defaultValue="first-section">
            <AccordionItem value="first-section" >
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
  );
}
