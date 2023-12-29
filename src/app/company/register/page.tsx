"use client";
import { Field } from "@/components/form/Field";
import * as Form from "@radix-ui/react-form";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CompanyRegisterSchema,
  ICompanyRegister,
} from "@/forms/companyRegister/schema";
import { FormEvent } from "react";
import { useCompanyRegister } from "@/contexts/companyRegister";
import { useRouter } from "next/navigation";

export default function CompanyRegister() {
  const { setCompanyRegisterForm, name, cel, document, email, logo } =
    useCompanyRegister();

  const createCompanyRegister = useForm<ICompanyRegister>({
    resolver: zodResolver(CompanyRegisterSchema),
    defaultValues: {
      name: name,
      email: email,
      cel: cel,
      document: document,
      logo: logo,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
    control,
  } = createCompanyRegister;

  const router = useRouter();

  const onSubmit = (data: ICompanyRegister) => {
    setCompanyRegisterForm(data);
    router.push("/company/register/password");
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="w-max space-y-6 rounded-md border border-gray-200 bg-white p-12 text-center">
        <div className="space-y-2">
          <span className="text-5xl">👨🏻‍💻</span>
          <h1 className="text-3xl text-gray-600">Cadastrar Empresa</h1>
          <h2 className="text-lg leading-none text-gray-400">
            Dados da empresa
          </h2>
        </div>
        <FormProvider {...createCompanyRegister}>
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
                placeholder="Nome da empresa"
                name="name"
              />
              <Field
                className="col-span-6"
                label="cnpj"
                required
                type="text"
                placeholder=""
                name="document"
              />
              <Field
                className="col-span-6"
                label="celular"
                required
                type="text"
                placeholder="Telefone da empresa"
                name="cel"
              />
              <Field
                className="col-span-12"
                label="email"
                required
                type="email"
                placeholder="Email da empresa"
                name="email"
              />
              <Field
                className="col-span-12"
                label="logo"
                type="text"
                placeholder="Logo da sua empresa"
                name="logo"
              />
            </div>
            <div className="flex items-end justify-end">
              <Form.Submit asChild>
                <button className="mt-4 flex items-center justify-center gap-2 rounded-md bg-green-700 px-6 py-2 font-semibold tracking-wider text-gray-200 duration-300 hover:brightness-110">
                  Prosseguir
                  <ArrowRightIcon fontStyle="bold" className="font-bold" />
                </button>
              </Form.Submit>
            </div>
          </Form.Root>
        </FormProvider>
      </div>
    </main>
  );
}
