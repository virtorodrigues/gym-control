"use client";
import { Field } from '@/components/form/Field';
import * as Form from '@radix-ui/react-form';
import Link from 'next/link';

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className='bg-white p-12 rounded-md text-center border-gray-200 border space-y-6'>
        <div className='space-y-3'>
          <span className='text-5xl'>🏋🏻</span>
          <h1 className='text-3xl mb-7 text-gray-600'>Acessar conta</h1>
        </div>
        <Form.Root className="flex flex-col space-y-6 w-96">
          <div className='flex flex-col space-y-6'>
            <Field label='email' type='email' placeholder='digite seu email...' name='email' />
            <Field label='senha' type='password' placeholder='digite sua senha...' name='password' />
          </div>
          <div>
            <div className="text-end">
              <a href='#' className="text-gray-400 text-sm hover:text-orange-700 duration-300">esqueci minha senha</a>
            </div>
            <Form.Submit asChild>
              <button className="mt-4 hover:brightness-90 duration-300 w-full px-4 py-2 bg-orange-700 text-gray-200 tracking-wider rounded-md font-semibold">
                Entrar
              </button>
            </Form.Submit>
            <Link href="/company-register" className="flex justify-center mt-4 hover:bg-emerald-950 hover:text-white duration-300 w-full px-4 py-2  bg-white text-emerald-950 font-semibold tracking-wider rounded-md">
              Cadastrar
            </Link>
          </div>
        </Form.Root>
      </div>
    </main>
  )
}
