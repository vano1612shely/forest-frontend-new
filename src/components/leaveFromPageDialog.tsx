import { Link, ParseRoute } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/alert-dialog.tsx'
import { Button } from '@/components/ui/button.tsx'

import { routeTree } from '@/routeTree.gen.ts'

export const LeaveFromPageDialog = ({
	to
}: {
	to: ParseRoute<typeof routeTree>['fullPath']
}) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button className='flex items-center gap-2 mb-5'>
					<ChevronLeft /> Назад
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Будь ласка, підтвердіть дію!</AlertDialogTitle>
					<AlertDialogDescription>
						Увага! Усі незбереженні данні будуть втрачені. Ви впевнені, що
						бажаєте вийти зі сторінки?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Відмінити</AlertDialogCancel>

					<AlertDialogAction asChild>
						<Link to={to}>Покинути сторінку</Link>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
