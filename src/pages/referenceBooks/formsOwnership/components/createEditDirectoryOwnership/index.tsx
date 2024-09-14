import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Pencil, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
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

import {
	createDirectoryOwnership,
	directoryOwnershipOptions,
	updateDirectoryOwnership
} from '@/api/referenceBooks'

import {
	CreateDirectoryOwnershipValues,
	createDirectoryOwnershipSchema
} from '@/pages/referenceBooks/formsOwnership/components/createEditDirectoryOwnership/schema.ts'

export const CreateEditDirectoryOwnership = ({
	id,
	defaultValues = {
		title: {
			en: '',
			ua: ''
		},
		description: {
			en: '',
			ua: ''
		}
	}
}: {
	id?: string
	defaultValues?: any
}) => {
	const [open, setOpen] = useState(false)
	const queryClient = useQueryClient()
	const { mutate: create } = useMutation({
		mutationKey: ['createDirectoryOwnership'],
		mutationFn: (values: CreateDirectoryOwnershipValues) =>
			createDirectoryOwnership(values),
		onError: error => {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data.message || error.message)
			}
		},
		onSuccess: () => {
			setOpen(false)
			queryClient.refetchQueries(directoryOwnershipOptions())
			toast.success('Форма власності успішно створена')
		}
	})
	const { mutate: update } = useMutation({
		mutationKey: ['updateDirectoryOwnership'],
		mutationFn: (values: CreateDirectoryOwnershipValues) =>
			updateDirectoryOwnership({ id: id as string, ...values }),
		onError: error => {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data.message || error.message)
			}
		},
		onSuccess: () => {
			setOpen(false)
			queryClient.refetchQueries(directoryOwnershipOptions())
			toast.success('Форма власності успішно оновлена')
		}
	})
	const form = useForm<CreateDirectoryOwnershipValues>({
		resolver: zodResolver(createDirectoryOwnershipSchema),
		defaultValues: defaultValues
	})
	useEffect(() => {
		if (!open) {
			form.reset()
		}
	}, [open])
	const onSubmit = (values: CreateDirectoryOwnershipValues) => {
		if (id) {
			update(values)
		} else {
			create(values)
		}
	}
	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogTrigger asChild>
				{id ? (
					<Button>
						<span className='sr-only'>Редагувати</span>
						<Pencil className='w-4 h-4' />
					</Button>
				) : (
					<Button className='flex items-center gap-2'>
						Додати <Plus />
					</Button>
				)}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Додати форму власності</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='grid gap-5'
					>
						<FormField
							control={form.control}
							name='title.ua'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Назва українською</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Введіть назву'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='description.ua'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Опис українською</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Введіть опис'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='title.en'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Назва англійською</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Введіть назву'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='description.en'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Опис англійською</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Введіть опис'
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
