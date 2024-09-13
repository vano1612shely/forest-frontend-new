import { useNavigate } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar.tsx'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { useAuthStore } from '@/store/auth.store.ts'

import { httpClient } from '@/api/api.ts'

export const UserBlock = () => {
	const user = useAuthStore(state => state.user)
	const navigate = useNavigate()
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarFallback className='bg-green-600 text-white'>
						{user?.first_name[0]}
						{user?.last_name[0]}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='ml-2'>
				<DropdownMenuLabel className='flex gap-4 items-center'>
					<Avatar>
						<AvatarFallback className='bg-green-600 text-white'>
							{user?.first_name[0]}
							{user?.last_name[0]}
						</AvatarFallback>
					</Avatar>
					<div className='flex flex-col'>
						<p className='mb-1'>
							{user?.last_name} {user?.first_name}
						</p>
						<p className='font-normal text-muted-foreground'>{user?.email}</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className='flex gap-2'
					onClick={async () => {
						await httpClient.logout({ url: '/api/v1/logout' })
						navigate({ to: '/login' })
					}}
				>
					<LogOut />
					Вийти
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
