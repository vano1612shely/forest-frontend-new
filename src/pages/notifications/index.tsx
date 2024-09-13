import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearch } from '@tanstack/react-router'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { ColumnVisibility } from '@/components/columnVisibility.tsx'
import { LimitSelector } from '@/components/limitSelector.tsx'
import { ListPagination } from '@/components/pagination.tsx'
import { StandartTable } from '@/components/standartTable.tsx'
import { Card } from '@/components/ui/card.tsx'
import { Skeleton } from '@/components/ui/skeleton.tsx'

import { notificationPageOptions } from '@/api/notifications'

import { columns } from '@/pages/notifications/columns.tsx'

export const NotificationsPage = () => {
	const { page, limit } = useSearch({ strict: false }) as any
	const { navigate } = useRouter()
	const { data, isLoading } = useQuery(
		notificationPageOptions({
			page: page,
			to_read: true,
			limit: limit || 100
		})
	)
	const setPage = (page: number) => {
		navigate({
			search: {
				page: page,
				limit
			}
		})
	}
	const table = useReactTable({
		data: data?.result.result || [],
		columns,
		getCoreRowModel: getCoreRowModel()
	})
	return (
		<div className='page__container'>
			<Card className='page__table-card-full-size'>
				<div className='page__table-header'>
					<h1 className='page__title'>Сповіщення</h1>
				</div>
				{isLoading && <Skeleton className='w-full h-[600px]' />}
				{data && (
					<StandartTable
						table={table}
						columns={columns}
					/>
				)}
				<div className='page__table-pagination'>
					{isLoading && <Skeleton className='w-[300px] h-[50px]' />}
					{data && (
						<>
							<div className='flex'>
								<ListPagination
									last_page={data.result.last_page}
									current_page={data.result.current_page}
									setPage={setPage}
								/>
							</div>
							<div className='flex gap-5 items-center'>
								<ColumnVisibility table={table} />
								<LimitSelector
									value={limit || data.result.per_page}
									setValue={value =>
										navigate({ search: { limit: value, page } })
									}
								/>
							</div>
						</>
					)}
				</div>
			</Card>
		</div>
	)
}
