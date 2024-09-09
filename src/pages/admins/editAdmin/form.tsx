import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
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
import { Separator } from '@/components/ui/separator.tsx'

import { UpdateAdminValues } from './schema.ts'

export const EditAdminForm = ({
	form,
	onSubmit
}: {
	form: UseFormReturn<UpdateAdminValues>
	onSubmit: (props: UpdateAdminValues) => void
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
				onChange={() => console.log(form.getValues())}
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
					<div>
						{phones.fields.length === 0 && (
							<Button
								type='button'
								variant='ghost'
								className='flex gap-2 items-center'
								onClick={() => phones.append({ phone: '' })}
							>
								Додати номер телефону
								<AddIcon />
							</Button>
						)}
						{phones.fields.map((phone, index) => (
							<FormField
								control={form.control}
								key={phone.id}
								name={`phones.${index}.phone`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Телефон {index + 1}</FormLabel>
										<FormControl>
											<div className='flex gap-2'>
												<Input
													className='flex-1'
													type='text'
													ref={withMask('+9{2} 9999 999999')}
													value={field.value}
													onChange={e => {
														field.onChange(e.target.value)
													}}
												/>
												<Button
													type='button'
													variant='ghost'
													onClick={() => phones.append({ phone: '' })}
												>
													<AddIcon />
												</Button>
												{phones.fields.length > 1 && (
													<Button
														variant='ghost'
														onClick={() => phones.remove(index)}
													>
														<DeleteIcon />
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
