import { useRouter, useSearch } from '@tanstack/react-router'
import _ from 'lodash'
import { useState } from 'react'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'

import { UserState } from '@/types/User.ts'

import { getStatusName } from '@/lib/utils.ts'

type AdminFiltersType = {
	search?: string
	status?: UserState
}

export const AdminFilters = () => {
	const search = useSearch({ strict: false }) as any
	const { navigate } = useRouter()
	// Ensure initial values are defined
	const [values, setValues] = useState<AdminFiltersType>({
		search: search.search || '',
		status: search.status || ''
	})
	const submitFilters = () => {
		const searchParams = _.mapValues(values, value => {
			if (value) return value.toString()
		})
		navigate({
			search: { ...search, ...searchParams }
		})
	}
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
							<Label htmlFor={'admin_filters_search'}>Email</Label>
							<Input
								id='admin_filters_search'
								onChange={e =>
									setValues(prevState => ({
										...prevState,
										search: e.target.value
									}))
								}
								value={values.search}
							/>
						</div>
						<div className='filters__row'>
							<Label htmlFor={'admin_filters_status'}>Статус</Label>
							<Select
								onValueChange={value =>
									setValues(prevState => ({
										...prevState,
										status: value as UserState
									}))
								}
								value={values.status}
							>
								<SelectTrigger
									className='w-full'
									id='admin_filters_status'
								>
									<SelectValue placeholder='Статус' />
								</SelectTrigger>
								<SelectContent>
									{_.map(UserState, (value, key) => {
										return (
											<SelectItem
												value={value}
												key={key}
											>
												{getStatusName(value)}
											</SelectItem>
										)
									})}
								</SelectContent>
							</Select>
						</div>
						<div className='filters__buttons-group'>
							<Button
								variant='outline'
								className='filters__button'
								type='submit'
								onClick={() => {
									navigate({
										search: { limit: search.limit }
									})
									setValues({
										search: '',
										status: undefined
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
