import { ITitleWithDescription, Title } from '@/types/types.ts'

export interface ICountry {
	alpha2_code: string
	id: string
	is_updated_from_eod: boolean
	title: Title[]
}

export interface IRegion {
	country: ICountry
	id: string
	title: Title[]
}

export interface CreateRegionRequestBody {
	id_country: string
	title: {
		ua: string
		en: string
	}
}

export interface UpdateRegionRequestBody {
	id: string
	id_country: string
	title: {
		ua: string
		en: string
	}
}
export interface IDirectoryTaxes {
	id: string
	tax_percent: number
	title: ITitleWithDescription[]
}

export interface CreatDirectoryTaxesRequestBody {
	tax_percent: number
	title: {
		ua: string
		en: string
	}
	description: {
		ua: string
		en: string
	}
}

export interface UpdateDirectoryTaxesRequestBody {
	id: string
	tax_percent: number
	title: {
		ua: string
		en: string
	}
	description: {
		ua: string
		en: string
	}
}

export interface IDirectoryOwnership {
	id: string
	title: ITitleWithDescription[]
}

export interface CreatDirectoryOwnershipRequestBody {
	title: {
		ua: string
		en: string
	}
	description: {
		ua: string
		en: string
	}
}

export interface UpdateDirectoryOwnershipRequestBody {
	id: string
	title: {
		ua: string
		en: string
	}
	description: {
		ua: string
		en: string
	}
}

export interface IMinimumTransportationsOptions {
	id: string
	is_autofill: false
	minimal_transport_part: number
	assortment?: {
		is_approved: boolean
		title: Title[]
	}
	species: {
		is_approved: boolean
		title: Title[]
	}
}

export interface ISpeciesItem {
	id: string
	is_approved: boolean
	relations: any[]
	title: Title[]
}

export interface IAssortmentItem {
	id: string
	is_approved: boolean
	relations: any[]
	title: Title[]
}

export interface CreateDirectoryMinimumTransportationsRequestBody {
	species: string
	assortment: string
	minimal_transport_part: number
}

export interface UpdateDirectoryMinimumTransportationsRequestBody {
	id: string
	species?: string
	assortment?: string
	minimal_transport_part?: number
}
