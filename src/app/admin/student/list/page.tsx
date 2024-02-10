import { StudentList } from "@/components/screens/student/list";
import { IStudent } from "@/components/screens/student/types";
import { prismaClient } from "@/lib/prisma";

export default async function StudentListPage() {
  const students: IStudent[] = await prismaClient.student.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <StudentList students={students} />
    </main>
  );
}
