import { Moon, Sun } from 'lucide-react'

import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
	const { setTheme } = useTheme()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					size='icon'
				>
					<Sun className='h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground' />
					<Moon className='absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground' />
					<span className='sr-only'>Переключити тему</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem onClick={() => setTheme('light')}>
					Світла
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					Темна
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
					Системна
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
