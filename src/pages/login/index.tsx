import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useTheme } from '@/components/theme-provider.tsx'
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

import Bg from '@/assets/img/login_green_bg.png'
import Logo from '@/assets/logoGreen.png'
import LogoDark from '@/assets/logoGreenWhite.png'

import { useAuthStore } from '@/store/auth.store.ts'

import { httpClient } from '@/api/api.ts'

import './style.scss'
import { LoginValues, loginSchema } from '@/pages/login/schema.ts'

export const LoginPage = () => {
	const navigate = useNavigate()
	const { theme } = useTheme()
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
	return (
		<div className='w-full lg:grid lg:grid-cols-2 min-h-screen'>
			<Card className='flex flex-col p-12 relative m-28 z-10'>
				<Link
					to='/'
					className='w-[148px] h-[50px] absolute left-16 top-16'
				>
					<img
						src={theme === 'dark' ? LogoDark : Logo}
						alt=''
						className='w-full h-full'
					/>
				</Link>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col gap-[32px] items-stretch w-[50%] m-auto'
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
			<img
				src={Bg}
				alt='Image'
				width='1920'
				height='1080'
				className='absolute h-full w-full object-cover'
			/>
		</div>
	)
}
