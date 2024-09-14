import { z } from 'zod'

export const createDirectoryTaxesSchema = z.object({
	tax_percent: z
		.number({ message: 'Введіть відсоток податку' })
		.min(0, { message: '% податку має бути більше нуля' }),
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
export type CreateDirectoryTaxesValues = z.infer<
	typeof createDirectoryTaxesSchema
>
