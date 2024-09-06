import { z } from "zod";
export const createAdminSchema = z.object({
  first_name: z.string().min(2, {
    message: "Введіть ім'я",
  }),
  second_name: z.string().min(2, {
    message: "Введіть прізвище",
  }),
  email: z.string().email({
    message: "Введіть валідний email",
  }),
  password: z.string().min(6, {
    message: "Введіть валідний пароль",
  }),
  role: z.enum(["ADMIN", "OBSERVER"]),
  phones: z.array(
    z.object({
      phone: z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, "Введіть валідний номер телефону"),
    }),
  ),
  description: z.string().optional(),
});
export type CreateAdminValues = z.infer<typeof createAdminSchema>;
