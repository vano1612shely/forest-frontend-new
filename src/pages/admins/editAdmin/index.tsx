import { Navigate } from '@tanstack/react-router'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { Skeleton } from '@/components/ui/skeleton.tsx'

import { EditAdminComponent } from './editAdmin.tsx'

export const EditAdminPage = () => {
	return (
		<ErrorBoundary fallback={<Navigate to='/adminList' />}>
			<Suspense fallback={<Skeleton className='w-full h-[60vh]' />}>
				<EditAdminComponent />
			</Suspense>
		</ErrorBoundary>
	)
}
