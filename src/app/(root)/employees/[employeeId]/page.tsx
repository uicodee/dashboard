"use client";

import { useQuery } from "@tanstack/react-query";
import { getEmployee } from "@/shared/api/generated/employee/employee.ts";
import { useParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export default function Page() {
  const { employeeId } = useParams<{ employeeId: string }>();
  const { data: employee, isLoading } = useQuery({
    queryKey: ["employee", employeeId],
    queryFn: () =>
      getEmployee().getEmployeeEmployeeEmployeeIdGet(Number(employeeId)),
  });
  return (
    <>
      <Breadcrumb className="ml-2 mt-2 text-base">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/employees">Employees</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {employee?.firstName} {employee?.lastName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-6 grid grid-cols-6 gap-2 md:gap-4">
        <Card className="col-span-6 md:col-span-2">
          <CardHeader className="pt-6 pb-2">
            <CardTitle>Fullname</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-x-2 items-center pt-1 pb-6">
            {employee?.firstName} {employee?.lastName}{" "}
            {employee?.isVerified && (
              <img
                src="https://s3.timeweb.com/2628aad9-67413717-083e-4baa-94e9-20cf6acb1ec4/verified.svg"
                alt=""
                className="h-4 w-4 "
              />
            )}
          </CardContent>
        </Card>
        <Card className="col-span-6 md:col-span-2">
          <CardHeader className="pt-6 pb-2">
            <CardTitle>Balance</CardTitle>
          </CardHeader>
          <CardContent className="pt-1 pb-6">
            {employee?.balance.toLocaleString("en-US")} sums
          </CardContent>
        </Card>
        <Card className="col-span-3 md:col-span-1">
          <CardHeader className="pt-6 pb-2">
            <CardTitle>Level</CardTitle>
          </CardHeader>
          <CardContent className="pt-1 pb-6">{employee?.level}</CardContent>
        </Card>
        <Card className="col-span-3 md:col-span-1">
          <CardHeader className="pt-6 pb-2">
            <CardTitle>Rating</CardTitle>
          </CardHeader>
          <CardContent className="pt-1 pb-6">{employee?.rating}</CardContent>
        </Card>
        <Card className="col-span-6 md:col-span-2">
          <CardHeader className="pt-6 pb-2">
            <CardTitle>Language</CardTitle>
          </CardHeader>
          <CardContent className="pt-1 pb-6">{employee?.language}</CardContent>
        </Card>
        <Card className="col-span-6 md:col-span-2">
          <CardHeader className="pt-6 pb-2">
            <CardTitle>Created At</CardTitle>
          </CardHeader>
          <CardContent className="pt-1 pb-6">{employee?.createdAt}</CardContent>
        </Card>
        {employee?.phoneNumber !== null && (
          <Card className="col-span-6 md:col-span-2">
            <CardHeader className="pt-6 pb-2">
              <CardTitle>Phone number</CardTitle>
            </CardHeader>
            <CardContent className="pt-1 pb-6">
              {employee?.phoneNumber}
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
