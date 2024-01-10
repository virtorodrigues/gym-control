import { z } from "zod";

export const StudentRegisterSchema = z.object({
  name: z.string().min(1, { message: "Insira um nome válido" }),
  email: z
    .string()
    .min(3, { message: "Insira um email válido" })
    .email("Insira um email válido")
    .transform((val) => val.toLowerCase()),
  birthday: z
    .string()
    .min(1, { message: "Insira a data de nascimento válida" }),
  document: z.string().min(1, { message: "Insira um documento válido" }),
  cel: z.string().min(1, { message: "Insira um celular válido" }),
});

export type IStudentRegister = z.infer<typeof StudentRegisterSchema>;
