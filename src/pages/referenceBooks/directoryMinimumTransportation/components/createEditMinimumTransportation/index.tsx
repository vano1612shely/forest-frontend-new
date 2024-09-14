import { Pencil, Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button.tsx'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog.tsx'

import { CreateEditMinimumTransportationForm } from '@/pages/referenceBooks/directoryMinimumTransportation/components/createEditMinimumTransportation/form.tsx'

export const CreateEditMinimumTransportation = ({
	id,
	defaultValues = {
		species: '',
		assortment: '',
		minimal_transport_part: 0
	}
}: {
	id?: string
	defaultValues?: any
}) => {
	const [open, setOpen] = useState(false)
	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogTrigger>
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
					<DialogTitle>Додати мінімальний розмір транспортування</DialogTitle>
				</DialogHeader>
				{open && (
					<CreateEditMinimumTransportationForm
						setOpen={setOpen}
						open={open}
						id={id}
						defaultValues={defaultValues}
					/>
				)}
			</DialogContent>
		</Dialog>
	)
}
