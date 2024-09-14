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

import { CreateEditRegionForm } from '@/pages/referenceBooks/directoryAreas/components/createEditRegionDialog/createEditRegionForm.tsx'
import { CreateRegionValues } from '@/pages/referenceBooks/directoryAreas/components/createEditRegionDialog/schema.ts'

export const CreateEditRegionDialog = ({
	id,
	defaultValues = {
		id_country: '',
		title: {
			ua: '',
			en: ''
		}
	}
}: {
	id?: string
	defaultValues?: CreateRegionValues
}) => {
	const [open, setOpen] = useState(false)
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
					<DialogTitle>Додати область</DialogTitle>
				</DialogHeader>
				{open && (
					<CreateEditRegionForm
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
