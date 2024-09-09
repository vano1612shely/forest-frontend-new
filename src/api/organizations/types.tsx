import { Title, TitleFromEod, TradingCategoryType } from '@/types/types.ts'

export interface OrganizationCategory {
	id: string
	slug: string
	type: TradingCategoryType
	title: Title
}

export interface OrganizationContactInfo {
	id: string
	phone: string
	phones: string[]
}

export interface OrganizationListItem {
	categories: OrganizationCategory[]
	contact_infos: OrganizationContactInfo[]
	customers: { id: string; date_last_activity_at?: Date }[]
	eod_data?: {
		id: string
		id_region_from_eod: string
		title_from_eod: TitleFromEod[]
	}
	id: string
	is_resident: boolean
	legal_address: {
		city_title?: string
		id: string
	}
	monitoring_status: string
	status: 'STATUS_NOT_CONFIRMED' | 'STATUS_ACTIVE'
	participant_type: string
	usreou: string
	title: Title[]
	ownership?: {
		id: string
		title: Title
	}
	value_added_tax: number
	value_owner_added_tax: number
}

export interface ListOrganizationsResponse {
	status: string
	result: {
		total: number
		current_page: number
		per_page: number
		last_page: number
		result: OrganizationListItem[]
	}
	error?: string
}

export interface IOrganizationsListParams {
	page?: number
	search?: string
	limit?: number
	filters?: [{ is_deleted: 0 | 1; usreou: string; status: string }]
	orders?: [{ number?: string }]
}
