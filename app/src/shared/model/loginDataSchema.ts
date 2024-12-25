import { z } from "zod";

export const LoginFormDataSchema = z.object({
  email: z.string().email("Неверный e-mail"),
  password: z
    .string()
    .min(8, "Длина пароля должна быть от 8 символов")
    .max(20, "Длина пароля должна быть до 20 символов"),
});
