import { createFileRoute, redirect } from '@tanstack/react-router'

import { Roles } from '@/types/Roles.ts'

const roles: Roles[] = [Roles.Administrator]
export const Route = createFileRoute('/_layout/_auth/_admins')({
	beforeLoad: ({ context }) => {
		if (!context.user?.roles.some(role => roles.includes(role))) {
			throw redirect({
				to: '/login'
			})
		}
	}
})
