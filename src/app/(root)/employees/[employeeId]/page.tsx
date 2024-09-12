"use client"

import {DataCard} from "@/widgets/data-card";
import {useQuery} from "@tanstack/react-query";
import {getEmployee} from "@/shared/api/generated/employee/employee.ts";
import {useParams} from "next/navigation";
import {Card} from "@/shared/ui/card.tsx";
import {Suspense} from "react";

export default function Page() {
    const {employeeId} = useParams<{ employeeId: string }>()
    const {data, isLoading} = useQuery({
        queryKey: ["employee"],
        queryFn: () => getEmployee().getEmployeeEmployeeEmployeeIdGet(Number(employeeId))
    })
    return (
        <Suspense fallback={<p>Loading feed...</p>}>
            <DataCard title={`${data?.firstName} ${data?.lastName}`}>
            <h1></h1>
        </DataCard>
        </Suspense>
    );
}
