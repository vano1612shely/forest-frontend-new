import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { LeaveFromPageDialog } from '@/components/leaveFromPageDialog.tsx'
import { Card } from '@/components/ui/card.tsx'

import { createAdmin } from '@/api/admin'
import { CreateAdminRequestBody } from '@/api/admin/types.ts'

import { CreateAdminForm } from './form.tsx'
import { createAdminSchema } from './schema.ts'

export const CreateAdminPage = () => {
	const navigate = useNavigate()
	const { mutate } = useMutation({
		mutationKey: ['createAdmin'],
		mutationFn: (props: CreateAdminRequestBody) => createAdmin(props),
		onSuccess: () => {
			toast.success('Користувач успішно створений')
			navigate({ to: '/adminList' })
		},
		onError: error => {
			if (axios.isAxiosError(error)) {
				toast.error(error?.response?.data?.message || error.message)
			}
		}
	})
	const form = useForm<CreateAdminRequestBody>({
		resolver: zodResolver(createAdminSchema),
		defaultValues: {
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			phones: [' '],
			role: undefined,
			description: ''
		}
	})
	const onSubmit = (props: CreateAdminRequestBody) => {
		props.phones.map((phone, index) => {
			props.phones[index] = phone.replaceAll(' ', '')
		})
		mutate(props)
	}
	return (
		<>
			<LeaveFromPageDialog to='/adminList' />
			<h1 className='pageTitle'>Створити адміністратора</h1>
			<Card className='w-full p-10'>
				<h3 className='text-center mb-5'>Загальна інформація</h3>
				<CreateAdminForm
					type='create'
					form={form}
					onSubmit={onSubmit}
				/>
			</Card>
		</>
	)
}
