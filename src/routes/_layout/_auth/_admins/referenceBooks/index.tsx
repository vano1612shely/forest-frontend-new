import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_auth/_admins/referenceBooks/')({
	beforeLoad: () => {
		throw redirect({
			to: '/referenceBooks/countries'
		})
	}
})
