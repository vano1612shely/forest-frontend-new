import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox.tsx'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip.tsx'

import { useAuthStore } from '@/store/auth.store.ts'

import { findTitleByLang } from '@/lib/utils.ts'
import { ListType } from '@/pages/trading/unsoldLost/index.tsx'

const lang = useAuthStore.getState().lang_key
export const lumberColumns: ColumnDef<ListType>[] = [
	{
		accessorKey: 'trading',
		header: 'Номер аукціону',
		cell: ({ row }) => {
			return row.original.trading.number
		},
		footer: props => props.column.id,
		size: 84,
		minSize: 70
	},
	{
		accessorKey: 'id',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
				size='w-5 h-5'
			/>
		),
		cell: ({ row }) => {
			if (!row.original.is_underLot)
				return (
					<Checkbox
						checked={row.getIsSelected()}
						onCheckedChange={value => row.toggleSelected(!!value)}
						aria-label='Select row'
						size='w-5 h-5'
					/>
				)
		},
		size: 70
	},
	{
		accessorKey: 'name',
		header: 'Найменування номенклатури',
		cell: ({ row }) => {
			const name = row.original.name
			return name.length > 50 ? (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>{name.slice(0, 50)}...</TooltipTrigger>
						<TooltipContent>{name}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			) : (
				name
			)
		}
	},
	{
		accessorKey: 'measure',
		header: 'Од. вим.',
		cell: ({ row }) => {
			if (row.original.measure) {
				return findTitleByLang(row.original.measure.title, lang)
			}
		}
	},
	{
		accessorKey: 'quantity',
		header: 'Кількість'
	},
	{
		accessorKey: 'description',
		header: 'Опис',
		cell: ({ row }) => {
			const desc = row.original.description
			return desc && desc.length > 150 ? (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>{desc.slice(0, 150)}...</TooltipTrigger>
						<TooltipContent className='w-[300px]'>{desc}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			) : (
				desc
			)
		},
		size: 300
	},
	{ accessorKey: 'number', header: '№ лота' },
	{ accessorKey: 'number_position', header: '№ п/лота' },
	{ accessorKey: 'assortment', header: 'Назва позиції' },
	{ accessorKey: 'species', header: 'Порода' },
	{
		accessorKey: 'humidity',
		header: 'Вологість',
		cell: ({ row }) => {
			return row.original.humidity
		}
	},
	{ accessorKey: 'quality_class', header: 'Гатунок' },
	{ accessorKey: 'width', header: 'Ширина(мм)' },
	{ accessorKey: 'height', header: 'Висота(мм)' },
	{ accessorKey: 'length', header: 'Довжина' },
	{ accessorKey: 'warehouse', header: 'Місце поставки' },
	{ accessorKey: 'delivery_terms', header: 'Умови постачання' },
	{
		accessorKey: 'volume',
		header: "Об'єм",
		cell: ({ row }) => {
			if (row.original.volume) {
				return new Intl.NumberFormat('uk-UA', {
					minimumFractionDigits: 3,
					maximumFractionDigits: 3,
					useGrouping: true
				}).format(row.original.volume / 1000)
			}
		}
	},
	{
		accessorKey: 'price_in_cents',
		header: 'Початкова ціна (за одиницю) без ПДВ',
		cell: ({ row }) => {
			if (row.original.price_in_cents) {
				return new Intl.NumberFormat('uk-UA', {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
					useGrouping: true
				}).format(row.original.price_in_cents / 100)
			}
		},
		size: 180
	},
	{
		accessorKey: 'cost_in_cents',
		header: 'Початкова вартість (лот) без ПДВ',
		cell: ({ row }) => {
			if (row.original.number === 2) console.log(row.original)
			if (row.original.cost_in_cents) {
				return new Intl.NumberFormat('uk-UA', {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
					useGrouping: true
				}).format(row.original.cost_in_cents / 1000)
			}
		},
		size: 180
	},
	{
		accessorKey: 'seller',
		header: 'Продавець',
		cell: ({ row }) => {
			const seller = row.original.seller
			return seller.length > 50 ? (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>{seller.slice(0, 50)}...</TooltipTrigger>
						<TooltipContent>{seller}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			) : (
				seller
			)
		}
	}
]
