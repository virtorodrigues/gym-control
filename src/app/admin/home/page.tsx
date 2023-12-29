import * as Form from "@radix-ui/react-form";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  //const { data, status, update } = useSession();

  // const company = await fetch("http://localhost:3000/api/company");
  // //  console.log(data);
  // const response = await company.json();
  // console.log(response);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Home</h1>
    </main>
  );
}
