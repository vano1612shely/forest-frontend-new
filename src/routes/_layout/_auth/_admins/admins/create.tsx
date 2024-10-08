import { createFileRoute } from '@tanstack/react-router'

import { CreateAdminPage } from '@/pages/admins/createAdmin'

export const Route = createFileRoute('/_layout/_auth/_admins/admins/create')({
	component: () => (
		<div>
			<CreateAdminPage />
		</div>
	)
})
