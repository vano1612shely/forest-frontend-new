import { ColumnDef } from '@tanstack/react-table'
import { Pencil, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button.tsx'

import { ICountry } from '@/api/referenceBooks/types.tsx'

import { findTitleByLang } from '@/lib/utils.ts'

export const columns: ColumnDef<ICountry>[] = [
	{
		accessorKey: 'alpha2_code',
		header: 'Код країни'
	},
	{
		accessorKey: 'is_updated_from_eod',
		header: 'Оновлено за допомогою ЕОД?',
		cell: ({ row }) => {
			return row.original.is_updated_from_eod ? 'Так' : 'Ні'
		}
	},
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
		accessorKey: 'action',
		header: 'Дії',
		cell: () => {
			return (
				<div className='flex items-center gap-2'>
					<Button>
						<span className='sr-only'>Редагувати</span>
						<Pencil className='w-4 h-4' />
					</Button>
					<Button variant='destructive'>
						<span className='sr-only'>Видалити</span>
						<Trash className='w-4 h-4' />
					</Button>
				</div>
			)
		}
	}
]
