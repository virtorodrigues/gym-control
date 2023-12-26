"use client";
import * as Form from "@radix-ui/react-form";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="rounded-md border border-gray-200 bg-white p-16 text-center">
        <h1 className="mb-7 text-3xl">Acessar conta</h1>
        <Form.Root className="flex w-80 flex-col space-y-6">
          <div className="flex flex-col space-y-6">
            <Form.Field className="flex flex-col space-y-1" name="email">
              <div className="flex items-baseline justify-between">
                <Form.Label className="text-sm text-gray-400">Email</Form.Label>
              </div>
              <Form.Control asChild>
                <input
                  className="rounded-md border border-gray-200 px-3 py-2 text-slate-950"
                  type="email"
                  placeholder="digite seu email..."
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="flex flex-col space-y-1" name="email">
              <div className="flex items-baseline justify-between">
                <Form.Label className="text-sm text-gray-400">Senha</Form.Label>
              </div>
              <Form.Control asChild>
                <input
                  className="rounded-md border border-gray-200 px-3 py-2 text-slate-950"
                  type="password"
                  placeholder="digite sua senha..."
                  required
                />
              </Form.Control>
            </Form.Field>
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
          </div>
        </Form.Root>
      </div>
    </main>
  );
}
