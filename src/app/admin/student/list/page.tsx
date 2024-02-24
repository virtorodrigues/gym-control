import { StudentList } from "@/components/screens/student/list";
import { IStudent } from "@/components/screens/student/types";
import { prismaClient } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

export default async function StudentListPage() {
  const session = await getServerSession()

  //const students: IStudent[] = await prismaClient.student.findMany();

  const company = await prismaClient.company.findFirst({
    where: {
      email: session?.user?.email || ""
    },
    include: {
      students: true,
    },
  } );

  console.log("aaaaaaaaaaaaaaaaa: ", company)


  const students: IStudent[]  = company?.students || [];

  console.log("bbbbbbbbbbbbb: ", students)

  return (
    <main className="flex min-h-screen flex-col items-center p-24 pt-11">
      <StudentList students={students} />
    </main>
  );
}

