import { queryOptions } from '@tanstack/react-query'
import { serialize } from 'object-to-formdata'

import { httpClient } from '@/api/api.ts'
import { TradingEndpoints } from '@/api/endpoints.ts'
import { IFetchTradingFiltersResult } from '@/api/trading/types.ts'

interface FiltersParam {
	category: 'wood' | 'lumber'
}
export const fetchTradingFilters = async (params: FiltersParam) => {
	const formData = serialize({
		...params
	})
	return await httpClient.post<any, IFetchTradingFiltersResult>({
		url: TradingEndpoints.GetUnsoldLotsFilters,
		payload: formData
	})
}

export const tradingFiltersOptions = (params: FiltersParam) =>
	queryOptions({
		queryKey: ['filters', params],
		queryFn: () => fetchTradingFilters({ ...params })
	})
