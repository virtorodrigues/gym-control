import { z } from "zod";

export const CompanyRegisterSchema = z.object({
  name: z.string().min(1, { message: "Insira um nome válido" }),
  email: z
    .string()
    .min(3, { message: "Insira um email válido" })
    .email("Insira um email válido")
    .transform((val) => val.toLowerCase()),
  cel: z.string().min(1, { message: "Insira um celular válido" }),
  document: z.string().min(1, { message: "Insira um documento válido" }),
});

export type ICompanyRegister = z.infer<typeof CompanyRegisterSchema>;
