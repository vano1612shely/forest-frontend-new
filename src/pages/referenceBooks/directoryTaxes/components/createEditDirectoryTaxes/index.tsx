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
	createDirectoryTaxes,
	directoryTaxesOptions,
	updateDirectoryTaxes
} from '@/api/referenceBooks'

import {
	CreateDirectoryTaxesValues,
	createDirectoryTaxesSchema
} from '@/pages/referenceBooks/directoryTaxes/components/createEditDirectoryTaxes/schema.tsx'

export const CreateEditDirectoryTaxes = ({
	id,
	defaultValues = {
		tax_percent: 0,
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
		mutationKey: ['createDirectoryTaxes'],
		mutationFn: (values: CreateDirectoryTaxesValues) =>
			createDirectoryTaxes(values),
		onError: error => {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data.message || error.message)
			}
		},
		onSuccess: () => {
			setOpen(false)
			queryClient.refetchQueries(directoryTaxesOptions())
			toast.success('Форма оподаткування успішно створена')
		}
	})
	const { mutate: update } = useMutation({
		mutationKey: ['updateDirectoryTaxes'],
		mutationFn: (values: CreateDirectoryTaxesValues) =>
			updateDirectoryTaxes({ id: id as string, ...values }),
		onError: error => {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data.message || error.message)
			}
		},
		onSuccess: () => {
			setOpen(false)
			queryClient.refetchQueries(directoryTaxesOptions())
			toast.success('Форма оподаткування успішно оновлена')
		}
	})
	const form = useForm<CreateDirectoryTaxesValues>({
		resolver: zodResolver(createDirectoryTaxesSchema),
		defaultValues: defaultValues
	})
	useEffect(() => {
		if (!open) {
			form.reset()
		}
	}, [open])
	const onSubmit = (values: CreateDirectoryTaxesValues) => {
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
					<DialogTitle>Додати форму оподаткування</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='grid gap-5'
					>
						<FormField
							control={form.control}
							name='tax_percent'
							render={({ field }) => (
								<FormItem>
									<FormLabel>% податку</FormLabel>
									<FormControl>
										<Input
											type='number'
											{...field}
											onChange={e => field.onChange(Number(e.target.value))}
											placeholder='Введіть назву'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
