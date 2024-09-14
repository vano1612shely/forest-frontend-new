import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import axios from 'axios'
import { Trash } from 'lucide-react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button.tsx'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog.tsx'

import {
	deleteDirectoryMinimumTransportations,
	directoryMinimumTransportationsOptions
} from '@/api/referenceBooks'

export const DeleteMinimumTransportationDialog = ({ id }: { id: string }) => {
	const search = useSearch({
		strict: false
	}) as any
	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationKey: ['deleteMinimumTransportation'],
		mutationFn: () => deleteDirectoryMinimumTransportations(id),
		onSuccess: () => {
			queryClient.refetchQueries(
				directoryMinimumTransportationsOptions({
					page: search.page || 1,
					limit: search.limit || 100
				})
			)
			toast.success('Мінімальний розмір транспортування успішно видалений')
		},
		onError: error => {
			if (axios.isAxiosError(error)) {
				toast.error(error?.response?.data?.message || error.message)
			}
		}
	})
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='destructive'>
					<span className='sr-only'>Видалити</span>
					<Trash className='w-4 h-4' />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Будь ласка, підтвердіть дію!</DialogTitle>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline'>Відмінити</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button onClick={() => mutate()}>Видалити</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
