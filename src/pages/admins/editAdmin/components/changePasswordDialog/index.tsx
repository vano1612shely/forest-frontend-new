import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
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
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'

import { updateAdmin } from '@/api/admin'
import { AdminDetails, EditAdminRequestBody } from '@/api/admin/types.ts'

import {
	UpdatePasswordAdminValues,
	updatePasswordAdminSchema
} from './schema.ts'

export const ChangePasswordDialog = ({ data }: { data: AdminDetails }) => {
	const [open, setOpen] = useState<boolean>(false)
	const { mutate } = useMutation({
		mutationKey: ['changePassword'],
		mutationFn: (props: EditAdminRequestBody) => updateAdmin(props),
		onError: error => {
			if (axios.isAxiosError(error)) {
				toast.error(error?.response?.data?.message || error.message)
			}
		},
		onSuccess: () => {
			toast.success('Пароль успішно змінено')
			setOpen(false)
		}
	})
	const form = useForm<UpdatePasswordAdminValues>({
		resolver: zodResolver(updatePasswordAdminSchema),
		defaultValues: {
			password: '',
			confirm_password: ''
		}
	})
	const onSubmit = (props: UpdatePasswordAdminValues) => {
		const values: EditAdminRequestBody = {
			id: data.id,
			first_name: data.first_name,
			last_name: data.last_name,
			password: props.password,
			ids_groups: data.security_groups.map(item => item.id)
		}
		mutate(values)
	}
	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogTrigger asChild>
				<Button>Змінити пароль</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Виберіть новий пароль</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='grid gap-5'
					>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Новий пароль</FormLabel>
									<FormControl>
										<Input
											type='password'
											placeholder='Введіть пароль'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='confirm_password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Новий пароль</FormLabel>
									<FormControl>
										<Input
											type='password'
											placeholder='Введіть пароль'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<DialogClose asChild>
								<Button
									variant='outline'
									type='button'
								>
									Відмінити
								</Button>
							</DialogClose>
							<Button>Підтвердити</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
