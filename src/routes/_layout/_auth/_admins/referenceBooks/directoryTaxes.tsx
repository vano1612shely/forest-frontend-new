import { createFileRoute } from '@tanstack/react-router'

import { DirectoryTaxesPage } from '@/pages/referenceBooks/directoryTaxes'

export const Route = createFileRoute(
	'/_layout/_auth/_admins/referenceBooks/directoryTaxes'
)({
	component: () => <DirectoryTaxesPage />
})
