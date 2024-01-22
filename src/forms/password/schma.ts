import { z } from "zod";

export const RegisterPasswordSchema = z
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

export type IRegisterPassword = z.infer<typeof RegisterPasswordSchema>;
