"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DumbbellIcon, ListChecks, UserRoundPlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";

export const AsideMenu =  () => {
  const router = useRouter();

  const redirectTo = ({ to }: { to: string }) => {
    router.push(to);
  };

  const { data } = useSession();

  console.log(data)

  if (!data) {
    return <></>
  }

  const Subtitle = ({ subtitle }: { subtitle: string }) => {
    return (
      <strong className="px-3 font-normal tracking-widest text-white/80 mb-3 mt-3">{subtitle}</strong>
    )
  }

  const MenuItems = ({ title, icon, href }: {
      title: string;
      href: string;
      icon: any
    }) => {
    return (
      <Link href={href} className="">
        <button className="w-full text-sm flex items-center gap-2 hover:bg-orange-800 text-start px-3 rounded py-2 mb-1">
          {icon}
          {title}
        </button>
      </Link>
    )
  }

  return (
    <aside className="px-4 fixed justify-start flex flex-col h-full pt-4 bg-orange-700 text-white min-w-52">
      <strong
        className="text-start px-3 text-2xl cursor-pointer mb-3"
        onClick={() => redirectTo({ to: "/admin/home" })}>
        E-Cad
      </strong>

      <Subtitle subtitle="Alunos" />

      <MenuItems
        icon={<UserRoundPlusIcon size={18} />}
        href="/admin/student/create"
        title="Cadastrar aluno"
       />
      <MenuItems
        icon={<ListChecks size={18} />}
        href="/admin/student/list"
        title="Listar alunos"
      />

      <Subtitle subtitle="Exercícios" />

      <MenuItems
        icon={<DumbbellIcon size={18} />}
        href="/admin/exercise/create"
        title="Cadastrar exercício"
      />
      <MenuItems
        icon={<ListChecks size={18} />}
        href="/admin/student/list"
        title="Listar exercícios"
      />
    </aside>
  );
};
