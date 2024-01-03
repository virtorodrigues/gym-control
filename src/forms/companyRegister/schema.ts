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
  logo: z.string(),
});

export type ICompanyRegister = z.infer<typeof CompanyRegisterSchema>;

export const CompanyRegisterPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Deve ter no mínimo 8 caracteres" })
      .max(30, { message: "Deve ter no máximo 30 caracteres" })
      .regex(/(?=.*[a-zà-ü]).*$/g, "Deve ter ao menos uma letra minúscula")
      .regex(/(?=.*[A-ZÀ-Ü]).*$/g, "Deve ter ao menos uma letra maiúscula")
      .regex(
        /(?=.*[@!#$%^&*()/?+-]).*$/g,
        "Deve ter ao menos um caractere especial",
      ),
    repeatPassword: z.string(),
  })
  .refine(({ password, repeatPassword }) => password === repeatPassword, {
    message: "As senhas devem ser iguais",
    path: ["repeatPassword"],
  });

export type ICompanyRegisterPassword = z.infer<
  typeof CompanyRegisterPasswordSchema
>;
