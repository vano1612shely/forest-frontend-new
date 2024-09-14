import { createFileRoute } from '@tanstack/react-router'

import { FormsOwnershipPage } from '@/pages/referenceBooks/formsOwnership'

export const Route = createFileRoute(
	'/_layout/_auth/_admins/referenceBooks/formsOwnership'
)({
	component: () => <FormsOwnershipPage />
})
