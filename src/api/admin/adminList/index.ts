import { queryOptions } from '@tanstack/react-query'
import { serialize } from 'object-to-formdata'

import { httpClient } from '@/api/api.ts'
import { UsersEndpoint } from '@/api/endpoints.ts'

import { IUserListParams, ListAdminsResponse } from './types.ts'

export const fetchAdminList = async (params: IUserListParams | null = null) => {
	const formData = serialize({
		...params,
		filters: [...(params?.filters ? params.filters : [])]
	})
	return await httpClient.post<any, ListAdminsResponse>({
		url: UsersEndpoint.ListOfUsers,
		payload: formData
	})
}

export const adminListQueryOptions = (params: IUserListParams | null = null) =>
	queryOptions({
		queryKey: ['adminList'],
		queryFn: () => fetchAdminList(params)
	})
