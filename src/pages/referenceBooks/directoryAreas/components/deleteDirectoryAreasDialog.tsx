import { useMutation, useQueryClient } from '@tanstack/react-query'
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

import { deleteRegion, regionsOptions } from '@/api/referenceBooks'

export const DeleteDirectoryAreasDialog = ({ id }: { id: string }) => {
	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationKey: ['deleteRegion'],
		mutationFn: () => deleteRegion(id),
		onSuccess: () => {
			queryClient.refetchQueries(regionsOptions())
			toast.success('Регіон успішно видалений')
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
