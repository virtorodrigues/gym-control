import { prismaClient } from "@/lib/prisma";
import { IStudent } from "./types";
import DemoPage from "./table/page";

export const StudentList = async ({ students }: { students: IStudent[] }) => {
  console.log(students);
  return (
    <div>
      <h1 className="text-3xl">Lista de Alunos</h1>
      <DemoPage />
    </div>
  );
};
