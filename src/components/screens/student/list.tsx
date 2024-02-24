import { prismaClient } from "@/lib/prisma";
import { IStudent } from "./types";
import Table from "./table/page";

export const StudentList = async ({ students }: { students: IStudent[] }) => {

  return (
    <div>
      <h1 className="mb-3 text-3xl">Lista de Alunos</h1>
      <Table data={students}/>
    </div>
  );
};
