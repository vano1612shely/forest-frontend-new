import { z } from 'zod'

export const createMinimumTransportationSchema = z.object({
	species: z
		.string({ message: 'Виберіть породу' })
		.uuid({ message: 'Виберіть породу' }),
	assortment: z
		.string({ message: 'Виберіть сортимент' })
		.uuid({ message: 'Виберіть сортимент' }),
	minimal_transport_part: z.number({
		message: 'Введіть МТП'
	})
})
export type CreateMinimumTransportationValues = z.infer<
	typeof createMinimumTransportationSchema
>
