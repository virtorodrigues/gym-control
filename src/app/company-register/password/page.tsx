"use client";
import { Field } from "@/components/form/Field";
import * as Form from "@radix-ui/react-form";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";

export default function CompanyRegisterPassword() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="space-y-6 rounded-md border border-gray-200 bg-white p-12 text-center ">
        <div className="space-y-2">
          <span className="text-5xl">👨🏻‍💻</span>
          <h1 className="text-3xl text-gray-600">Cadastrar Empresa</h1>
          <h2 className="text-lg leading-none text-gray-400">Criar senha</h2>
        </div>
        <Form.Root className="flex w-96 flex-col gap-6">
          <div className="grid grid-cols-12 gap-7">
            <Field
              className="col-span-12"
              label="senha"
              required
              type="password"
              placeholder=""
              name="password"
            />
            <div className="col-span-12 flex flex-col gap-1">
              <p className="col-span-12 flex items-center justify-start gap-2 text-left text-sm text-gray-500">
                <Cross2Icon className="text-4xl text-red-600" />
                Deve ter no mínimo 8 caracteres e máximo 15
              </p>
              <p className="col-span-12 flex items-center justify-start gap-2 text-left text-sm text-gray-500">
                <Cross2Icon className="text-4xl text-red-600" />
                Deve ter no mínimo uma letra minúscula
              </p>
              <p className="col-span-12 flex items-center justify-start gap-2 text-left text-sm text-gray-500">
                <Cross2Icon className="text-4xl text-red-600" />
                Deve ter no mínimo uma letra maiúscula
              </p>
              <p className="col-span-12 flex items-center justify-start gap-2 text-left text-sm text-gray-500">
                <Cross2Icon className="text-4xl text-red-600" />
                <span>
                  Deve ter no mínimo 1 caractere especial ex: */-+;:/?!@#$%&
                </span>
              </p>
            </div>
            <Field
              className="col-span-12"
              label="repetir senha"
              required
              type="text"
              placeholder=""
              name="repeat password"
            />
          </div>
          <div className="flex items-end justify-between">
            <Link
              href="/company-register"
              className="flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 font-semibold  tracking-wider text-emerald-950 duration-300 hover:bg-red-900 hover:text-white"
            >
              <ArrowLeftIcon />
              Voltar
            </Link>
            <Form.Submit asChild>
              <button className="mt-4 flex items-center justify-center gap-2 rounded-md bg-green-700 px-6 py-2 font-semibold tracking-wider text-gray-200 duration-300 hover:brightness-110">
                Cadastrar
                <CheckIcon fontStyle="bold" className="font-semibold" />
              </button>
            </Form.Submit>
          </div>
        </Form.Root>
      </div>
    </main>
  );
}
