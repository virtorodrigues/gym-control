"use client";
import { Home } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const Header = () => {
  const { data } = useSession();

  const router = useRouter();

  const redirectTo = ({ to }: { to: string }) => {
    router.push(to);
  };

  return (
    <header className="flex h-12 w-full items-center justify-center gap-16 bg-orange-700 text-white">
      <button onClick={() => redirectTo({ to: "/admin/home" })}>Home</button>
      <button>Alunos</button>
      <button>Perfil</button>
      <button>Exercícios</button>
      {data?.user ? (
        <button onClick={() => signOut()}>Sair</button>
      ) : (
        <button onClick={() => redirectTo({ to: "/company/login" })}>
          Login
        </button>
      )}
    </header>
  );
};
