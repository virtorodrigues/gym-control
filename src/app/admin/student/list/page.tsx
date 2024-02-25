import { StudentList } from "@/components/screens/student/list";
import { IStudent } from "@/components/screens/student/types";
import { prismaClient } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

export default async function StudentListPage() {
  const session = await getServerSession()

  const company = await prismaClient.company.findFirst({
    where: {
      email: session?.user?.email || ""
    },
    include: {
      students: true,
    },
  } );

  const students: IStudent[]  = company?.students || [];

  return (
    <main className="flex min-h-screen flex-col items-center p-24 pt-11 w-full">
      <StudentList students={students} />
    </main>
  );
}

