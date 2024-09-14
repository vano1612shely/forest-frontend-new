import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter, useSearch } from '@tanstack/react-router'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { ColumnVisibility } from '@/components/columnVisibility.tsx'
import { LimitSelector } from '@/components/limitSelector.tsx'
import { ListPagination } from '@/components/pagination.tsx'
import { StandartTable } from '@/components/standartTable.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Card } from '@/components/ui/card.tsx'
import { Skeleton } from '@/components/ui/skeleton.tsx'

import { regionsOptions, updateRegionsFromEOD } from '@/api/referenceBooks'

import { columns } from '@/pages/referenceBooks/directoryAreas/columns.tsx'
import { CreateEditRegionDialog } from '@/pages/referenceBooks/directoryAreas/components/createEditRegionDialog'
import { ReferenceBookNavigation } from '@/pages/referenceBooks/referenceBooksNavigation.tsx'

export const DirectoryAreasBookPage = () => {
	const { navigate } = useRouter()
	const search = useSearch({
		strict: false
	}) as any
	const { data, isLoading } = useQuery(regionsOptions())
	const [loadingToast, setLoadingToast] = useState<any>(null)
	const { mutate, isPending } = useMutation({
		mutationKey: ['updateRegionsFromEod'],
		mutationFn: () => updateRegionsFromEOD(),
		onMutate: () => {
			const t = toast.loading(
				'Це може зайняти деякий час, зачекайте будь ласка'
			)
			setLoadingToast(t)
		},
		onError: error => {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data?.message || error.message)
			}
		},
		onSuccess: () => {
			toast.remove(loadingToast)
			setLoadingToast(null)
			toast.success('Данні по регіонам України з ЕОД оновлені.')
		}
	})
	const table = useReactTable({
		data: data?.result.result || [],
		columns,
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
	return (
		<div>
			<ReferenceBookNavigation current_page={'directoryAreas'} />
			<Card className='page__table-card-full-size'>
				<div className='page__table-header'>
					<h1 className='page__title'>Довідник областей</h1>
					<div className='flex gap-2 items-center'>
						<Button
							className='flex items-center gap-2'
							disabled={isPending}
							onClick={() => mutate()}
						>
							Оновити дані по регіонам України з ЕОД
							{isPending && <Loader2 className='animate-spin' />}
						</Button>
						<CreateEditRegionDialog />
					</div>
				</div>
				{isLoading && <Skeleton className='w-full h-[600px]' />}
				{data && (
					<StandartTable
						table={table}
						columns={columns}
					/>
				)}
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
			</Card>
		</div>
	)
}
