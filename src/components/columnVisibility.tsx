import { Table as TableProps } from '@tanstack/react-table'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button.tsx'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx'

export const ColumnVisibility = ({ table }: { table: TableProps<any> }) => {
	const [open, setOpen] = useState(false)
	return (
		<DropdownMenu
			open={open}
			onOpenChange={setOpen}
		>
			<DropdownMenuTrigger asChild>
				<Button
					className='flex items-center gap-2 text-foreground'
					variant='outline'
				>
					Колонки <ChevronDownIcon className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				{table
					.getAllColumns()
					.filter(column => column.getCanHide())
					.map(column => {
						return (
							<DropdownMenuCheckboxItem
								key={column.id}
								className='capitalize'
								checked={column.getIsVisible()}
								onCheckedChange={value => {
									column.toggleVisibility(!!value)
								}}
								onSelect={event => event.preventDefault()}
							>
								{typeof column.columnDef.header === 'string'
									? column.columnDef.header
									: column.id}
							</DropdownMenuCheckboxItem>
						)
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
