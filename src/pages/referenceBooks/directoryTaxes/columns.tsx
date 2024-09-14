import { ColumnDef } from '@tanstack/react-table'

import { IDirectoryTaxes } from '@/api/referenceBooks/types.tsx'

import { findTitleByLang } from '@/lib/utils.ts'
import { CreateEditDirectoryTaxes } from '@/pages/referenceBooks/directoryTaxes/components/createEditDirectoryTaxes'
import { DeleteDirectoryTaxesDialog } from '@/pages/referenceBooks/directoryTaxes/components/deleteDirectoryTaxesDialog.tsx'

export const columns: ColumnDef<IDirectoryTaxes>[] = [
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
		accessorKey: 'tax_percent',
		header: 'Відсоток',
		cell: ({ row }) => {
			return row.original.tax_percent + '%'
		}
	},
	{
		accessorKey: 'description_ua',
		header: 'Опис українською',
		cell: ({ row }) => {
			let msg: string | undefined = ''
			row.original.title.map(t => {
				if (t.language.lang_key == 'ua') {
					msg = t.description
				}
			})
			return msg
		}
	},
	{
		accessorKey: 'description_en',
		header: 'Опис англійською',
		cell: ({ row }) => {
			let msg: string | undefined = ''
			row.original.title.map(t => {
				if (t.language.lang_key == 'en') {
					msg = t.description
				}
			})
			return msg
		}
	},
	{
		accessorKey: 'actions',
		cell: ({ row }) => {
			const descriptions: {
				ua: string | undefined
				en: string | undefined
			} = {
				ua: '',
				en: ''
			}
			row.original.title.map(t => {
				if (t.language.lang_key == 'en') {
					descriptions.en = t.description
				} else if (t.language.lang_key == 'ua') {
					descriptions.ua = t.description
				}
			})
			const defaultValues = {
				tax_percent: row.original.tax_percent,
				title: {
					ua: findTitleByLang(row.original.title, 'ua'),
					en: findTitleByLang(row.original.title, 'en')
				},
				description: descriptions
			}
			return (
				<div className='flex items-center gap-2'>
					<CreateEditDirectoryTaxes
						id={row.original.id}
						defaultValues={defaultValues}
					/>
					<DeleteDirectoryTaxesDialog id={row.original.id} />
				</div>
			)
		},
		header: 'Дії'
	}
]
