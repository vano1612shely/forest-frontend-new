import { createFileRoute } from '@tanstack/react-router'

import { UnsoldLostPage } from '@/pages/trading/unsoldLost'

export const Route = createFileRoute(
	'/_layout/_trading/tradingList/unsoldLots'
)({
	component: () => <UnsoldLostPage />
})
