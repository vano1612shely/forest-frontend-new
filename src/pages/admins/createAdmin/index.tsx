import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowBackIos } from '@mui/icons-material/'
import { Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button.tsx'
import { Card } from '@/components/ui/card.tsx'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'

import { CreateAdminForm } from '@/pages/admins/createAdmin/form.tsx'
import {
	CreateAdminValues,
	createAdminSchema
} from '@/pages/admins/createAdmin/schema.ts'

export const CreateAdminPage = () => {
	const form = useForm<CreateAdminValues>({
		resolver: zodResolver(createAdminSchema),
		defaultValues: {
			first_name: '',
			second_name: '',
			email: '',
			password: '',
			phones: [' '],
			role: undefined,
			description: ''
		}
	})
	const onSubmit = (props: CreateAdminValues) => {
		console.log(props)
	}
	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button className='flex items-center gap-2 mb-5'>
						<ArrowBackIos fontSize='small' /> Назад
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Будь ласка, підтвердіть дію!</DialogTitle>
					</DialogHeader>
					<DialogDescription className='text-[#1D1D1D]'>
						Увага! Усі незбереженні данні будуть втрачені. Ви впевнені, що
						бажаєте вийти зі сторінки?
					</DialogDescription>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant='outline'>Відмінити</Button>
						</DialogClose>
						<DialogClose asChild>
							<Link to='/adminList'>
								<Button>Покинути сторінку</Button>
							</Link>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<h1 className='pageTitle'>Створити адміністратора</h1>
			<Card className='w-full p-10'>
				<h3 className='text-center mb-5'>Загальна інформація</h3>
				<CreateAdminForm
					form={form}
					onSubmit={onSubmit}
				/>
			</Card>
		</>
	)
}
