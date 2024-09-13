import { Link } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table'
import dayjs, { Dayjs } from 'dayjs'

import { useAuthStore } from '@/store/auth.store.ts'

import { OrganizationListItem } from '@/api/organizations/types.tsx'

import { findTitleByLang } from '@/lib/utils.ts'

const lang = useAuthStore.getState().lang_key
export const columns: ColumnDef<OrganizationListItem>[] = [
	{
		accessorKey: 'title',
		header: 'Найменування',
		cell: ({ row }) => {
			return (
				<Link to={`/organizations/edit/${row.original.id}`}>
					{findTitleByLang(row.original.title, lang)}
				</Link>
			)
		},
		size: 200
	},
	{
		accessorKey: 'eod_data',
		header: 'Назва в ЕОД',
		cell: ({ row }) => {
			if (row.original.eod_data)
				return findTitleByLang(row.original.eod_data.title_from_eod, lang)
		}
	},
	{
		accessorKey: 'ownership',
		header: 'Форма власності',
		cell: ({ row }) => {
			if (row.original.ownership)
				return findTitleByLang(row.original?.ownership.title, lang)
			return 'колективна'
		}
	},
	{
		accessorKey: 'categories',
		header: 'Категорія',
		cell: ({ row }) => {
			return (
				<ul>
					{row.original.categories.map(category => {
						if (
							!category.type ||
							category.type === 'TYPE_LUMBER' ||
							category.type === 'TYPE_WOOD'
						)
							return (
								<li key={category.id}>
									{findTitleByLang(category.title, lang)}
								</li>
							)
					})}
				</ul>
			)
		}
	},
	{
		accessorKey: 'status',
		header: 'Акредитація',
		cell: ({ row }) => {
			return row.original.status === 'STATUS_ACTIVE'
				? 'Акредитований'
				: 'Не акредитований'
		}
	},
	{
		accessorKey: 'legal_address',
		header: 'Місто',
		cell: ({ row }) => {
			return row.original.legal_address?.city_title || ''
		}
	},
	{
		accessorKey: 'customers',
		header: 'Остання активність',
		cell: ({ row }) => {
			let lastDate: Dayjs | null = null
			row.original.customers.map(customer => {
				if (customer.date_last_activity_at) {
					if (!lastDate) lastDate = dayjs(customer.date_last_activity_at)
					else if (lastDate < dayjs(customer.date_last_activity_at)) {
						lastDate = dayjs(customer.date_last_activity_at)
					}
				}
			})
			if (!lastDate) {
				return 'Немає даних'
			}
			return dayjs(lastDate).format('DD.MM.YYYY HH:mm')
		}
	},
	{
		accessorKey: 'usreou',
		header: 'ЄДРПОУ'
	},
	{
		accessorKey: 'contact_infos',
		header: 'Контактна особа',
		cell: ({ row }) => {
			return row.original.contact_infos[0].phone
		}
	},
	{
		accessorKey: 'value_added_tax',
		header: 'Гарантійний внесок покупця',
		cell: ({ row }) => {
			if (row.original.value_added_tax)
				return new Intl.NumberFormat('uk-UA', {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
					useGrouping: true
				}).format(row.original.value_added_tax)
		}
	},
	{
		accessorKey: 'value_owner_added_tax',
		header: 'Гарантійний внесок продавця',
		cell: ({ row }) => {
			if (row.original.value_owner_added_tax)
				return new Intl.NumberFormat('uk-UA', {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
					useGrouping: true
				}).format(row.original.value_owner_added_tax)
		}
	}
]
