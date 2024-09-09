import { useNavigate } from '@tanstack/react-router'
import {
	flexRender,
	getCoreRowModel,
	useReactTable
} from '@tanstack/react-table'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'

import { Admin } from '@/api/admin/types.ts'

import { columns } from './columns'
import { cn } from '@/lib/utils.ts'

interface DataTableProps {
	data: Admin[]
	className?: string
}
export function AdminListTable({ data, className }: DataTableProps) {
	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel()
	})
	const navigate = useNavigate()
	return (
		<div className={cn(className, 'h-[60vh] overflow-auto')}>
			<Table className='text-center'>
				<TableHeader className='bg-green-600 sticky top-0'>
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map(header => {
								return (
									<TableHead
										key={header.id}
										className='border text-white text-center'
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
								className='cursor-pointer'
								data-state={row.getIsSelected() && 'selected'}
								onClick={() =>
									navigate({ to: `/editAdmin/${row.original.id}` })
								}
							>
								{row.getVisibleCells().map(cell => (
									<TableCell
										key={cell.id}
										className='border'
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
