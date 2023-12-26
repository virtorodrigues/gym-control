"use client";
import * as Form from '@radix-ui/react-form';
import Image from 'next/image'

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className='bg-white p-12 rounded-md text-center border-gray-200 border space-y-6'>
        <div className='space-y-3'>
          <span className='text-5xl'>🏋🏻</span>
          <h1 className='text-3xl mb-7 text-gray-600'>Acessar conta</h1>
        </div>
        <Form.Root className="flex flex-col space-y-6 w-80">
          <div className='flex flex-col space-y-6'>
            <Form.Field className="flex flex-col space-y-1" name="email">
              <div className="flex items-baseline justify-between">
                <Form.Label className="text-gray-400 text-sm">Email</Form.Label>
              </div>
              <Form.Control asChild>
                <input
                  className="py-2 px-3 text-slate-950 rounded-md border border-gray-200"
                  type="email"
                  placeholder='digite seu email...'
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="flex flex-col space-y-1" name="email">
              <div className="flex items-baseline justify-between">
                <Form.Label className="text-gray-400 text-sm">Senha</Form.Label>
              </div>
              <Form.Control asChild>
                <input
                  className="py-2 px-3 text-slate-950 rounded-md border border-gray-200"
                  type="password"
                  placeholder='digite sua senha...'
                  required
                />
              </Form.Control>
            </Form.Field>
          </div>
          <div>
            <div className="text-end">
              <a href='#' className="text-gray-400 text-sm hover:text-orange-700 duration-300">esqueci minha senha</a>
            </div>
            <Form.Submit asChild>
              <button className="mt-4 hover:brightness-90 duration-300 w-full px-4 py-2 bg-orange-700 text-gray-200 font-semibold tracking-wider rounded-md">
                Entrar
              </button>
            </Form.Submit>
          </div>
        </Form.Root>
      </div>

    </main>
  )
}
