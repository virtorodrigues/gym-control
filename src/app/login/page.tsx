"use client";
import { Field } from "@/components/form/Field";
import * as Form from "@radix-ui/react-form";
import Link from "next/link";

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="space-y-6 rounded-md border border-gray-200 bg-white p-12 text-center">
        <div className="space-y-3">
          <span className="text-5xl">🏋🏻</span>
          <h1 className="mb-7 text-3xl text-gray-600">Acessar conta</h1>
        </div>
        <Form.Root className="flex w-96 flex-col space-y-6">
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
              <button className="mt-4 w-full rounded-md bg-orange-700 px-4 py-2 font-semibold tracking-wider text-gray-200 duration-300 hover:brightness-90">
                Entrar
              </button>
            </Form.Submit>
            <Link
              href="/company-register"
              className="mt-4 flex w-full justify-center rounded-md bg-white px-4 py-2 font-semibold  tracking-wider text-emerald-950 duration-300 hover:bg-emerald-950 hover:text-white"
            >
              Cadastrar
            </Link>
          </div>
        </Form.Root>
      </div>
    </main>
  );
}
