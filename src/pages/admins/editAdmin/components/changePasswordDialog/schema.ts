import { z } from 'zod'

export const updatePasswordAdminSchema = z
	.object({
		password: z.string().min(6, {
			message: 'Введіть валідний пароль'
		}),
		confirm_password: z.string().min(6, {
			message: 'Введіть валідний пароль'
		})
	})
	.refine(data => data.password === data.confirm_password, {
		message: 'Паролі не збігаються',
		path: ['confirm_password'] // Місце, де буде виводитися помилка
	})

export type UpdatePasswordAdminValues = z.infer<
	typeof updatePasswordAdminSchema
>
