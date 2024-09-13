import {
	Column,
	ColumnDef,
	Row,
	Table as TableProps,
	flexRender
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { CSSProperties, HTMLAttributes, useRef } from 'react'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'

export function getCommonPinningStyles<TData, TValue>(
	column: Column<TData, TValue>
): CSSProperties {
	const isPinned = column.getIsPinned()
	return {
		left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
		right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
		position: isPinned ? 'sticky' : 'relative',
		zIndex: isPinned ? 1 : 0
	}
}
interface StandartTableProps<TData, TValue> {
	table: TableProps<any>
	columns: ColumnDef<TData, TValue>[]
	height?: string
	rowOnClick?: ((row: Row<any> & HTMLAttributes<'tr'>) => void) | null
}
export function StandartTable<TData, TValue>({
	table,
	columns,
	height = '600px',
	rowOnClick = null
}: StandartTableProps<TData, TValue>) {
	const size = table.getTotalSize()
	const { rows } = table.getRowModel()
	const virtualizer = useVirtualizer({
		count: rows.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 35,
		overscan: 5,
		measureElement:
			typeof window !== 'undefined' &&
			navigator.userAgent.indexOf('Firefox') === -1
				? element => element?.getBoundingClientRect().height
				: undefined
	})
	const parentRef = useRef<HTMLDivElement>(null)
	const items = virtualizer.getVirtualItems()
	return (
		<div
			className={`w-full overflow-auto relative`}
			style={{ height: height }}
			ref={parentRef}
		>
			<div>
				<Table className='text-center min-w-full grid table-fixed'>
					<TableHeader
						style={{
							display: 'grid',
							position: 'sticky',
							top: 0,
							zIndex: 1
						}}
					>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow
								key={headerGroup.id}
								style={{ display: 'flex', width: '100%' }}
							>
								{headerGroup.headers.map(header => {
									const { column } = header
									return (
										<TableHead
											style={{
												...getCommonPinningStyles(column),
												display: 'flex',
												...(parentRef.current &&
												size < parentRef.current?.clientWidth
													? { width: 100 / headerGroup.headers.length + '%' }
													: { width: column.getSize() + 'px' }),
												justifyContent: 'center',
												alignItems: 'center'
											}}
											colSpan={header.colSpan}
											key={header.id}
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
					<TableBody
						style={{
							display: 'grid',
							height: `${virtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
							position: 'relative' //needed for absolute positioning of rows
						}}
					>
						{table.getRowModel().rows?.length ? (
							items.map(virtualRow => {
								const row = rows[virtualRow.index]
								return (
									<TableRow
										data-index={virtualRow.index} //needed for dynamic row height measurement
										ref={node => virtualizer.measureElement(node)} //measure dynamic row height
										key={row.id}
										data-state={row.getIsSelected() && 'selected'}
										onClick={() => rowOnClick && rowOnClick(row)}
										style={{
											display: 'flex',
											position: 'absolute',
											transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
											width: '100%'
										}}
										className='cursor-pointer'
									>
										{row.getVisibleCells().map(cell => (
											<TableCell
												key={cell.id}
												style={{
													...getCommonPinningStyles(cell.column),
													display: 'flex',
													...(parentRef.current &&
													size < parentRef.current?.clientWidth
														? {
																width: 100 / row.getVisibleCells().length + '%'
															}
														: { width: cell.column.getSize() + 'px' }),
													justifyContent: 'center',
													alignItems: 'center'
												}}
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								)
							})
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 flex items-center justify-center text-center absolute right-0 left-0 bottom-0 top-0'
								>
									Дані відсутні
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			{/*<ScrollBar orientation='horizontal' />*/}
		</div>
	)
}
