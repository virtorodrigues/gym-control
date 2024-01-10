"use client";
import { Field } from "@/components/form/Field";
import * as Form from "@radix-ui/react-form";
import { PlusIcon } from "@radix-ui/react-icons";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import {
  IStudentRegister,
  StudentRegisterSchema,
} from "@/forms/studentRegister/schema";
import { URL_LOGIN_COMPANY } from "@/constants/urls";
import email from "next-auth/providers/email";
import { toast } from "@/components/ui/use-toast";

export default function CreateStudent() {
  const createStudentRegister = useForm<IStudentRegister>({
    resolver: zodResolver(StudentRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      birthday: "",
      document: "",
      cel: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
    control,
  } = createStudentRegister;

  const router = useRouter();

  const onSubmit = async (data: IStudentRegister) => {
    const request = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        isVerifyExistsPassword: false,
        name: data.name,
        email: data.email,
        role: "user",
        cel: data.cel,
        student: {
          name: data.name,
          cel: data.cel,
          document: data.document,
          email: data.email,
          birthday: data.birthday,
        },
      }),
    });

    const response = await request.json();

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: `Não foi possível realizar o cadastro!`,
        description: `${(response.message as string) || ""}`,
      });
      console.log("nao foi possivel cadastrar aluno", response);
    } else {
      toast({
        title: `Cadasdtrado com sucesso!`,
        // description: `Bem vindo ${email || ""}`,
        className: "bg-green-600 text-white",
      });
      console.log("Empresa cadastrada com sucesso!: ", response);
      // router.push(URL_LOGIN_COMPANY);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="w-max space-y-6 rounded-md border border-gray-200 bg-white p-12 text-center">
        <div className="space-y-2">
          <span className="text-5xl">👨🏻‍💻</span>
          <h1 className="text-3xl text-gray-600">Cadastrar Aluno</h1>
          <h2 className="text-lg leading-none text-gray-400">Dados do Aluno</h2>
        </div>
        <FormProvider {...createStudentRegister}>
          <Form.Root
            className="flex w-96 flex-col space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-12 gap-4">
              <Field
                className="col-span-12"
                label="nome"
                required
                type="text"
                placeholder="nome do aluno"
                name="name"
              />
              <Field
                className="col-span-12"
                label="email"
                required
                type="email"
                placeholder="email do aluno"
                name="email"
              />
              <Field
                className="col-span-6"
                label="cpf"
                required
                placeholder="cpf do aluno"
                type="text"
                name="document"
              />
              <Field
                className="col-span-6"
                label="data de nascimento"
                required
                type="text"
                placeholder="data de nascimento"
                name="birthday"
              />
              <Field
                className="col-span-6"
                label="data de nascimento"
                required
                type="text"
                placeholder="celular do aluno"
                name="cel"
              />
            </div>
            <div className="flex items-end justify-end">
              <Form.Submit asChild>
                <button className="mt-4 flex items-center justify-center gap-2 rounded-md bg-green-700 px-6 py-2 font-semibold tracking-wider text-gray-200 duration-300 hover:brightness-110">
                  Salvar
                  <PlusIcon fontStyle="bold" className="font-bold" />
                </button>
              </Form.Submit>
            </div>
          </Form.Root>
        </FormProvider>
      </div>
    </main>
  );
}
