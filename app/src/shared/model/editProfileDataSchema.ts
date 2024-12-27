import { z } from "zod";

export const EditProfileFormDataSchema = z.object({
  fullName: z.string().min(1, "Введите имя").optional(),
  weight: z
    .string()
    .transform((val) => (val === "" ? NaN : Number(val)))
    .refine((val) => !isNaN(val), "Значение должно быть числом")
    .refine((val) => val >= 0, "Некорректное значение")
    .optional(),
  height: z
    .string()
    .optional()
    .transform((val) => (val === "" ? NaN : Number(val)))
    .refine((val) => !isNaN(val), "Значение должно быть числом")
    .refine((val) => val >= 0, "Некорректное значение"),
  email: z
    .string()
    .min(1, "Введите e-mail")
    .email("Некорректный e-mail")
    .optional(),
  password: z
    .string()
    .min(8, "Пароль должен содержать не менее 8 символов")
    .max(20, "Пароль не должен превышать 20 символов")
    .regex(
      /(?=.*[a-z])/,
      "Пароль должен содержать как минимум одну букву в нижнем регистре"
    )
    .regex(
      /(?=.*[A-Z])/,
      "Пароль должен содержать как минимум одну букву в верхнем регистре"
    )
    .regex(/(?=.*\d)/, "Пароль должен содержать как минимум одну цифру")
    .regex(
      /(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/,
      "Пароль должен содержать как минимум один спецсимвол"
    )
    .optional(),
});
