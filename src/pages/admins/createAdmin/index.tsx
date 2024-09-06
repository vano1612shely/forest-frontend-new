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
			phones: [{ phone: '' }],
			role: 'ADMIN',
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
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='grid grid-cols-2 gap-5'
					>
						<FormField
							control={form.control}
							name='first_name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ім'я</FormLabel>
									<FormControl>
										<Input
											type='text'
											autoComplete='name'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='second_name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Прізвище</FormLabel>
									<FormControl>
										<Input
											type='text'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											type='email'
											autoComplete='off'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='role'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Роль</FormLabel>
									<FormControl>
										<Select
											onValueChange={value => field.onChange(value)}
											value={field.value}
										>
											<SelectTrigger
												className='w-full'
												id='admin_filters_status'
											>
												<SelectValue placeholder='Роль' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value={'ADMIN'}>Адміністратор</SelectItem>
												<SelectItem value={'OBSERVER'}>Спостерігач</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Пароль</FormLabel>
									<FormControl>
										<Input
											type='password'
											autoComplete='new-password'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Додатково</FormLabel>
									<FormControl>
										<Input
											type='text'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</Card>
		</>
	)
}
