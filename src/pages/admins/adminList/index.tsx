import { useQuery } from '@tanstack/react-query'
import { Link, useRouter, useSearch } from '@tanstack/react-router'
import { Row, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import { useEffect } from 'react'

import { ColumnVisibility } from '@/components/columnVisibility.tsx'
import { LimitSelector } from '@/components/limitSelector.tsx'
import { ListPagination } from '@/components/pagination.tsx'
import { StandartTable } from '@/components/standartTable.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Card } from '@/components/ui/card.tsx'
import { Skeleton } from '@/components/ui/skeleton.tsx'

import { adminListQueryOptions } from '@/api/admin'

import { columns } from '@/pages/admins/adminList/columns.tsx'
import { AdminFilters } from '@/pages/admins/adminList/filters.tsx'

export const AdminListPage = () => {
	const search = useSearch({ strict: false }) as any
	const { navigate } = useRouter()
	const { data, refetch, isLoading } = useQuery(
		adminListQueryOptions({
			limit: search.limit || 300,
			page: search.page,
			filters: [{ status: search.status, is_deleted: 0 }],
			search: search.search
		})
	)
	const table = useReactTable({
		columns,
		data: data?.result.result || [],
		getCoreRowModel: getCoreRowModel()
	})
	const setPage = (page: number) => {
		navigate({
			search: {
				...search,
				page: page
			}
		})
	}
	useEffect(() => {
		refetch()
	}, [search])
	return (
		<>
			<div className='page__container'>
				<Card className='page__table-card'>
					<div className='page__table-header'>
						<h1 className='page__title'>Управління адміністраторами</h1>
						<Link to='/admins/create'>
							<Button className='flex items-center gap-2'>
								Створити Адміністратора <Plus />
							</Button>
						</Link>
					</div>
					{isLoading && <Skeleton className='w-full h-[600px]' />}
					{data && (
						<StandartTable
							table={table}
							columns={columns}
							rowOnClick={(row: Row<any>) =>
								navigate({ to: `/admins/${row.original.id}` })
							}
						/>
					)}
					<div className='page__table-pagination'>
						{isLoading && <Skeleton className='w-[300px] h-[50px]' />}
						{data && (
							<>
								<div className='flex'>
									<ListPagination
										current_page={data.result.current_page}
										last_page={data.result.last_page}
										setPage={setPage}
									/>
								</div>
								<div className='flex gap-5 items-center'>
									<ColumnVisibility table={table} />
									<LimitSelector
										value={search.limit || data.result.per_page}
										setValue={value =>
											navigate({
												search: { ...search, limit: value }
											})
										}
									/>
								</div>
							</>
						)}
					</div>
				</Card>
				<Card className='page__filter-card'>
					<AdminFilters />
				</Card>
			</div>
		</>
	)
}
