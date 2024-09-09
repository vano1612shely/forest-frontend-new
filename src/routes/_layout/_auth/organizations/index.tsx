import { createFileRoute } from '@tanstack/react-router'

import { OrganizationsListPage } from '@/pages/organizations/organizationsList'

export const Route = createFileRoute('/_layout/_auth/organizations/')({
	component: () => <OrganizationsListPage />
})
