import { ColumnDef } from '@tanstack/react-table'

import { IRegion } from '@/api/referenceBooks/types.tsx'

import { findTitleByLang } from '@/lib/utils.ts'
import { CreateEditRegionDialog } from '@/pages/referenceBooks/directoryAreas/components/createEditRegionDialog'
import { DeleteDirectoryAreasDialog } from '@/pages/referenceBooks/directoryAreas/components/deleteDirectoryAreasDialog.tsx'

export const columns: ColumnDef<IRegion>[] = [
	{
		accessorKey: 'ua',
		header: 'Назва українською',
		cell: ({ row }) => {
			return findTitleByLang(row.original.title, 'ua')
		}
	},
	{
		accessorKey: 'en',
		header: 'Назва англійською',
		cell: ({ row }) => {
			return findTitleByLang(row.original.title, 'en')
		}
	},
	{
		accessorKey: 'country',
		header: 'Країна',
		cell: ({ row }) => {
			return (
				findTitleByLang(row.original.country.title, 'ua') +
				` (${findTitleByLang(row.original.country.title, 'en')})`
			)
		}
	},
	{
		accessorKey: 'country_alha2',
		header: 'Код країни',
		cell: ({ row }) => {
			return row.original.country.alpha2_code
		}
	},
	{
		accessorKey: 'actions',
		header: 'Дії',
		cell: ({ row }) => {
			const defaultValues = {
				id_country: row.original.country.id,
				title: {
					ua: findTitleByLang(row.original.title, 'ua'),
					en: findTitleByLang(row.original.title, 'en')
				}
			}
			return (
				<div className='flex items-center gap-2'>
					<CreateEditRegionDialog
						id={row.original.id}
						defaultValues={defaultValues}
					/>
					<DeleteDirectoryAreasDialog id={row.original.id} />
				</div>
			)
		}
	}
]
