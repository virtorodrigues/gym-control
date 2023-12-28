import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Insira um email válido" })
    .email("Insira um email válido")
    .transform((val) => val.toLowerCase()),
  password: z.string().min(8, { message: "Insira uma senha válida" }),
});

export type ILogin = z.infer<typeof LoginSchema>;
