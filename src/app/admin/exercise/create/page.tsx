"use client";
import { Field } from "@/components/form/Field";
import * as FormRadix from "@radix-ui/react-form";
import { PlusIcon } from "@radix-ui/react-icons";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import {
  IStudentRegister,
  StudentRegisterSchema,
} from "@/forms/studentRegister/schema";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BadgePlusIcon, Link } from "lucide-react";

export default function CreateStudent() {
  const createStudentRegister = useForm<IStudentRegister>({
    resolver: zodResolver(StudentRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      birthday: "",
      document: "",
      cel: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
    control,
  } = createStudentRegister;

  const router = useRouter();
  const { data: companyData } = useSession();

  const onSubmit = async (data: IStudentRegister) => {
    const request = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        isVerifyExistsPassword: false,
        name: data.name,
        email: data.email,
        role: "user",
        cel: data.cel,
        student: {
          name: data.name,
          cel: data.cel,
          document: data.document,
          email: data.email,
          birthday: data.birthday,
          companyEmail: companyData?.user?.email
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
    } else {
      toast({
        title: `Cadasdtrado com sucesso!`,
        // description: `Bem vindo ${email || ""}`,
        className: "bg-green-600 text-white",
      });
    }
  };

  const arrayOfMuscle = [];

  return (
    <main className="flex flex-col items-center p-24 pt-11">
      <div className="space-y-6 rounded-md border border-gray-200 bg-white p-12 text-center max-w-full w-6/12">
        <div className="space-y-2">
          <span className="text-5xl">👨🏻‍💻</span>
          <h1 className="text-3xl text-gray-600">Cadastrar Exercício</h1>
          <h2 className="text-lg leading-none text-gray-400">Dados do Exercício</h2>
        </div>
        <FormProvider {...createStudentRegister}>
          <FormRadix.Root
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-12 gap-4">
              <Field
                className="col-span-6"
                label="nome"
                required
                type="text"
                placeholder="nome do aluno"
                name="name"
              />
              <Field
                className="col-span-6"
                label="descrição do exercício"
                required
                placeholder="descrição do exercício"
                type="text"
                name="document"
              />
                <FormField
                  control={createStudentRegister.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="col-span-6 text-start">
                      <FormLabel className="text-sm text-gray-500">grupo muscular</FormLabel>
                      <div className="flex items-center justify-center gap-4">
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue className="text-sm placeholder:text-gray-500" placeholder="selecione o grupo muscular" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="peito">peito</SelectItem>
                            <SelectItem value="perna">perna</SelectItem>
                            <SelectItem value="costas">costas</SelectItem>
                            <SelectItem value="biceps">biceps</SelectItem>
                            <SelectItem value="triceps">triceps</SelectItem>
                          </SelectContent>
                        </Select>
                        <button><BadgePlusIcon size={22}/></button>
                        {/* <FormDescription>
                          You can manage email addresses in your{" "}
                          <Link href="/examples/forms">email settings</Link>.
                        </FormDescription> */}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <Field
                className="col-span-12"
                label="URL do video"
                required
                type="email"
                placeholder="URL do video"
                name="email"
              />
              {/* <video height={"400"} width={"200"} autoPlay controls src="https://www.youtube.com/watch?v=kuQp3uZr7fc">
                <source src="https://www.youtube.com/watch?v=kuQp3uZr7fc" type="video/mp4" />
              </video> */}
              <div className="col-span-12">
                <iframe width="100%" height={'400'} src="https://www.youtube.com/embed/vihQA351QyU?si=E89WV8XPBfEeMOmH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div>
            </div>
            <div className="flex items-end justify-end">
              <FormRadix.Submit asChild>
                <button disabled={isSubmitting} className="mt-4 flex items-center justify-center gap-2 rounded-md bg-green-700 px-6 py-2 font-semibold tracking-wider text-gray-200 duration-300 hover:brightness-110">
                  Salvar
                </button>
              </FormRadix.Submit>
            </div>
          </FormRadix.Root>
        </FormProvider>
      </div>
    </main>
  );
}
