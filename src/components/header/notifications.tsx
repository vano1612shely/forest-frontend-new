import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Bell, BellMinus, SquareChartGantt } from 'lucide-react'

import { Badge } from '@/components/ui/badge.tsx'
import { Button } from '@/components/ui/button.tsx'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { useAuthStore } from '@/store/auth.store.ts'

import { notificationOptions } from '@/api/notifications'
import { INotification } from '@/api/notifications/types.ts'

import { findTitleByLang } from '@/lib/utils.ts'

export const Notifications = () => {
	const { data } = useQuery(
		notificationOptions({
			to_read: false,
			limit: 5
		})
	)
	const lang = useAuthStore(state => state.lang_key)
	const generateName = (message: INotification) => {
		if (!message.contract) {
			const title = findTitleByLang(message.trading?.title, lang)
			const msg = message.message[lang]?.replace('%trading%', title)
			return msg ? msg : 'undefined'
		}
		return message.message[lang] ? message.message[lang] : 'undefined'
	}
	if (data)
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						className='relative'
						variant='ghost'
						size='icon'
					>
						<Bell className='w-5 h-5 text-foreground' />
						<Badge className='text-[10px] absolute -top-1 -right-1 px-1 py-0'>
							{data.result.total_unread > 99 ? '99+' : data.result.total_unread}
						</Badge>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-[300px]'>
					{data.result.result.map(message => {
						if (!message.contract)
							return (
								<Link
									to='/adminList'
									key={message.id}
								>
									<DropdownMenuItem className='flex gap-2 items-center'>
										<SquareChartGantt className='w-4 h-4 text-foreground' />
										<p className='truncate max-w-[250px]'>
											{generateName(message)}
										</p>
									</DropdownMenuItem>
								</Link>
							)
						else
							return (
								<DropdownMenuItem
									className='flex gap-2 items-center'
									key={message.id}
								>
									<SquareChartGantt className='w-4 h-4' />
									<p className='truncate max-w-[250px]'>
										{generateName(message)}
									</p>
								</DropdownMenuItem>
							)
					})}
					<DropdownMenuSeparator />
					<Link to='/notifications'>
						<DropdownMenuItem>Показати всі</DropdownMenuItem>
					</Link>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	else return <BellMinus className='text-foreground w-5 h-5' />
}
