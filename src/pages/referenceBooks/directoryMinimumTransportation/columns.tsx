import { ColumnDef } from '@tanstack/react-table'

import { useAuthStore } from '@/store/auth.store.ts'

import { IMinimumTransportationsOptions } from '@/api/referenceBooks/types.tsx'

import { findTitleByLang } from '@/lib/utils.ts'
import { CreateEditMinimumTransportation } from '@/pages/referenceBooks/directoryMinimumTransportation/components/createEditMinimumTransportation'
import { DeleteMinimumTransportationDialog } from '@/pages/referenceBooks/directoryMinimumTransportation/components/deleteMinimumTransportationDialog.tsx'

const lang = useAuthStore.getState().lang_key
export const columns: ColumnDef<IMinimumTransportationsOptions>[] = [
	{
		accessorKey: 'species',
		header: 'Порода',
		cell: ({ row }) => {
			return findTitleByLang(row.original.species.title, lang)
		}
	},
	{
		accessorKey: 'assortment',
		header: 'Сортимент',
		cell: ({ row }) => {
			if (row.original.assortment)
				return findTitleByLang(row.original.assortment.title, lang)
			return '-'
		}
	},
	{
		accessorKey: 'minimal_transport_part',
		header: 'МТП, куб.м.',
		cell: ({ row }) => {
			return new Intl.NumberFormat('uk-UA', {
				minimumFractionDigits: 3,
				maximumFractionDigits: 3,
				useGrouping: true
			}).format(row.original.minimal_transport_part)
		}
	},
	{
		accessorKey: 'is_autofill',
		header: 'Стан створення',
		cell: ({ row }) => {
			return row.original.is_autofill ? 'Автоматично' : 'Адміністратором'
		}
	},
	{
		accessorKey: 'actions',
		header: 'Дії',
		cell: ({ row }) => {
			const defaultValues = {
				species: row.original.species,
				assortment: row.original.assortment,
				minimal_transport_part: row.original.minimal_transport_part
			}
			return (
				<div className='flex items-center gap-2'>
					<CreateEditMinimumTransportation
						id={row.original.id}
						defaultValues={defaultValues}
					/>
					<DeleteMinimumTransportationDialog id={row.original.id} />
				</div>
			)
		}
	}
]
