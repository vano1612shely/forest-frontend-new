import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import axios from 'axios'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button.tsx'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog.tsx'

import { deleteAdmin } from '@/api/admin'
import { AdminDetails } from '@/api/admin/types.ts'

export const DeleteAdminDialog = ({ data }: { data: AdminDetails }) => {
	const navigate = useNavigate()
	const { mutate } = useMutation({
		mutationKey: ['deleteAdmin', data.id],
		mutationFn: () => deleteAdmin(data.id),
		onError: error => {
			if (axios.isAxiosError(error)) {
				toast.error(error?.response?.data?.message || error.message)
			}
		},
		onSuccess: () => {
			toast.success('Користувач успішно видалений')
			navigate({ to: '/adminList' })
		}
	})
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Видалити</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Підтвердіть дію</DialogTitle>
					<DialogDescription>
						Ви хочите видалити адміністратора {data.first_name} {data.last_name}{' '}
						?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button
							variant='outline'
							type='button'
						>
							Відмінити
						</Button>
					</DialogClose>
					<Button onClick={() => mutate()}>Видалити</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
