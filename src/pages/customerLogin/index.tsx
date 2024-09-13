import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button.tsx'
import { Card } from '@/components/ui/card.tsx'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'

import Logo from '@/assets/logoGreen.png'

import { useAuthStore } from '@/store/auth.store.ts'

import { httpClient } from '@/api/api.ts'

import { LoginValues, loginSchema } from './schema.ts'
import './style.scss'

export const CustomerLoginPage = () => {
	const navigate = useNavigate()
	const setUser = useAuthStore(state => state.login)
	const form = useForm<LoginValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})
	const { mutate: login, isPending } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: LoginValues) =>
			httpClient.login({
				url: '/api/v1/login',
				payload: { login: data.email, password: data.password }
			}),
		onError: error => {
			const e = error as AxiosError & {
				response?: { data?: { message?: string } }
			}
			console.log(e?.response?.data?.message || error.message)
			toast.error(e?.response?.data?.message || error.message)
		},
		onSuccess: data => {
			toast.success('Вхід виконано успішно')
			setUser(data.result.token, data.result.user)
			navigate({ to: '/' })
		}
	})
	const onSubmit = (props: LoginValues) => {
		login(props)
	}
	useEffect(() => {
		const holder = document.querySelector(
			'#esd-block-login-holder'
		) as HTMLDivElement
		if (holder) {
			holder.style.height = '590px'
		}
	}, [])
	return (
		<div className='login_bg'>
			<Card className='login__card'>
				<img
					src={Logo}
					alt=''
					className='w-[148px] h-[50px]'
				/>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col gap-[32px]'
					>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Пошта</FormLabel>
									<FormControl>
										<Input
											type='email'
											{...field}
										/>
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
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div
							id='esd-block-login-holder'
							style={{
								width: '600px',
								height: '590px',
								padding: 0,
								display: 'block'
							}}
						/>
						<Button
							type='submit'
							className='flex gap-2 items-center'
							disabled={isPending}
						>
							Увійти в Обліковий Запис{' '}
							{isPending ? (
								<LoaderCircle className='animate-spin' />
							) : (
								<ArrowRight />
							)}
						</Button>
					</form>
				</Form>
			</Card>
		</div>
	)
}
