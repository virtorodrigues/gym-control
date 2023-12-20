"use client";
import * as Form from '@radix-ui/react-form';
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className='text-5xl mb-7'>Login</h1>
      <Form.Root className="flex flex-col space-y-5 w-72">
        <Form.Field className="flex flex-col space-y-1" name="email">
          <div className="flex items-baseline justify-between">
            <Form.Label className="font-medium text-white">Email</Form.Label>
          </div>
          <Form.Control asChild>
            <input
              className="py-2 px-3 text-slate-950 rounded-md"
              type="email"
              placeholder='digite seu email...'
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="flex flex-col space-y-1" name="email">
          <div className="flex items-baseline justify-between">
            <Form.Label className="font-medium text-white">Senha</Form.Label>
          </div>
          <Form.Control asChild>
            <input
              className="py-2 px-3 text-slate-950 rounded-md"
              type="password"
              placeholder='digite sua senha...'
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button className="mt-4 hover:brightness-90 duration-300 w-full p-4 bg-orange-700 text-gray-200 font-semibold tracking-wider rounded-md">
            Entrar
          </button>
        </Form.Submit>
      </Form.Root>
    </main>
  )
}
