import { uk } from 'date-fns/locale'
import dayjs from 'dayjs'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'

import { cn } from '@/lib/utils'

export function DatePicker({
	date,
	onChange,
	id
}: {
	date: Date | undefined
	onChange: (value: Date | undefined) => void
	id?: string
}) {
	const [open, setOpen] = useState(false)
	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger asChild>
				<Button
					id={id}
					variant={'outline'}
					className={cn(
						'w-full justify-start text-left font-normal',
						!date && 'text-muted-foreground'
					)}
				>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{date ? dayjs(date).format('DD.MM.YYYY') : <span>дд.мм.рррр</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className='w-auto p-0'
				align='start'
			>
				<Calendar
					locale={uk}
					mode='single'
					selected={date}
					onSelect={v => {
						onChange(v)
						setOpen(false)
					}}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	)
}
