import { z } from 'zod'

export const createAdminSchema = z.object({
	first_name: z.string().min(2, {
		message: "Введіть ім'я"
	}),
	last_name: z.string().min(2, {
		message: 'Введіть прізвище'
	}),
	email: z.string().email({
		message: 'Введіть валідний email'
	}),
	password: z.string().min(6, {
		message: 'Введіть валідний пароль'
	}),
	role: z.enum(['ADMIN', 'OBSERVER'], {
		message: 'Виберіть роль'
	}),
	phones: z.array(
		z.string().regex(/^\+\d{2} \d{4} \d{6}$/, 'Введіть валідний номер телефону')
	),
	description: z.string().optional()
})
export type CreateAdminValues = z.infer<typeof createAdminSchema>
