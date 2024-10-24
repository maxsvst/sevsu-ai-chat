import { z } from "zod";

export const LoginFormDataSchema = z.object({
  username: z.string().min(1, "Введите имя"),
  password: z
    .string()
    .min(8, "Длина пароля должна быть от 8 символов")
    .max(20, "Длина пароля должна быть до 20 символов"),
});
