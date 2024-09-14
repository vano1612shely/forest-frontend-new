export type Title = {
	language: {
		lang_key: string
	}
	title: string
}

export type ITitleWithDescription = Title & {
	description?: string
}

export type TitleFromEod = Title & {
	id: string
}

export interface IPhone {
	id?: string
	phone: string
}

export enum TradingCategoryType {
	TYPE_LUMBER = 'TYPE_LUMBER',
	TYPE_WOOD = 'TYPE_WOOD',
	TYPE_AUCTION = 'TYPE_AUCTION',
	TYPE_REDUCTION = 'TYPE_REDUCTION',
	TYPE_SPECIAL = 'TYPE_SPECIAL',
	TYPE_DUTCH_AUCTION = 'TYPE_DUTCH_AUCTION',
	TYPE_EXPORT = 'TYPE_EXPORT',
	TYPE_6M = 'TYPE_6M'
}

export type QualityClass = 'A' | 'B' | 'C' | 'D' | '-' | number

export interface IResponsePagination<T> {
	result: {
		total: number
		current_page: number
		per_page: number
		last_page: number
		result: T
	}
	status: string
	error?: string
}
