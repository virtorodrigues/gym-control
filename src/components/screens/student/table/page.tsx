import { columns } from "./columns";
import { DataTable } from "./data-table";

// async function getData(): Promise<IStudent[]> {
//   return await prismaClient.student.findMany();
// }

export default async function Table({ data }: { data: any }) {
  return (
    <div className="">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
