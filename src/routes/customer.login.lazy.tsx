import { createLazyFileRoute } from '@tanstack/react-router'

import { CustomerLoginPage } from '@/pages/customerLogin'

export const Route = createLazyFileRoute('/customer/login')({
	component: () => <CustomerLoginPage />
})
