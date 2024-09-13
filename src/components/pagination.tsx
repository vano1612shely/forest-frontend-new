import { isNumber } from 'lodash'
import { FC, useState } from 'react'

import { Input } from '@/components/ui/input.tsx'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination.tsx'

import { cn } from '@/lib/utils.ts'

export interface IPaginationProps {
	current_page: number
	last_page: number
	setPage: (page: number) => void
}

export const ListPagination: FC<IPaginationProps> = ({
	current_page,
	last_page,
	setPage
}) => {
	const [goToPage, setGoToPage] = useState(0)
	const generatePagination = () => {
		const pages = []
		const startPage = Math.max(2, current_page - 2)
		const endPage = Math.min(last_page - 1, current_page + 2)

		// First page
		pages.push(
			<PaginationItem key={1}>
				<PaginationLink
					onClick={() => setPage(1)}
					className={cn(current_page === 1 ? 'bg-secondary' : '')}
				>
					1
				</PaginationLink>
			</PaginationItem>
		)

		// Ellipsis if startPage is greater than 2
		if (startPage > 2) {
			pages.push(
				<PaginationItem key='ellipsis-start'>
					<PaginationEllipsis />
				</PaginationItem>
			)
		}

		// Middle pages
		for (let i = startPage; i <= endPage; i++) {
			pages.push(
				<PaginationItem key={i}>
					<PaginationLink
						onClick={() => setPage(i)}
						className={cn(current_page === i ? 'bg-secondary' : '')}
					>
						{i}
					</PaginationLink>
				</PaginationItem>
			)
		}

		// Ellipsis if endPage is less than last_page - 1
		if (endPage < last_page - 1) {
			pages.push(
				<PaginationItem key='ellipsis-end'>
					<PaginationEllipsis />
				</PaginationItem>
			)
		}

		// Last page
		if (last_page > 1) {
			pages.push(
				<PaginationItem key={last_page}>
					<PaginationLink
						onClick={() => setPage(last_page)}
						className={cn(current_page === last_page ? 'bg-secondary' : '')}
					>
						{last_page}
					</PaginationLink>
				</PaginationItem>
			)
		}

		return pages
	}

	return (
		<>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={() => setPage(Math.max(1, current_page - 1))}
						/>
					</PaginationItem>
					{generatePagination()}
					<PaginationItem>
						<PaginationNext
							onClick={() => setPage(Math.min(last_page, current_page + 1))}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
			<Input
				min={1}
				className='w-[70px]'
				type='number'
				placeholder='№'
				onInput={e => {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					if (e.target.valueAsNumber) {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-expect-error
						if (isNumber(e.target.valueAsNumber)) {
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-expect-error
							setGoToPage(Number(e.target.valueAsNumber))
						}
					}
				}}
				onKeyDown={e => {
					if (e.key === 'Enter') {
						if (
							goToPage !== 0 &&
							goToPage !== current_page &&
							goToPage <= last_page
						)
							setPage(Number(goToPage))
					}
				}}
			/>
		</>
	)
}
