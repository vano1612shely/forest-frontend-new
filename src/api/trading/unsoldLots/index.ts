import { queryOptions } from '@tanstack/react-query'
import { serialize } from 'object-to-formdata'

import { IResponsePagination } from '@/types/types.ts'

import { httpClient } from '@/api/api.ts'
import { TradingEndpoints } from '@/api/endpoints.ts'
import { OrganizationListItem } from '@/api/organizations/types.tsx'
import {
	IFetchUnsoldFileResult,
	ITradingListParamsUnsoldLots
} from '@/api/trading/unsoldLots/types.ts'

const fetchTradingUnsoldLots = async (
	params: ITradingListParamsUnsoldLots | null = null
) => {
	const formData = serialize({
		...params
	})
	return await httpClient.post<
		any,
		IResponsePagination<OrganizationListItem[]>
	>({
		url: TradingEndpoints.GetUnsoldLots,
		payload: formData
	})
}

export const tradingUnsoldLotsOptions = (
	params: ITradingListParamsUnsoldLots | null = null
) =>
	queryOptions({
		queryKey: ['unsoldLots', params],
		queryFn: () => fetchTradingUnsoldLots({ ...params })
	})

export const downloadUnsoldLots = async (params: {
	category: string
	lots_ids: string[]
}) => {
	const formData = serialize({
		...params
	})
	return await httpClient.post<any, IFetchUnsoldFileResult>({
		url: TradingEndpoints.ExportTradingUnsoldLots,
		payload: formData
	})
}
