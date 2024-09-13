import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearch } from '@tanstack/react-router'
import dayjs from 'dayjs'
import _ from 'lodash'
import { useState } from 'react'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion.tsx'
import { Button } from '@/components/ui/button.tsx'
import { DatePicker } from '@/components/ui/datepicker.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select.tsx'
import { Skeleton } from '@/components/ui/skeleton.tsx'

import { useAuthStore } from '@/store/auth.store.ts'

import { tradingFiltersOptions } from '@/api/trading'

import { findTitleByLang } from '@/lib/utils.ts'

type UnsoldLotsFiltersType = {
	seller_usreou?: string
	trading_end_date?: Date | undefined
	species?: string
	quality_class?: string
	diameter?: string
	width?: string
	height?: string
	length_value?: string
	humidity?: string
}

export const UnsoldLotsFilters = ({
	category
}: {
	category: 'wood' | 'lumber'
}) => {
	const lang = useAuthStore(state => state.lang_key)
	const { navigate } = useRouter()
	const { data, isLoading } = useQuery(
		tradingFiltersOptions({ category: category })
	)
	const search = useSearch({
		strict: false
	}) as any
	const [values, setValues] = useState<UnsoldLotsFiltersType>({
		seller_usreou: search.seller_usreou || '',
		trading_end_date: search.trading_end_date || undefined,
		species: search.species || '',
		quality_class: search.quality_class || '',
		diameter: search.diameter || '',
		width: search.width || '',
		height: search.height || '',
		length_value: search.length_value || '',
		humidity: search.humidity || ''
	})
	const submitFilters = () => {
		const searchParams = _.mapValues(values, value => {
			if (value) return value.toString()
		})
		navigate({
			search: {
				...search,
				...searchParams,
				trading_end_date: searchParams.trading_end_date
					? dayjs(searchParams.trading_end_date).format('YYYY-MM-DD')
					: undefined
			}
		})
	}
	if (isLoading) {
		return <Skeleton className='w-full h-[300px]' />
	}
	if (data)
		return (
			<Accordion
				type='single'
				defaultValue='filters'
				collapsible
			>
				<AccordionItem value='filters'>
					<AccordionTrigger>Фільтри</AccordionTrigger>
					<AccordionContent>
						<form
							onSubmit={e => {
								e.preventDefault()
								submitFilters()
							}}
							className='filters__form'
						>
							<div className='filters__row'>
								<Label htmlFor={'unsold_filters_date'}>
									Дата закінчення торгів
								</Label>
								<DatePicker
									date={values.trading_end_date}
									id='unsold_filters_date'
									onChange={trading_end_date =>
										setValues(prevState => ({ ...prevState, trading_end_date }))
									}
								/>
							</div>
							<div className='filters__row'>
								<Label htmlFor={'unsold_filters_usreou'}>ЄДРПОУ</Label>
								<Input
									id='unsold_filters_usreou'
									onChange={e =>
										setValues(prevState => ({
											...prevState,
											usreou: e.target.value
										}))
									}
									value={values.seller_usreou}
								/>
							</div>
							<div className='filters__row'>
								<Label htmlFor={'unsold_filters_species'}>Порода</Label>
								<Select
									onValueChange={value =>
										setValues(prevState => ({
											...prevState,
											species: value
										}))
									}
									value={values.species}
								>
									<SelectTrigger
										className='w-full'
										id='unsold_filters_species'
									>
										<SelectValue placeholder='Порода' />
									</SelectTrigger>
									<SelectContent>
										{data.result.species.map((item, index) => {
											return (
												<SelectItem
													key={item.name + index}
													value={item.name}
												>
													{item.name}
												</SelectItem>
											)
										})}
									</SelectContent>
								</Select>
							</div>
							{category === 'wood' && (
								<div className='filters__row'>
									<Label htmlFor={'unsold_filters_quality_class'}>
										Клас якості
									</Label>
									<Select
										onValueChange={value =>
											setValues(prevState => ({
												...prevState,
												quality_class: value
											}))
										}
										value={values.quality_class}
									>
										<SelectTrigger
											className='w-full'
											id='unsold_filters_quality_class'
										>
											<SelectValue placeholder='Клас якості' />
										</SelectTrigger>
										<SelectContent>
											{data.result.quality_class.map((item, index) => {
												return (
													<SelectItem
														key={item.name + index}
														value={item.name}
													>
														{item.name}
													</SelectItem>
												)
											})}
										</SelectContent>
									</Select>
								</div>
							)}
							{category === 'wood' && (
								<div className='filters__row'>
									<Label htmlFor={'unsold_filters_diameter'}>
										Група діаметрів(см)
									</Label>
									<Select
										onValueChange={value =>
											setValues(prevState => ({
												...prevState,
												diameter: value
											}))
										}
										value={values.diameter}
									>
										<SelectTrigger
											className='w-full'
											id='unsold_filters_diameter'
										>
											<SelectValue placeholder='Група діаметрів(см)' />
										</SelectTrigger>
										<SelectContent>
											{data.result.diameter.map(item => {
												return (
													<SelectItem
														key={item.id}
														value={item.id}
													>
														{findTitleByLang(item.title, lang)}
													</SelectItem>
												)
											})}
										</SelectContent>
									</Select>
								</div>
							)}
							{category === 'lumber' && (
								<div className='filters__row'>
									<Label htmlFor={'unsold_filters_width'}>Ширина(мм)</Label>
									<Select
										onValueChange={value =>
											setValues(prevState => ({
												...prevState,
												width: value
											}))
										}
										value={values.width}
									>
										<SelectTrigger
											className='w-full'
											id='unsold_filters_width'
										>
											<SelectValue placeholder='Ширина(мм)' />
										</SelectTrigger>
										<SelectContent>
											{data.result.width.map(item => {
												return (
													<SelectItem
														key={item.name}
														value={item.name}
													>
														{item.name}
													</SelectItem>
												)
											})}
										</SelectContent>
									</Select>
								</div>
							)}
							{category === 'lumber' && (
								<div className='filters__row'>
									<Label htmlFor={'unsold_filters_height'}>Висота(мм)</Label>
									<Select
										onValueChange={value =>
											setValues(prevState => ({
												...prevState,
												height: value
											}))
										}
										value={values.height}
									>
										<SelectTrigger
											className='w-full'
											id='unsold_filters_height'
										>
											<SelectValue placeholder='Висота(мм)' />
										</SelectTrigger>
										<SelectContent>
											{data.result.height.map(item => {
												return (
													<SelectItem
														key={item.name}
														value={item.name}
													>
														{item.name}
													</SelectItem>
												)
											})}
										</SelectContent>
									</Select>
								</div>
							)}
							{category === 'lumber' && (
								<div className='filters__row'>
									<Label htmlFor={'unsold_filters_length'}>Довжина</Label>
									<Select
										onValueChange={value =>
											setValues(prevState => ({
												...prevState,
												length_value: value
											}))
										}
										value={values.length_value}
									>
										<SelectTrigger
											className='w-full'
											id='unsold_filters_length'
										>
											<SelectValue placeholder='Довжина' />
										</SelectTrigger>
										<SelectContent>
											{data.result.length_value.map(item => {
												return (
													<SelectItem
														key={item.name}
														value={item.name}
													>
														{item.name}
													</SelectItem>
												)
											})}
										</SelectContent>
									</Select>
								</div>
							)}
							{category === 'lumber' && (
								<div className='filters__row'>
									<Label htmlFor={'unsold_filters_humidity'}>Вологість</Label>
									<Select
										onValueChange={value =>
											setValues(prevState => ({
												...prevState,
												humidity: value
											}))
										}
										value={values.humidity}
									>
										<SelectTrigger
											className='w-full'
											id='unsold_filters_humidity'
										>
											<SelectValue placeholder='Довжина' />
										</SelectTrigger>
										<SelectContent>
											{data.result.humidity.map(item => {
												return (
													<SelectItem
														key={item.id}
														value={item.id}
													>
														{findTitleByLang(item.title, lang)}
													</SelectItem>
												)
											})}
										</SelectContent>
									</Select>
								</div>
							)}
							<div className='filters__buttons-group'>
								<Button
									variant='outline'
									className='filters__button'
									type='submit'
									onClick={() => {
										setValues({
											seller_usreou: '',
											trading_end_date: undefined,
											species: '',
											quality_class: '',
											diameter: '',
											width: '',
											height: '',
											length_value: '',
											humidity: ''
										})
										navigate({
											search: { limit: search.limit }
										})
									}}
								>
									Скинути
								</Button>
								<Button
									className='filters__button'
									type='submit'
								>
									Застосувати
								</Button>
							</div>
						</form>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		)
}
