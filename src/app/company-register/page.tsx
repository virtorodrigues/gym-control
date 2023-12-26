"use client";
import { Field } from '@/components/form/Field';
import * as Form from '@radix-ui/react-form';
import Image from 'next/image'
import Link from 'next/link';
import {
 ArrowRightIcon
} from '@radix-ui/react-icons';

export default function CompanyRegister() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className='bg-white p-12 rounded-md text-center border-gray-200 border space-y-6 w-max'>
        <div className='space-y-2'>
          <span className='text-5xl'>👨🏻‍💻</span>
          <h1 className='text-3xl text-gray-600'>Cadastrar Empresa</h1>
          <h2 className='text-lg text-gray-400 leading-none'>Dados da empresa</h2>
        </div>
        <Form.Root className="flex flex-col space-y-6 w-96">
          <div className='grid grid-cols-12 gap-4'>
            <Field className='col-span-12' label='nome' required type='text' placeholder='Nome da empresa' name='nome' />
            <Field className='col-span-6' label='cnpj' required type='text' placeholder='' name='cnpj' />
            <Field className='col-span-6' label='telefone' required type='text' placeholder='Telefone da empresa' name='telefone' />
            <Field className='col-span-12' label='email' required type='email' placeholder='Email da empresa' name='email' />
            <Field className='col-span-12' label='logo' type='text' placeholder='Logo da sua empresa' name='logo' />
          </div>
          <div className='flex items-end justify-end'>
            <Form.Submit asChild>
              <Link href='/company-register/password' className="gap-2 flex justify-center items-center mt-4 hover:brightness-110 duration-300 px-6 py-2 bg-green-700 text-gray-200 font-semibold tracking-wider rounded-md">
                Prosseguir
                <ArrowRightIcon fontStyle='bold' className='font-bold' />
              </Link>
            </Form.Submit>
          </div>
        </Form.Root>
      </div>
    </main>
  )
}