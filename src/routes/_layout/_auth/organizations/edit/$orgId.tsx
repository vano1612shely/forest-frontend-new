import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
	'/_layout/_auth/organizations/edit/$orgId'
)({
	component: () => <div>Development</div>
})
