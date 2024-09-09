import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from '@tanstack/react-router'
import axios, { AxiosError } from 'axios'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { LeaveFromPageDialog } from '@/components/leaveFromPageDialog.tsx'
import { Avatar, AvatarFallback } from '@/components/ui/avatar.tsx'
import { Card } from '@/components/ui/card.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import { Skeleton } from '@/components/ui/skeleton.tsx'

import { UserState } from '@/types/User.ts'

import { adminDetailsQueryOptions, updateAdmin } from '@/api/admin'
import { EditAdminRequestBody } from '@/api/admin/types.ts'

import { BlockUser } from './components/blockUser.tsx'
import { ChangePasswordDialog } from './components/changePasswordDialog'
import { DeleteAdminDialog } from './components/deleteAdminDialog.tsx'
import { EditAdminForm } from './form.tsx'
import { UpdateAdminValues, updateAdminSchema } from './schema.ts'
import { cn, getStatusName } from '@/lib/utils.ts'

export const EditAdminComponent = () => {
	const { userId } = useParams({ strict: false })
	const navigate = useNavigate()
	const { data, error, isLoading, refetch } = useSuspenseQuery({
		...adminDetailsQueryOptions(userId as string),
		retry: 0
	})
	useEffect(() => {
		if (axios.isAxiosError(error)) {
			if (error.status === 404) {
				navigate({ to: '/adminList' })
			}
		}
	}, [error])
	const { mutate } = useMutation({
		mutationKey: ['updateAdmin', userId],
		mutationFn: (props: EditAdminRequestBody) => updateAdmin(props),
		onSuccess: () => {
			toast.success('Користувач успішно оновлений')
			refetch()
		},
		onError: error => {
			const e = error as AxiosError & {
				response?: { data?: { message?: string } }
			}
			toast.error(e?.response?.data?.message || e.message)
		}
	})
	const form = useForm<UpdateAdminValues>({
		resolver: zodResolver(updateAdminSchema),
		defaultValues: {
			first_name: data.result.first_name,
			last_name: data.result.last_name,
			email: data.result.email,
			phones: data.result.phones,
			description: ''
		}
	})
	const onSubmit = (props: UpdateAdminValues) => {
		props.phones?.map((phone, index) => {
			if (props.phones)
				props.phones[index].phone = phone.phone.replaceAll(' ', '')
		})
		const values: EditAdminRequestBody = {
			...props,
			id: data.result.id,
			ids_groups: data.result.security_groups.map(item => item.id)
		}
		mutate(values)
	}
	return (
		<>
			<LeaveFromPageDialog to='/adminList' />
			<h1 className='pageTitle'>Редагувати адміністратора</h1>
			{isLoading ? (
				<Card className='w-full'>
					<Skeleton className='w-full h-[60vh]' />
				</Card>
			) : (
				<Card className='w-full p-10 flex gap-5'>
					<div className='flex flex-col items-center gap-5 p-5'>
						<Avatar className='w-[50px] h-[50px] text-[24px]'>
							<AvatarFallback className='bg-green-600 text-white'>
								{data.result?.first_name[0]}
								{data.result?.last_name[0]}
							</AvatarFallback>
						</Avatar>
						<p
							className={cn(
								'p-3 rounded',
								data.result.status === UserState.STATUS_ACTIVE
									? 'bg-green-600/20 text-green-600'
									: 'bg-orange-600/20 text-orange-600'
							)}
						>
							{getStatusName(data.result.status)}
						</p>
						<ChangePasswordDialog data={data.result} />
						<BlockUser
							data={data.result}
							refetch={refetch}
						/>
						<DeleteAdminDialog data={data.result} />
					</div>
					<Separator
						orientation='vertical'
						className='h-auto'
					/>
					<div className='flex-1'>
						<h3 className='text-center mb-5'>Загальна інформація</h3>
						<EditAdminForm
							type='update'
							form={form}
							onSubmit={onSubmit}
						/>
					</div>
				</Card>
			)}
		</>
	)
}
