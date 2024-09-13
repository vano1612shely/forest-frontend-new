import { Plus, Trash } from 'lucide-react'
import { UseFormReturn, useFieldArray } from 'react-hook-form'
import { withMask } from 'use-mask-input'

import { Button } from '@/components/ui/button.tsx'
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
import { Separator } from '@/components/ui/separator.tsx'

import { CreateAdminValues } from '@/pages/admins/createAdmin/schema.ts'

export const CreateAdminForm = ({
	form,
	onSubmit
}: {
	form: UseFormReturn<CreateAdminValues>
	onSubmit: (props: CreateAdminValues) => void
	type: 'create' | 'update'
}) => {
	const phones = useFieldArray({
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		name: 'phones',
		control: form.control
	})
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='grid gap-5'
			>
				<div className='grid grid-cols-2 gap-5'>
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
						name='last_name'
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
					<div className='grid gap-5'>
						{phones.fields.map((phone, index) => (
							<FormField
								control={form.control}
								key={phone.id}
								name={`phones.${index}`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Телефон {index + 1}</FormLabel>
										<FormControl>
											<div className='flex gap-2'>
												<Input
													className='flex-1'
													type='text'
													ref={withMask('+38 0999 999999')}
													value={field.value}
													onChange={e => {
														field.onChange(e.target.value)
													}}
												/>
												<Button
													type='button'
													variant='ghost'
													onClick={() => phones.append(' ')}
												>
													<Plus />
												</Button>
												{phones.fields.length > 1 && (
													<Button
														variant='ghost'
														onClick={() => phones.remove(index)}
													>
														<Trash />
													</Button>
												)}
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						))}
					</div>
				</div>
				<Separator />
				<div className='flex justify-end gap-2'>
					<Button
						type='button'
						variant='outline'
						onClick={() => form.reset()}
					>
						Відмінити
					</Button>
					<Button>Зберегти</Button>
				</div>
			</form>
		</Form>
	)
}
