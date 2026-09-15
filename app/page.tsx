"use client";

import {
  Select,
  Button,
  Input,
  RadioGroup,
  RadioGroupItem,
} from "@aeroflow/af-components";

import { PageHeader } from "@/components/page-header";

export default function Home() {
  return (
    <div className="w-full">
      <PageHeader headerText="AR Billing Reports"></PageHeader>
      <div className="mx-auto min-h-screen w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <section className="mt-3">
          <h2 className="mb-4 text-2xl font-semibold">AR reports by patient</h2>
          <div className="w-full">
            <Select
              label="Report Type"
              labelPosition="above"
              placeholder="Select Tier"
              options={[
                {
                  label: "List Item",
                  value: "item-1",
                },
                {
                  label: "List Item",
                  value: "item-2",
                },
                {
                  label: "List Item",
                  value: "item-3",
                },
              ]}

              size="default"
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="min-w-0">
              <Input
                label="Patient #"
                placeholder="Enter here"
                size="default"
                type="text"
              />
            </div>

            <div className="min-w-0">
              <Select
                label="Patient Name"
                labelPosition="above"
                labelClassName="py-0"
                wrapperClassName="space-y-2"
                placeholder="Select Tier"
                options={[
                  {
                    label: "List Item",
                    value: "item-1",
                  },
                  {
                    label: "List Item",
                    value: "item-2",
                  },
                  {
                    label: "List Item",
                    value: "item-3",
                  },
                ]}
                size="default"
              />
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-semibold">
            AR reports by payer rep or payer
          </h2>

          <div className="w-full">
            <Select
              label="Payer Rep"
              labelPosition="above"
              placeholder="Select Tier"
              options={[
                {
                  label: "List Item",
                  value: "item-1",
                },
                {
                  label: "List Item",
                  value: "item-2",
                },
                {
                  label: "List Item",
                  value: "item-3",
                },
              ]}
              size="default"
            />
          </div>

          <div className="w-full mt-4">
            <Select
              label="Payer"
              labelPosition="above"
              placeholder="Select Tier"
              options={[
                {
                  label: "List Item",
                  value: "item-1",
                },
                {
                  label: "List Item",
                  value: "item-2",
                },
                {
                  label: "List Item",
                  value: "item-3",
                },
              ]}
              size="default"
            />
          </div>

          {/* Radio Group */}
          <div className="mt-4">
            <RadioGroup
              label="Search Type"
              name="searchType"
              orientation="vertical"
              defaultValue="primary"
            >
              <RadioGroupItem
                value="primary"
                label="Primary AR Report (Split Form Version)"
              />
              <RadioGroupItem
                value="second"
                label="2nd/3rd AR Report (Split Form Version)"
              />
              <RadioGroupItem value="masterlines" label="Masterlines" />
              <RadioGroupItem
                value="expiring"
                label="Expiring PAs and Certifications"
              />
            </RadioGroup>
          </div>
        </section>

        <section>
          <div className="mt-6 flex justify-center">
            <Button>Search</Button>
          </div>
        </section>
      </div>
    </div>
  );
}
