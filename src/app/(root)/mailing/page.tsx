"use client";

import {
  CreateMailingButton,
  CreateMailingModal,
} from "@/features/create-mailing";
import { getMailing } from "@/shared/api/generated/mailing/mailing";
import { MailOutput } from "@/shared/api/model";
import { jobStatuses } from "@/shared/lib/data";
import { DataCard } from "@/widgets/data-card";
import { DataTable } from "@/widgets/data-table";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck } from "lucide-react";

export default function Page() {
  const { data: mailings, isLoading } = useQuery({
    queryKey: ["mailing"],
    queryFn: () => getMailing().getMailingsMailingGet(),
  });
  const data = mailings || [];
  const columns: ColumnDef<MailOutput>[] = [
    {
      accessorKey: "job",
      header: "Job ID",
    },
    {
      accessorKey: "message",
      header: "Message",
    },
    {
      accessorKey: "progress",
      header: "Progress",
    },
    {
      accessorKey: "total",
      header: "Total",
    },
  ];
  return (
    <DataCard title="Mailings" button={<CreateMailingButton />}>
      <CreateMailingModal />
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        filterFields={[
          { name: "Message", key: "message" },
          { name: "Job ID", key: "job" },
        ]}
        facetedFilters={[
          {
            icon: CircleCheck,
            columnName: "progress",
            title: "Progress",
            options: jobStatuses,
          },
        ]}
      />
    </DataCard>
  );
}
