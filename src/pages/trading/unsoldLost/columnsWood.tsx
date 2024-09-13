import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox.tsx'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip.tsx'

import { ListType } from '@/pages/trading/unsoldLost/index.tsx'

export const woodColumns: ColumnDef<ListType>[] = [
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
		header: 'Назва позиції',
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
	{ accessorKey: 'assortment', header: 'Cортимент' },
	{ accessorKey: 'species', header: 'Порода' },
	{ accessorKey: 'quality_class', header: 'Клас якості' },
	{ accessorKey: 'diameter', header: 'Група діаметрів(см)' },
	{ accessorKey: 'length', header: 'Довжина' },
	{ accessorKey: 'warehouse', header: 'Склад' },
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
		header: 'Ціна (куб.м.)',
		cell: ({ row }) => {
			if (row.original.price_in_cents) {
				return new Intl.NumberFormat('uk-UA', {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
					useGrouping: true
				}).format(row.original.price_in_cents / 100)
			}
		}
	},
	{
		accessorKey: 'cost_in_cents',
		header: 'Вартість (лот)',
		cell: ({ row }) => {
			if (row.original.cost_in_cents) {
				return new Intl.NumberFormat('uk-UA', {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
					useGrouping: true
				}).format(row.original.cost_in_cents / 1000)
			}
		}
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
