import { Link } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'

import { Admin } from '@/api/admin/types.ts'

import { getStatusName } from '@/lib/utils.ts'

export const columns: ColumnDef<Admin>[] = [
	{
		accessorKey: 'email',
		header: 'Email',
		cell: ({ row }) => {
			return <Link to={`/admins/${row.original.id}`}>{row.original.email}</Link>
		}
	},
	{
		accessorKey: 'role',
		header: 'Роль',
		cell: () => {
			return 'Адміністратор'
		}
	},
	{
		accessorKey: 'status',
		header: 'Статус',
		cell: ({ row }) => {
			return getStatusName(row.original.status)
		}
	},
	{
		accessorKey: 'date_last_activity_at',
		header: 'Остання активність',
		cell: ({ row }) => {
			return dayjs(row.original.date_last_activity_at).format(
				'DD.MM.YYYY о HH:mm'
			)
		}
	}
]
