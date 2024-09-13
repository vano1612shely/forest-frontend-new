import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'

import { useAuthStore } from '@/store/auth.store.ts'

import { INotification } from '@/api/notifications/types.ts'

import { findTitleByLang } from '@/lib/utils.ts'

export const columns: ColumnDef<INotification>[] = [
	{
		accessorKey: 'date_created_at',
		header: 'Час',
		cell: ({ row }) => {
			return dayjs(row.original.date_created_at).format('DD.MM.YYYY о HH:mm')
		}
	},
	{
		accessorKey: 'message',
		header: 'Повідомлення',
		cell: ({ row }) => {
			const lang = useAuthStore.getState().lang_key
			if (!row.original.contract) {
				const title = findTitleByLang(row.original.trading?.title, lang)
				const msg = row.original.message[lang]?.replace('%trading%', title)
				return msg ? msg : 'undefined'
			}
			return row.original.message[lang]
				? row.original.message[lang]
				: 'undefined'
		}
	},
	{
		accessorKey: 'trading',
		header: 'Деталі',
		cell: ({ row }) => {
			if (!row.original.contract) return row.original.trading?.number
			return row.original.contract?.number
		}
	}
]
