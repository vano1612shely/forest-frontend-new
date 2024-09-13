import { z } from 'zod'

export const loginSchema = z.object({
	email: z.string().email({
		message: 'Введіть валідний email'
	}),
	password: z.string().min(6, {
		message: 'Введіть валідний пароль'
	}),
	signature_serial: z.string()
})
export type LoginValues = z.infer<typeof loginSchema>
