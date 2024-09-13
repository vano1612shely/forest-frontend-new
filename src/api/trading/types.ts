import { Title } from '@/types/types.ts'

export interface IFetchTradingFiltersResult {
	status: string
	result: {
		diameter: { id: string; title: Title }[]
		height: { name: string }[]
		humidity: { id: string; title: Title }[]
		length_value: { name: string }[]
		quality_class: { name: string }[]
		species: { name: string }[]
		width: { name: string }[]
	}
}
