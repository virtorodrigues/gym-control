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

/**
 *   level: z
    .enum(["level-beginner", "level-pro", "unchecked"], {
      required_error: "Selecione seu nível em programação",
      invalid_type_error: "Selecione seu nível em programação",
    })
    .refine((val) => val !== "unchecked", {
      message: "Selecione seu nível em programação",
    }),
  useTerms: z
    .boolean({
      required_error: "Concorde com os termos e políticas de privacidade",
      invalid_type_error: "Concorde com os termos e políticas de privacidade",
    })
    .refine((val) => val === true, {
      message: "Concorde com os termos e políticas de privacidade",
    }),
 */