"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSkill } from "@/shared/api/generated/skill/skill";
import { DataTable } from "@/widgets/data-table";
import { ColumnDef } from "@tanstack/table-core";
import { DeleteSkill, SkillOutput } from "@/shared/api/model";
import { DataCard } from "@/widgets/data-card";
import { CreateSkillButton, CreateSkillModal } from "@/features/create-skill";
import { Checkbox } from "@/shared/ui/checkbox";
import { Button } from "@/shared/ui/button";
import { ArrowUpDown } from "lucide-react";

export default function Skills() {
  const queryClient = useQueryClient();
  const { data: skills, isLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: () => getSkill().allSkillsSkillAllGet(),
  });
  const mutation = useMutation({
    mutationFn: (data: DeleteSkill) =>
      getSkill().deleteSkillSkillDeleteDelete(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["skills"] }),
  });
  const data = skills || [];
  const columns: ColumnDef<SkillOutput>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          onClick={(e) => e.stopPropagation()}
          aria-label="Select row"
        />
      ),
    },
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
    },
  ];
  return (
    <DataCard title="Skills" button={<CreateSkillButton />}>
      <CreateSkillModal />
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        onDelete={(data: SkillOutput[]) =>
          mutation.mutate({ skillsIds: data.map((item) => item.id) })
        }
      />
    </DataCard>
  );
}
