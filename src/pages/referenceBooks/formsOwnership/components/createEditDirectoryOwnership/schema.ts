import { z } from 'zod'

export const createDirectoryOwnershipSchema = z.object({
	title: z.object({
		en: z.string().min(2, {
			message: 'Введіть назву англійською'
		}),
		ua: z.string().min(2, {
			message: 'Введіть назву українською'
		})
	}),
	description: z.object({
		en: z.string().min(2, {
			message: 'Введіть опис англійською'
		}),
		ua: z.string().min(2, {
			message: 'Введіть опис українською'
		})
	})
})
export type CreateDirectoryOwnershipValues = z.infer<
	typeof createDirectoryOwnershipSchema
>
