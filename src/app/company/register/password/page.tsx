"use client";
import { Field } from "@/components/form/Field";
import * as Form from "@radix-ui/react-form";
import Link from "next/link";
import { ArrowLeftIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CompanyRegisterPasswordSchema,
  ICompanyRegisterPassword,
} from "@/forms/companyRegister/schema";
import { FormProvider, useForm } from "react-hook-form";
import { useCompanyRegister } from "@/contexts/companyRegister";
import { useRouter } from "next/navigation";
import { URL_LOGIN_COMPANY, URL_REGISTER_COMPANY } from "@/constants/urls";
import { useToast } from "@/components/ui/use-toast";
import { name } from "tailwindcss";

export default function CompanyRegisterPassword() {
  const { toast } = useToast();

  const { password, repeatPassword, name, cel, document, email } =
    useCompanyRegister();

  const createCompanyRegister = useForm<ICompanyRegisterPassword>({
    resolver: zodResolver(CompanyRegisterPasswordSchema),
    defaultValues: {
      password: password,
      repeatPassword: repeatPassword,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
    control,
  } = createCompanyRegister;

  const router = useRouter();

  const onSubmit = async (data: ICompanyRegisterPassword) => {
    const request = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        isVerifyExistsPassword: true,
        password: data.password,
        repeatPassword: data.repeatPassword,
        name,
        email,
        role: "admin",
        cel,
        company: {
          name,
          cel,
          document,
          email,
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
      console.log("nao foi possivel cadastrar empresa", response);
    } else {
      toast({
        title: `Cadasdtrado com sucesso!`,
        description: `Bem vindo ${email || ""}`,
        className: "bg-green-600 text-white",
      });
      console.log("Empresa cadastrada com sucesso!: ", response);
      router.push(URL_LOGIN_COMPANY);
    }
  };

  const [watchPassword, watchRepeatPassword] = watch([
    "password",
    "repeatPassword",
  ]);

  const HandleValidPassword = () => {
    const hasRightSize = watchPassword.length > 7 && watchPassword.length < 31;
    const hasLowerCase = new RegExp(/(?=.*[a-zà-ü]).*$/g).test(watchPassword);
    const hasUpperCase = new RegExp(/(?=.*[A-ZÀ-Ü]).*$/g).test(watchPassword);
    const hasSpecialCharacter = new RegExp(/(?=.*[@!#$%^&*()/?+-]).*$/g).test(
      watchPassword,
    );

    return (
      <div className="col-span-12 flex flex-col gap-1">
        <p className="col-span-12 flex items-center justify-start gap-2 text-left text-sm text-gray-500">
          {hasRightSize ? (
            <CheckIcon className="text-4xl text-green-600" />
          ) : (
            <Cross2Icon className="text-4xl text-red-600" />
          )}
          Deve ter no mínimo 8 caracteres e máximo 15
        </p>
        <p className="col-span-12 flex items-center justify-start gap-2 text-left text-sm text-gray-500">
          {hasLowerCase ? (
            <CheckIcon className="text-4xl text-green-600" />
          ) : (
            <Cross2Icon className="text-4xl text-red-600" />
          )}
          Deve ter no mínimo uma letra minúscula
        </p>
        <p className="col-span-12 flex items-center justify-start gap-2 text-left text-sm text-gray-500">
          {hasUpperCase ? (
            <CheckIcon className="text-4xl text-green-600" />
          ) : (
            <Cross2Icon className="text-4xl text-red-600" />
          )}
          Deve ter no mínimo uma letra maiúscula
        </p>
        <p className="col-span-12 flex items-center justify-start gap-2 text-left text-sm text-gray-500">
          {hasSpecialCharacter ? (
            <CheckIcon className="text-4xl text-green-600" />
          ) : (
            <Cross2Icon className="text-4xl text-red-600" />
          )}
          <span>
            Deve ter no mínimo 1 caractere especial ex: @!#$%^&*()/?+-
          </span>
        </p>
      </div>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="space-y-6 rounded-md border border-gray-200 bg-white p-12 text-center ">
        <div className="space-y-2">
          <span className="text-5xl">👨🏻‍💻</span>
          <h1 className="text-3xl text-gray-600">Cadastrar Empresa</h1>
          <h2 className="text-lg leading-none text-gray-400">Criar senha</h2>
        </div>
        <FormProvider {...createCompanyRegister}>
          <Form.Root
            className="flex w-96 flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-12 gap-7">
              <Field
                className="col-span-12"
                label="senha"
                required
                type="password"
                placeholder=""
                name="password"
              />

              <HandleValidPassword />

              <Field
                className="col-span-12"
                label="repetir senha"
                required
                type="password"
                placeholder=""
                name="repeatPassword"
              />
            </div>
            <div className="flex items-end justify-between">
              <Link
                href={URL_REGISTER_COMPANY}
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
        </FormProvider>
      </div>
    </main>
  );
}
