import { createFileRoute } from '@tanstack/react-router'

import { CountriesBookPage } from '@/pages/referenceBooks/countries.tsx'

export const Route = createFileRoute(
	'/_layout/_auth/_admins/referenceBooks/countries'
)({
	component: () => <CountriesBookPage />
})
