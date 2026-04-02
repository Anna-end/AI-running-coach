import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(1, "Введите пароль"),
  });

export type LoginFormData = z.infer<typeof LoginSchema>;