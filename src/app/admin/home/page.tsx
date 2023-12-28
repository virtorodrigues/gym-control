"use client";
import * as Form from "@radix-ui/react-form";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data, status, update } = useSession();

  console.log(data, status, update);
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Home</h1>
    </main>
  );
}
