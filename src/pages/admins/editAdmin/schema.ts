import { z } from 'zod'

export const updateAdminSchema = z.object({
	first_name: z.string().min(2, {
		message: "Введіть ім'я"
	}),
	last_name: z.string().min(2, {
		message: 'Введіть прізвище'
	}),
	email: z.string().email({
		message: 'Введіть валідний email'
	}),
	phones: z.array(
		z.object({
			phone: z.string({ message: 'Введіть валідний номер телефону' }),
			id: z.string().optional()
		})
	),
	description: z.string().optional()
})
export type UpdateAdminValues = z.infer<typeof updateAdminSchema>
