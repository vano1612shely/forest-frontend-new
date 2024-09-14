import { z } from 'zod'

export const createRegionSchema = z.object({
	id_country: z.string().uuid({ message: 'Виберіть країну' }),
	title: z.object({
		en: z.string().min(2, {
			message: 'Введіть назву англійською'
		}),
		ua: z.string().min(2, {
			message: 'Введіть назву українською'
		})
	})
})
export type CreateRegionValues = z.infer<typeof createRegionSchema>
