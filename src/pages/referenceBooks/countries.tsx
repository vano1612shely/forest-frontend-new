import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button.tsx'
import { Card } from '@/components/ui/card.tsx'

export const CountriesBookPage = () => {
	return (
		<div className='page__container'>
			<Card className='page__table-card-full-size'>
				<div className='page__table-header'>
					<h1 className='page__title'>Довідник країн</h1>
					<Button className='flex items-center gap-2'>
						Додати <Plus />
					</Button>
				</div>
			</Card>
		</div>
	)
}
