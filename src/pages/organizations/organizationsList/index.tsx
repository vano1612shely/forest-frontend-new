import { useMutation, useQuery } from '@tanstack/react-query'
import { Link, useRouter, useSearch } from '@tanstack/react-router'
import { Row, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import axios from 'axios'
import { Loader2, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { ColumnVisibility } from '@/components/columnVisibility.tsx'
import { LimitSelector } from '@/components/limitSelector.tsx'
import { ListPagination } from '@/components/pagination.tsx'
import { StandartTable } from '@/components/standartTable.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Card } from '@/components/ui/card.tsx'
import { Skeleton } from '@/components/ui/skeleton.tsx'

import {
	organizationListOptions,
	updateOrganizationEodData
} from '@/api/organizations'

import { columns } from '@/pages/organizations/organizationsList/columns.tsx'
import { OrganizationsFilters } from '@/pages/organizations/organizationsList/filters.tsx'

export const OrganizationsListPage = () => {
	const search = useSearch({
		strict: false
	}) as any
	const { navigate } = useRouter()
	const [loadingToast, setLoadingToast] = useState<any>(null)
	const { data, isLoading, refetch } = useQuery(
		organizationListOptions({
			page: search.page,
			search: search.search,
			limit: search.limit || 100,
			filters: [{ is_deleted: 0, usreou: search.usreou, status: search.status }]
		})
	)
	const { mutate, isPending } = useMutation({
		mutationKey: ['updateOrganizationsEodData'],
		mutationFn: updateOrganizationEodData,
		onMutate: () => {
			const t = toast.loading(
				'Це може зайняти деякий час, зачекайте будь ласка'
			)
			setLoadingToast(t)
		},
		onSuccess: () => {
			toast.remove(loadingToast)
			setLoadingToast(null)
			toast.success('Дані по організаціям з ЕОД успішно оновлені')
			refetch()
		},
		onError: error => {
			if (axios.isAxiosError(error)) {
				toast.error(
					error?.response?.data?.message ||
						'Щось пішло не так, спробуйте пізніше'
				)
			}
		}
	})
	const setPage = (page: number) => {
		navigate({
			search: {
				...search,
				page: page
			}
		})
	}
	const table = useReactTable({
		columns,
		data: data?.result.result || [],
		getCoreRowModel: getCoreRowModel(),
		state: {
			columnPinning: {
				left: ['title']
			}
		}
	})
	useEffect(() => {
		refetch()
	}, [search])
	return (
		<>
			<div className='page__container'>
				<Card className='page__table-card'>
					<div className='page__table-header'>
						<h1 className='page__title'>Список організацій</h1>
						<div className='flex items-center gap-5 flex-wrap'>
							<Button
								onClick={() => mutate()}
								disabled={isPending}
								className='flex gap-2 items-center'
							>
								Оновити Дані по Організаціям з ЕОД
								{isPending && <Loader2 className='animate-spin' />}
							</Button>
							<Link to='/organizations/create'>
								<Button className='flex items-center gap-2'>
									Створити Організацію <Plus />
								</Button>
							</Link>
						</div>
					</div>
					{isLoading && <Skeleton className='w-full h-[600px]' />}
					{data && (
						<StandartTable
							table={table}
							columns={columns}
							rowOnClick={(row: Row<any>) =>
								navigate({ to: `/organizations/edit/${row.original.id}` })
							}
						/>
					)}
					<div className='flex pt-5'>
						{isLoading && <Skeleton className='w-[300px] h-[50px]' />}
						{data && (
							<div className='page__table-pagination'>
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
							</div>
						)}
					</div>
				</Card>
				<Card className='page__filter-card'>
					<OrganizationsFilters />
				</Card>
			</div>
		</>
	)
}
