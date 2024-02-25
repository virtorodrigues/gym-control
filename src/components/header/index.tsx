"use client";

import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const Header =  () => {
  const router = useRouter();

  const redirectTo = ({ to }: { to: string }) => {
    router.push(to);
  };

  const { data } =  useSession();

  if (!data) {
    return <></>
  }

  return (
    <header className="flex bg-white justify-end py-4 px-8 gap-6">
      <div>
        <p className="text-xs text-gray-600">Olá</p> <strong className="text-gray-600"> {data.user?.email} </strong>
      </div>
      <button onClick={() => signOut()} className="hover:text-red-700">Sair</button>
    </header>
  );
};
