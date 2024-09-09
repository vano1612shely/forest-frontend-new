import { useNavigate } from '@tanstack/react-router'
import {
	Column,
	flexRender,
	getCoreRowModel,
	useReactTable
} from '@tanstack/react-table'
import { CSSProperties } from 'react'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'

import { OrganizationListItem } from '@/api/organizations/types.tsx'

import { columns } from './columns'
import { cn } from '@/lib/utils.ts'

const getCommonPinningStyles = (
	column: Column<OrganizationListItem>
): CSSProperties => {
	const isPinned = column.getIsPinned()
	return {
		left: isPinned === 'left' ? `-1px` : undefined,
		right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
		position: isPinned ? 'sticky' : 'relative',
		width: column.getSize(),
		zIndex: isPinned ? 1 : 0
	}
}
interface DataTableProps {
	data: OrganizationListItem[]
	className?: string
}
export function OrganizationListTable({ data, className }: DataTableProps) {
	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		columnResizeMode: 'onChange'
	})
	const navigate = useNavigate()
	return (
		<div className={cn(className, 'h-[60vh] overflow-x-auto')}>
			<Table className='text-center relative'>
				<TableHeader className='bg-green-600 sticky top-[-1px] z-10'>
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map(header => {
								const { column } = header
								if (
									header.column.id === 'title' &&
									header.column.getIsPinned() !== 'left'
								) {
									header.column.pin('left')
								}
								return (
									<TableHead
										style={{ ...getCommonPinningStyles(column) }}
										key={header.id}
										className='text-white text-center bg-green-600 border'
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map(row => (
							<TableRow
								key={row.id}
								className='cursor-pointer bg-white'
								data-state={row.getIsSelected() && 'selected'}
								onClick={() =>
									navigate({ to: `/organizations/edit/${row.original.id}` })
								}
							>
								{row.getVisibleCells().map(cell => (
									<TableCell
										key={cell.id}
										className='bg-white border'
										style={{ ...getCommonPinningStyles(cell.column) }}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className='h-24 text-center'
							>
								Дані відсутні
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}
