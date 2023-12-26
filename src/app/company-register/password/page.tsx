"use client";
import { Field } from '@/components/form/Field';
import * as Form from '@radix-ui/react-form';
import Image from 'next/image'
import Link from 'next/link';
import { ArrowLeftIcon, CheckIcon, Cross2Icon } from '@radix-ui/react-icons';

export default function CompanyRegisterPassword() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className='bg-white p-12 rounded-md text-center border-gray-200 border space-y-6 '>
        <div className='space-y-2'>
          <span className='text-5xl'>👨🏻‍💻</span>
          <h1 className='text-3xl text-gray-600'>Cadastrar Empresa</h1>
          <h2 className='text-lg text-gray-400 leading-none'>Criar senha</h2>
        </div>
        <Form.Root className="flex flex-col gap-6 w-96">
          <div className='grid grid-cols-12 gap-7'>
            <Field className='col-span-12' label='senha' required type='password' placeholder='' name='password' />
            <div className='flex flex-col gap-1 col-span-12'>
              <p className='flex items-center justify-start col-span-12 gap-2 text-sm text-left text-gray-500'>
                <Cross2Icon className='text-red-600 text-4xl'/>
                Deve ter no mínimo 8 caracteres e máximo 15
              </p>
              <p className='flex items-center justify-start col-span-12 gap-2 text-sm text-left text-gray-500'>
                <Cross2Icon className='text-red-600 text-4xl'/>
                Deve ter no mínimo uma letra minúscula
              </p>
              <p className='flex items-center justify-start col-span-12 gap-2 text-sm text-left text-gray-500'>
                <Cross2Icon className='text-red-600 text-4xl'/>
                Deve ter no mínimo uma letra maiúscula
              </p>
              <p className='flex items-center justify-start col-span-12 gap-2 text-sm text-left text-gray-500'>
                <Cross2Icon className='text-red-600 text-4xl'/>
                <span>Deve ter no mínimo 1 caractere especial ex: */-+;:/?!@#$%&</span>
              </p>
            </div>
            <Field className='col-span-12' label='repetir senha' required type='text' placeholder='' name='repeat password' />
          </div>
          <div className='flex items-end justify-between'>
            <Link href="/company-register" className="gap-2 items-center flex justify-center hover:bg-red-900 hover:text-white duration-300 px-4 py-2  bg-white text-emerald-950 font-semibold tracking-wider rounded-md">
              <ArrowLeftIcon />
              Voltar
            </Link>
            <Form.Submit asChild>
              <button className="gap-2 flex justify-center items-center mt-4 hover:brightness-110 duration-300 px-6 py-2 bg-green-700 text-gray-200 font-semibold tracking-wider rounded-md">
                Cadastrar
                <CheckIcon fontStyle='bold' className='font-semibold' />
              </button>
            </Form.Submit>
          </div>
        </Form.Root>
      </div>
    </main>
  )
}