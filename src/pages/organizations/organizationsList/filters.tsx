import { useSearch } from '@tanstack/react-router'
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
} from '@/components/ui/select.tsx'

type AdminFiltersType = {
	search?: string
	usreou?: string
	status?: string
}

export const OrganizationsFilters = ({
	submitFilters
}: {
	submitFilters: (filters: AdminFiltersType) => void
}) => {
	const { search, usreou, status } = useSearch({ strict: false }) as any

	const [values, setValues] = useState<AdminFiltersType>({
		search: search || '',
		usreou: usreou || '',
		status: status || ''
	})

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
							submitFilters(values)
						}}
						className='flex flex-col gap-5 p-2'
					>
						<div className='flex flex-col gap-2'>
							<Label htmlFor={'organizations_filters_search'}>
								Найменування
							</Label>
							<Input
								id='organizations_filters_search'
								placeholder='Введіть назву'
								value={values.search}
								onChange={e =>
									setValues(prevState => ({
										...prevState,
										search: e.target.value
									}))
								}
							/>
						</div>
						<div className='flex flex-col gap-2'>
							<Label htmlFor={'organizations_filters_usreou'}>ЄДРПОУ</Label>
							<Input
								id='organizations_filters_usreou'
								placeholder='Введіть ЄДРПОУ'
								value={values.usreou}
								onChange={e =>
									setValues(prevState => ({
										...prevState,
										usreou: e.target.value
									}))
								}
							/>
						</div>
						<div className='flex flex-col gap-2'>
							<Label htmlFor={'admin_filters_status'}>Акредитація</Label>
							<Select
								onValueChange={value =>
									setValues(prevState => ({
										...prevState,
										status: value
									}))
								}
								value={values.status}
							>
								<SelectTrigger
									className='w-full'
									id='admin_filters_status'
								>
									<SelectValue placeholder='Всі' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='STATUS_ACTIVE'>Акредитований</SelectItem>
									<SelectItem value='STATUS_NOT_CONFIRMED'>
										Не акредитований
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className='flex justify-between gap-2'>
							<Button
								variant='outline'
								className='flex-1'
								type='submit'
								onClick={() => {
									setValues({
										search: '',
										usreou: ''
									})
								}}
							>
								Скинути
							</Button>
							<Button
								className='flex-1'
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
