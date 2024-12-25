import { z } from "zod";

export const RegistrationFormDataSchema = z
  .object({
    name: z.string().min(1, "Введите имя"),
    weight: z
      .string()
      .transform(Number)
      .refine((val) => !isNaN(val), "Значение должно быть числом")
      .refine((val) => val >= 0, "Некорректное значение"),
    height: z
      .string()
      .transform(Number)
      .refine((val) => !isNaN(val), "Значение должно быть числом")
      .refine((val) => val >= 0, "Некорректное значение"),
    email: z.string().min(1, "Введите e-mail").email("Некорректный e-mail"),
    password: z
      .string()
      .min(8, "Длина пароля должна быть от 8 символов")
      .max(20, "Длина пароля должна быть до 20 символов"),
    confirmPassword: z
      .string()
      .min(8, "Длина пароля должна быть от 8 символов")
      .max(20, "Длина пароля должна быть до 20 символов"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли должны совпадать",
    path: ["confirmPassword"],
  });
