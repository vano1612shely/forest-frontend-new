import { createFileRoute } from '@tanstack/react-router'

import { DirectoryAreasBookPage } from '@/pages/referenceBooks/directoryAreas'

export const Route = createFileRoute(
	'/_layout/_auth/_admins/referenceBooks/directoryAreas'
)({
	component: () => <DirectoryAreasBookPage />
})
