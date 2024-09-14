import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button.tsx'
import { DialogClose, DialogFooter } from '@/components/ui/dialog.tsx'
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select.tsx'

import { useAuthStore } from '@/store/auth.store.ts'

import {
	countriesOptions,
	createRegion,
	regionsOptions,
	updateRegion
} from '@/api/referenceBooks'

import { findTitleByLang } from '@/lib/utils.ts'
import {
	CreateRegionValues,
	createRegionSchema
} from '@/pages/referenceBooks/directoryAreas/components/createEditRegionDialog/schema.ts'

export const CreateEditRegionForm = ({
	id,
	defaultValues,
	setOpen,
	open
}: {
	id?: string
	defaultValues?: CreateRegionValues
	setOpen: (v: boolean) => void
	open: boolean
}) => {
	const lang = useAuthStore(state => state.lang_key)
	const queryClient = useQueryClient()
	const { data: countries, isLoading } = useQuery(countriesOptions())
	const { mutate: create } = useMutation({
		mutationKey: ['createRegion'],
		mutationFn: (values: CreateRegionValues) => createRegion(values),
		onError: error => {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data.message || error.message)
			}
		},
		onSuccess: () => {
			setOpen(false)
			queryClient.refetchQueries(regionsOptions())
			toast.success('Регіон успішно створено')
		}
	})
	const { mutate: update } = useMutation({
		mutationKey: ['updateRegion'],
		mutationFn: (values: CreateRegionValues) =>
			updateRegion({ id: id as string, ...values }),
		onError: error => {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data.message || error.message)
			}
		},
		onSuccess: () => {
			setOpen(false)
			queryClient.refetchQueries(regionsOptions())
			toast.success('Регіон успішно створено')
		}
	})
	useEffect(() => {
		if (open) {
			form.reset()
		}
	}, [open])
	const form = useForm<CreateRegionValues>({
		resolver: zodResolver(createRegionSchema),
		defaultValues
	})
	const onSubmit = (props: CreateRegionValues) => {
		if (id) {
			update(props)
		} else {
			create(props)
		}
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='grid gap-5'
			>
				<FormField
					control={form.control}
					name='id_country'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Країна</FormLabel>
							<FormControl>
								<Select
									onValueChange={value => field.onChange(value)}
									value={field.value}
									disabled={isLoading || !countries}
								>
									<SelectTrigger className='w-full'>
										{countries && <SelectValue placeholder='Виберіть країну' />}
										{isLoading ||
											(!countries && (
												<Loader2 className='animate-spin right-0' />
											))}
									</SelectTrigger>
									<SelectContent>
										{countries &&
											countries.result.result.map(country => {
												return (
													<SelectItem
														value={country.id}
														key={country.id}
													>
														{findTitleByLang(country.title, lang)}
													</SelectItem>
												)
											})}
									</SelectContent>
								</Select>
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
	)
}
