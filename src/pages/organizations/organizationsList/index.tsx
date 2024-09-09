import { Add } from '@mui/icons-material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Link, useRouter, useSearch } from '@tanstack/react-router'
import axios from 'axios'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { ListPagination } from '@/components/pagination.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Card } from '@/components/ui/card.tsx'
import { Skeleton } from '@/components/ui/skeleton.tsx'

import {
	organizationListOptions,
	updateOrganizationEodData
} from '@/api/organizations'

import { OrganizationsFilters } from '@/pages/organizations/organizationsList/filters.tsx'
import { OrganizationListTable } from '@/pages/organizations/organizationsList/table/data-table.tsx'

export const OrganizationsListPage = () => {
	const { page, search, limit, usreou, status } = useSearch({
		strict: false
	}) as any
	const [loadToast, setLoadToast] = useState<any>(null)
	const { navigate } = useRouter()
	const { data, isLoading, refetch } = useQuery(
		organizationListOptions({
			page: page,
			search: search,
			limit: limit || 500,
			filters: [{ is_deleted: 0, usreou: usreou, status: status }]
		})
	)
	const { mutate, isPending } = useMutation({
		mutationKey: ['updateOrganizationsEodData'],
		mutationFn: updateOrganizationEodData,
		onMutate: () => {
			const t = toast.loading(
				'Це може зайняти деякий час, зачекайте будь ласка'
			)
			setLoadToast(t)
		},
		onSuccess: () => {
			toast.remove(loadToast)
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
				page: page
			}
		})
	}

	useEffect(() => {
		refetch()
	}, [search, usreou, status])
	return (
		<>
			<h1 className='pageTitle'>Список організацій</h1>
			<div className='flex flex-col xl:flex-row gap-5 items-start max-w-[100vw]'>
				<Card className='p-5 order-1 xl:order-0 xl:basis-5/6 self-stretch max-w-full xl:max-w-[80%]'>
					<div className='flex justify-between mb-5'>
						<div>
							{isLoading && <Skeleton className='w-[300px] h-[50px]' />}
							{data && (
								<ListPagination
									current_page={data.result.current_page}
									last_page={data.result.last_page}
									setPage={setPage}
								/>
							)}
						</div>
						<div className='flex items-center gap-5 flex-wrap'>
							<Button
								onClick={() => mutate()}
								disabled={isPending}
							>
								Оновити Дані по Організаціям з ЕОД
							</Button>
							<Link to='/organizations/create'>
								<Button className='flex items-center gap-2'>
									Створити Організацію <Add />
								</Button>
							</Link>
						</div>
					</div>
					{isLoading && <Skeleton className='w-full h-[60vh]' />}
					{data && <OrganizationListTable data={data.result.result} />}
				</Card>
				<Card className='order-0 self-stretch xl:self-auto xl:order-1 flex-1 p-5'>
					<OrganizationsFilters
						submitFilters={filters => {
							const searchParams = _.mapValues(filters, value => {
								if (value) return value.toString()
							})
							navigate({
								search: searchParams
							})
						}}
					/>
				</Card>
			</div>
		</>
	)
}
