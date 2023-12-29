"use client";
import { Field } from "@/components/form/Field";
import { ILogin, LoginSchema } from "@/forms/login/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Form from "@radix-ui/react-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

export default function Login() {
  const login = useForm<ILogin>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
    control,
  } = login;

  const router = useRouter();

  const onSubmit = async (data: ILogin) => {
    const res = await signIn<"credentials">("credentials", {
      ...data,
      redirect: false,
    });

    console.log(res);

    if (!res?.ok) {
      console.log("entrou aqui");

      console.log("Não foi possivel logar", res);
    } else {
      console.log("Logado com sucesso!", res);

      router.push("/admin/home");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="space-y-6 rounded-md border border-gray-200 bg-white p-12 text-center">
        <div className="space-y-2">
          <span className="text-5xl">🏋🏻</span>
          <h1 className="text-3xl text-gray-600">
            Acessar conta
            <p className="text-lg font-semibold text-orange-500">EMPRESARIAL</p>
          </h1>
        </div>
        <FormProvider {...login}>
          <Form.Root
            className="flex w-96 flex-col space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col space-y-6">
              <Field
                label="email"
                type="email"
                placeholder="digite seu email..."
                name="email"
              />
              <Field
                label="senha"
                type="password"
                placeholder="digite sua senha..."
                name="password"
              />
            </div>
            <div>
              <div className="text-end">
                <a
                  href="#"
                  className="text-sm text-gray-400 duration-300 hover:text-orange-700"
                >
                  esqueci minha senha
                </a>
              </div>
              <Form.Submit asChild>
                <button className="mt-4 w-full rounded-md bg-orange-500 px-4 py-2 font-semibold tracking-wider text-gray-200 duration-300 hover:brightness-90">
                  Entrar
                </button>
              </Form.Submit>
              <Link
                href="/company/register"
                className="mt-4 flex w-full justify-center rounded-md bg-white px-4 py-2 font-semibold  tracking-wider text-emerald-950 duration-300 hover:bg-emerald-950 hover:text-white"
              >
                Cadastrar
              </Link>
            </div>
          </Form.Root>
        </FormProvider>
      </div>
    </main>
  );
}