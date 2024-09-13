import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select.tsx'

export const LimitSelector = ({
	value,
	setValue,
	list = [100, 300, 500]
}: {
	value: number
	setValue: (value: number) => void
	list?: number[]
}) => {
	return (
		<Select
			value={String(value)}
			onValueChange={value => {
				setValue(Number(value))
			}}
		>
			<SelectTrigger>
				<SelectValue placeholder={String(value)} />
			</SelectTrigger>
			<SelectContent side='top'>
				{list.map(pageSize => (
					<SelectItem
						key={pageSize}
						value={`${pageSize}`}
					>
						{pageSize}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
