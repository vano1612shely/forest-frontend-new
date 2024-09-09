import { queryOptions } from '@tanstack/react-query'
import { serialize } from 'object-to-formdata'

import { httpClient } from '@/api/api.ts'
import { OrganizationEndpoints } from '@/api/endpoints.ts'
import {
	IOrganizationsListParams,
	ListOrganizationsResponse
} from '@/api/organizations/types.tsx'

export const fetchOrganizationsList = async (
	params: IOrganizationsListParams | null = null
) => {
	const formData = serialize({
		...params,
		filters: [...(params?.filters ? params.filters : [])]
	})
	return await httpClient.post<any, ListOrganizationsResponse>({
		url: OrganizationEndpoints.GetListOrganization,
		payload: formData
	})
}

export const organizationListOptions = (
	params: IOrganizationsListParams | null = null
) =>
	queryOptions({
		queryKey: ['organizationsList', params?.page || 1, params?.filters],
		queryFn: () => fetchOrganizationsList(params)
	})

export const updateOrganizationEodData = async () => {
	return await httpClient.post<any, any>({
		url: OrganizationEndpoints.UpdateOrganizationEOD
	})
}
