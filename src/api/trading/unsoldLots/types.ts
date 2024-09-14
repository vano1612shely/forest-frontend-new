import { QualityClass, Title } from '@/types/types.ts'

export interface ITradingListParamsUnsoldLots {
	category?: string
	page?: number
	search?: string
	limit?: number
	trading_end_date?: string
	species?: string
	quality_class?: string
	seller_usreou?: number
	diameter_id?: string
	width?: string
	height?: string
	length?: string
	humidity_id?: string
	date?: string
}
export interface ITradingUnsoldLot {
	assortment?: string
	cost_in_cents: number
	description?: string
	diameter?: string
	id: string
	is_blocked: boolean
	length?: string
	lot_positions: ITradingUnsoldLot[]
	measure?: {
		id: string
		title: Title[]
	}
	name: string
	number: number
	number_position?: number
	pdv: string
	price_in_cents?: number
	production_data?: {
		assortment: { title: Title[] }
		quality_class: { title: Title[] }
		species: { title: Title[] }
		warehouse: { title: Title[] }
		wood_diameter: { title: Title[] }
		wood_length: { title: Title[] }
	}
	quality_class?: QualityClass
	quantity?: number
	seller: string
	seller_usreou: string
	species?: string
	regional_office?: string
	station?: string
	stock_number?: string
	trading: {
		number: number
	}
	volume?: number
	warehouse?: string
	transport_cost_in_cents?: number
	transport_price_in_cents?: number
	delivery_terms?: string
	height?: string
	humidity?: string
}

export interface IFetchUnsoldFileResult {
	status: string
	result: {
		file_base64: string
		file_name: string
	}
}
