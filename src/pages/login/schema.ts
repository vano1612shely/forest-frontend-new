import { z } from "zod";
export const loginSchema = z.object({
  email: z.string().email({
    message: "Введіть валідний email",
  }),
  password: z.string().min(6, {
    message: "Введіть валідний пароль",
  }),
});
export type LoginValues = z.infer<typeof loginSchema>;
