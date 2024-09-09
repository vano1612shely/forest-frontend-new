import { createFileRoute } from '@tanstack/react-router'

import { EditAdminPage } from '@/pages/admins/editAdmin'

export const Route = createFileRoute(
	'/_layout/_auth/_admins/editAdmin/$userId'
)({
	component: () => <EditAdminPage />
})
