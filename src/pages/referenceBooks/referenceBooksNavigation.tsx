import { Link } from '@tanstack/react-router'

import { Card } from '@/components/ui/card.tsx'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area.tsx'

import { cn } from '@/lib/utils.ts'

type CurrentPage =
	| 'countries'
	| 'directoryAreas'
	| 'directoryTaxes'
	| 'formsOwnership'
	| 'directoryMinimumTransportation'
	| 'directoryStationDelivery'
	| 'directoryMeasures'
	| 'directoryWoodDiameter'
	| 'directoryWoodHumidity'
	| 'directoryAssortment'
	| 'directorySpecies'
	| 'directoryQualityClass'
	| 'directoryWarehouse'
	| 'directoryTradingType'
	| 'directoryVarieties'
	| 'directoryPlacesSupply'
	| 'deviationDeliverySchedule'
	| 'directoryCategories'
const pages = [
	{
		title: 'Довідник країн',
		id: 'countries',
		link: '/referenceBooks/countries'
	},
	{
		title: 'Довідник областей',
		id: 'directoryAreas',
		link: '/referenceBooks/directoryAreas'
	},
	{
		title: 'Форми оподаткування',
		id: 'directoryTaxes',
		link: '/referenceBooks/directoryTaxes'
	},
	{
		title: 'Форми власності',
		id: 'formsOwnership',
		link: '/referenceBooks/formsOwnership'
	},
	{
		title: 'Мінімальний розмір транспортування',
		id: 'directoryMinimumTransportation',
		link: '/referenceBooks/directoryMinimumTransportation'
	},
	{
		title: 'Довідник станцій доставки',
		id: 'directoryStationDelivery',
		link: '/referenceBooks/directoryStationDelivery'
	},
	{
		title: 'Довідник мір',
		id: 'directoryMeasures',
		link: '/referenceBooks/directoryMeasures'
	},
	{
		title: 'Довідник Діаметр деревини',
		id: 'directoryWoodDiameter',
		link: '/referenceBooks/directoryWoodDiameter'
	},
	{
		title: 'Довідник вологості деревини',
		id: 'directoryWoodHumidity',
		link: '/referenceBooks/directoryWoodHumidity'
	},
	{
		title: 'Довідник Сортименту',
		id: 'directoryAssortment',
		link: '/referenceBooks/directoryAssortment'
	},
	{
		title: 'Довідник Порід',
		id: 'directorySpecies',
		link: '/referenceBooks/directorySpecies'
	},
	{
		title: 'Довідник Класу якості',
		id: 'directoryQualityClass',
		link: '/referenceBooks/directoryQualityClass'
	},
	{
		title: 'Довідник Склад',
		id: 'directoryWarehouse',
		link: '/referenceBooks/directoryWarehouse'
	},
	{
		title: 'Довідник Тип торгів',
		id: 'directoryTradingType',
		link: '/referenceBooks/directoryTradingType'
	},
	{
		title: 'Довідник Гатунку',
		id: 'directoryVarieties',
		link: '/referenceBooks/directoryVarieties'
	},
	{
		title: 'Довідник Умови постачання',
		id: 'directoryPlacesSupply',
		link: '/referenceBooks/directoryPlacesSupply'
	},
	{
		title: 'Довідник Відхилення виконання ГП',
		id: 'deviationDeliverySchedule',
		link: '/referenceBooks/deviationDeliverySchedule'
	},
	{
		title: 'Довідник категорій',
		id: 'directoryCategories',
		link: '/referenceBooks/directoryCategories'
	}
]
export const ReferenceBookNavigation = ({
	current_page
}: {
	current_page: CurrentPage
}) => {
	return (
		<Card className='px-3 mb-5 relative'>
			<ScrollArea className='p-0'>
				<ScrollBar orientation='horizontal' />
				<div className='flex flex-row gap-2 items-center'>
					{pages.map(p => {
						return (
							<Link
								key={p.id}
								to={p.link}
								className={cn(
									'inline-block whitespace-nowrap p-[12px] text-center text-[0.875rem] leading-[1.75]',
									p.id === current_page
										? 'border-b-2 text-primary border-b-primary'
										: ''
								)}
							>
								{p.title}
							</Link>
						)
					})}
				</div>
			</ScrollArea>
		</Card>
	)
}
