import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
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
	assortmentOptions,
	createDirectoryMinimumTransportations,
	directoryMinimumTransportationsOptions,
	speciesOptions,
	updateDirectoryMinimumTransportations
} from '@/api/referenceBooks'
import { IAssortmentItem, ISpeciesItem } from '@/api/referenceBooks/types.tsx'

import { findTitleByLang } from '@/lib/utils.ts'
import {
	CreateMinimumTransportationValues,
	createMinimumTransportationSchema
} from '@/pages/referenceBooks/directoryMinimumTransportation/components/createEditMinimumTransportation/schema.ts'

export const CreateEditMinimumTransportationForm = ({
	id,
	defaultValues,
	setOpen,
	open
}: {
	id?: string
	defaultValues?: CreateMinimumTransportationValues
	setOpen: (v: boolean) => void
	open: boolean
}) => {
	const search = useSearch({
		strict: false
	}) as any
	const lang = useAuthStore(state => state.lang_key)
	const queryClient = useQueryClient()
	const { data: species, isLoading: isLoadingSpecies } = useQuery(
		speciesOptions({
			type: 'wood',
			limit: 1000
		})
	)
	const [sortedSpecies, setSortedSpecies] = useState<ISpeciesItem[]>([])
	useEffect(() => {
		if (species) {
			const sortedItems = species.result.result.sort((a, b) => {
				// Знайти об'єкти з відповідним lang_key у кожному Item
				const titleA = a.title.find(t => t.language.lang_key === lang)
				const titleB = b.title.find(t => t.language.lang_key === lang)

				// Якщо обидва заголовки знайдено, порівняти їх
				if (titleA && titleB) {
					return titleA.title.localeCompare(titleB.title)
				}

				// Якщо не знайдено, зберігати початковий порядок
				return 0
			})
			if (sortedItems) setSortedSpecies(sortedItems)
		}
	}, [species])
	const { data: assortment, isLoading: isLoadingAssortment } = useQuery(
		assortmentOptions({
			type: 'wood',
			limit: 1000
		})
	)
	const [sortedAssortment, setSortedAssortment] = useState<IAssortmentItem[]>(
		[]
	)
	useEffect(() => {
		if (assortment) {
			const sortedItems = assortment.result.result.sort((a, b) => {
				// Знайти об'єкти з відповідним lang_key у кожному Item
				const titleA = a.title.find(t => t.language.lang_key === lang)
				const titleB = b.title.find(t => t.language.lang_key === lang)

				// Якщо обидва заголовки знайдено, порівняти їх
				if (titleA && titleB) {
					return titleA.title.localeCompare(titleB.title)
				}

				// Якщо не знайдено, зберігати початковий порядок
				return 0
			})
			if (sortedItems) setSortedAssortment(sortedItems)
		}
	}, [species])
	const { mutate: create } = useMutation({
		mutationKey: ['createMinimumTransportation'],
		mutationFn: (values: CreateMinimumTransportationValues) =>
			createDirectoryMinimumTransportations(values),
		onError: error => {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data.message || error.message)
			}
		},
		onSuccess: () => {
			setOpen(false)
			queryClient.refetchQueries(
				directoryMinimumTransportationsOptions({
					page: search.page || 1,
					limit: search.limit || 100
				})
			)
			toast.success('Мінімальний розмір транспортування успішно створено')
		}
	})
	const { mutate: update } = useMutation({
		mutationKey: ['updateMinimumTransportation'],
		mutationFn: (values: CreateMinimumTransportationValues) =>
			updateDirectoryMinimumTransportations({ id: id as string, ...values }),
		onError: error => {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data.message || error.message)
			}
		},
		onSuccess: () => {
			setOpen(false)
			queryClient.refetchQueries(
				directoryMinimumTransportationsOptions({
					page: search.page || 1,
					limit: search.limit || 100
				})
			)
			toast.success('Мінімальний розмір транспортування успішно створено')
		}
	})
	useEffect(() => {
		if (open) {
			form.reset()
		}
	}, [open])
	const form = useForm<CreateMinimumTransportationValues>({
		resolver: zodResolver(createMinimumTransportationSchema),
		defaultValues
	})
	const onSubmit = (props: CreateMinimumTransportationValues) => {
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
					name='species'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Порода</FormLabel>
							<FormControl>
								<Select
									onValueChange={value => field.onChange(value)}
									value={field.value}
									disabled={isLoadingSpecies || !species}
								>
									<SelectTrigger className='w-full'>
										{species && <SelectValue placeholder='Виберіть породу' />}
										{isLoadingSpecies ||
											(!species && (
												<Loader2 className='animate-spin right-0' />
											))}
									</SelectTrigger>
									<SelectContent>
										{species &&
											sortedSpecies.map(item => {
												return (
													<SelectItem
														value={item.id}
														key={item.id}
													>
														{findTitleByLang(item.title, lang)}
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
					name='assortment'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Сортимент</FormLabel>
							<FormControl>
								<Select
									onValueChange={value => field.onChange(value)}
									value={field.value}
									disabled={isLoadingAssortment || !assortment}
								>
									<SelectTrigger className='w-full'>
										{assortment && (
											<SelectValue placeholder='Виберіть сортимент' />
										)}
										{isLoadingAssortment ||
											(!assortment && (
												<Loader2 className='animate-spin right-0' />
											))}
									</SelectTrigger>
									<SelectContent>
										{assortment &&
											sortedAssortment.map(item => {
												return (
													<SelectItem
														value={item.id}
														key={item.id}
													>
														{findTitleByLang(item.title, lang)}
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
					name='minimal_transport_part'
					render={({ field }) => (
						<FormItem>
							<FormLabel>МТП, куб.м.</FormLabel>
							<FormControl>
								<Input
									type='number'
									{...field}
									onChange={e => field.onChange(Number(e.target.value))}
									placeholder='МТП, куб.м.'
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
