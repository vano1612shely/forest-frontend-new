import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter, useSearch } from '@tanstack/react-router'
import {
	VisibilityState,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable
} from '@tanstack/react-table'
import axios from 'axios'
import { Download, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { ColumnVisibility } from '@/components/columnVisibility.tsx'
import { LimitSelector } from '@/components/limitSelector.tsx'
import { ListPagination } from '@/components/pagination.tsx'
import { StandartTable } from '@/components/standartTable.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Card } from '@/components/ui/card.tsx'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'

import {
	downloadUnsoldLots,
	tradingUnsoldLotsOptions
} from '@/api/trading/unsoldLots'
import { ITradingUnsoldLot } from '@/api/trading/unsoldLots/types.ts'

import { downloadFile } from '@/lib/downloadFile.ts'
import { lumberColumns } from '@/pages/trading/unsoldLost/columnsLumber.tsx'
import { woodColumns } from '@/pages/trading/unsoldLost/columnsWood.tsx'
import { UnsoldLotsFilters } from '@/pages/trading/unsoldLost/filters.tsx'

export type ListType = ITradingUnsoldLot & { is_underLot?: boolean }

export const UnsoldLostPage = () => {
	const [category, setCategory] = useState<'wood' | 'lumber'>('wood')
	const { navigate } = useRouter()
	const search = useSearch({
		strict: false
	}) as any
	const { data, refetch, isLoading, error } = useQuery(
		tradingUnsoldLotsOptions({
			page: search.page,
			limit: search.limit || 100,
			...search,
			category
		})
	)
	const [list, setList] = useState<ListType[]>([])
	const [selectedList, setSelectedList] = useState({})
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [loadingToast, setLoadingToast] = useState<any>(null)
	const { mutate, isPending } = useMutation({
		mutationKey: ['downloadFile'],
		mutationFn: () =>
			downloadUnsoldLots({
				category: category,
				lots_ids: Object.keys(selectedList)
			}),
		onMutate: () => {
			const t = toast.loading(
				'Це може зайняти деякий час, зачекайте будь ласка'
			)
			setLoadingToast(t)
		},
		onSuccess: data => {
			const { file_name, file_base64 } = data.result
			try {
				downloadFile(file_name, file_base64)
				toast.remove(loadingToast)
				setLoadingToast(null)
				toast.success('Файл успішно завантажено')
			} catch {
				toast.error('Не вдалось завантажити файл, спробуйте ще раз')
			}
		},
		onError: error => {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data?.message || error.message)
			}
		}
	})
	useEffect(() => {
		if (axios.isAxiosError(error)) {
			toast.error(error?.response?.data?.message || error.message)
		}
	}, [error])
	useEffect(() => {
		if (data) {
			const newList: ListType[] = []
			data.result.result.map(item => {
				newList.push({ ...item, is_underLot: false })
				if (item.lot_positions.length > 0) {
					item.lot_positions.map(pItem => {
						newList.push({ ...pItem, trading: item.trading, is_underLot: true })
					})
				}
			})
			setList(newList)
		}
	}, [data])
	const table = useReactTable({
		columns: category === 'wood' ? woodColumns : lumberColumns,
		data: list,
		pageCount: data?.result.last_page,
		manualPagination: true,
		getPaginationRowModel: getPaginationRowModel(),
		getCoreRowModel: getCoreRowModel(),
		onRowSelectionChange: setSelectedList,
		onColumnVisibilityChange: setColumnVisibility,
		getRowId: row => row.id,
		state: {
			columnVisibility,
			pagination: {
				pageSize: data?.result.per_page || search.limit || 100,
				pageIndex: data?.result.current_page || search.page || 100
			},
			rowSelection: selectedList,
			columnPinning: {
				left: ['trading', 'id']
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
		table.setPageIndex(page)
	}
	useEffect(() => {
		refetch()
	}, [search])
	useEffect(() => {
		navigate({ search: { limit: search.limit } })
	}, [category])
	return (
		<>
			<Tabs
				defaultValue={category}
				onValueChange={value => {
					setSelectedList({})
					setCategory(value as 'wood' | 'lumber')
				}}
				className='mb-5'
			>
				<TabsList>
					<TabsTrigger value='wood'>Необроблена деревина</TabsTrigger>
					<TabsTrigger value='lumber'>Пиломатеріали</TabsTrigger>
				</TabsList>
			</Tabs>
			<div className='page__container'>
				<Card className='page__table-card'>
					<div className='page__table-header'>
						{isLoading && <Skeleton className='ml-auto w-[250px] h-[40px]' />}
						{data && (
							<Button
								className='flex gap-2 items-center ml-auto'
								onClick={() => mutate()}
								disabled={isPending}
							>
								Скачати список лотів
								{isPending ? (
									<Loader2 className='animate-spin' />
								) : (
									<Download />
								)}
							</Button>
						)}
					</div>
					{isLoading && <Skeleton className='w-full h-[600px]' />}
					{data && (
						<StandartTable
							table={table}
							columns={category === 'wood' ? woodColumns : lumberColumns}
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
											search: {
												...search,
												limit: value
											}
										})
									}
								/>
							</div>
						</div>
					)}
				</Card>
				<Card className='page__filter-card'>
					<UnsoldLotsFilters category={category} />
				</Card>
			</div>
		</>
	)
}
