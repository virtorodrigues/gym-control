import { prismaClient } from "@/lib/prisma";
import { IStudent } from "../types";
import { columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<IStudent[]> {
  return await prismaClient.student.findMany();
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
