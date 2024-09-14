import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearch } from '@tanstack/react-router'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Upload } from 'lucide-react'

import { ColumnVisibility } from '@/components/columnVisibility.tsx'
import { LimitSelector } from '@/components/limitSelector.tsx'
import { ListPagination } from '@/components/pagination.tsx'
import { StandartTable } from '@/components/standartTable.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Card } from '@/components/ui/card.tsx'
import { Skeleton } from '@/components/ui/skeleton.tsx'

import { directoryMinimumTransportationsOptions } from '@/api/referenceBooks'

import { columns } from '@/pages/referenceBooks/directoryMinimumTransportation/columns.tsx'
import { CreateEditMinimumTransportation } from '@/pages/referenceBooks/directoryMinimumTransportation/components/createEditMinimumTransportation'
import { ReferenceBookNavigation } from '@/pages/referenceBooks/referenceBooksNavigation.tsx'

export const DirectoryMinimumTransportationPage = () => {
	const { navigate } = useRouter()
	const search = useSearch({
		strict: false
	}) as any
	const { data, isLoading } = useQuery(
		directoryMinimumTransportationsOptions({
			page: search.page || 1,
			limit: search.limit || 100
		})
	)
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
			<ReferenceBookNavigation
				current_page={'directoryMinimumTransportation'}
			/>
			<Card className='page__table-card-full-size'>
				<div className='page__table-header'>
					<h1 className='page__title'>Мінімальний розмір транспортування</h1>
					<div className='flex gap-2 items-center'>
						<Button className='flex gap-2 items-center'>
							Завантажити дані
							<Upload />
						</Button>
						<CreateEditMinimumTransportation />
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
