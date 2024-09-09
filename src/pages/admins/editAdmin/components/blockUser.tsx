import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button.tsx'

import { updateAdmin } from '@/api/admin'
import { AdminDetails, EditAdminRequestBody } from '@/api/admin/types.ts'

export const BlockUser = ({
	data,
	refetch
}: {
	data: AdminDetails
	refetch: () => void
}) => {
	const { mutate } = useMutation({
		mutationKey: ['blockAdmin', data.id],
		mutationFn: (props: EditAdminRequestBody) => updateAdmin(props),
		onSuccess: data => {
			console.log(data)
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
	const onSubmit = () => {
		const values: EditAdminRequestBody = {
			first_name: data.first_name,
			last_name: data.last_name,
			is_blocked: data.is_blocked ? 0 : 1,
			id: data.id,
			phones: data.phones,
			ids_groups: data.security_groups.map(item => item.id)
		}
		mutate(values)
	}
	return (
		<Button onClick={onSubmit}>
			{data.is_blocked ? 'Розблокувати' : 'Заблокувати'}
		</Button>
	)
}
