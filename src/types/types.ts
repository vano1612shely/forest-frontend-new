export type Title = {
	language: {
		lang_key: string
	}
	title: string
}

export type TitleFromEod = {
	id: string
	language: {
		lang_key: string
	}
	title: string
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
