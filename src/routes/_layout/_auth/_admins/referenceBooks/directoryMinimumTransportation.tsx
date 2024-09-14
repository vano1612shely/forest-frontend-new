import { createFileRoute } from '@tanstack/react-router'

import { DirectoryMinimumTransportationPage } from '@/pages/referenceBooks/directoryMinimumTransportation'

export const Route = createFileRoute(
	'/_layout/_auth/_admins/referenceBooks/directoryMinimumTransportation'
)({
	component: () => <DirectoryMinimumTransportationPage />
})
