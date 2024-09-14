import { queryOptions } from '@tanstack/react-query'
import { serialize } from 'object-to-formdata'

import { IResponsePagination } from '@/types/types.ts'

import { httpClient } from '@/api/api.ts'
import {
	CreateEditAdminEndpoints,
	UsersEndpoint,
	getApiUrlForId
} from '@/api/endpoints.ts'

import {
	Admin,
	AdminDetailsResponse,
	CreateAdminRequestBody,
	CreateAdminResponse,
	EditAdminRequestBody,
	EditAdminResponse,
	IUserListParams
} from './types.ts'

export const fetchAdminList = async (params: IUserListParams | null = null) => {
	const formData = serialize({
		...params,
		filters: [...(params?.filters ? params.filters : [])]
	})
	return await httpClient.post<any, IResponsePagination<Admin[]>>({
		url: UsersEndpoint.ListOfUsers,
		payload: formData
	})
}
export const adminListQueryOptions = (params: IUserListParams | null = null) =>
	queryOptions({
		queryKey: ['adminList', params],
		queryFn: () => fetchAdminList(params)
	})

export const fetchAdminDetails = async (id: string) => {
	return await httpClient.get<any, AdminDetailsResponse>({
		url: getApiUrlForId(UsersEndpoint.GetUserModel, id)
	})
}

export const adminDetailsQueryOptions = (id: string) =>
	queryOptions({
		queryKey: ['adminDetails', id],
		queryFn: () => fetchAdminDetails(id)
	})

export const createAdmin = async (
	values: CreateAdminRequestBody | null = null
) => {
	const formData = serialize(values)
	return await httpClient.post<any, CreateAdminResponse>({
		url: CreateEditAdminEndpoints.CreateAdmin,
		payload: formData
	})
}

export const updateAdmin = async (values: EditAdminRequestBody) => {
	const formData = serialize(values, { indices: true })
	return await httpClient.post<any, EditAdminResponse>({
		url: CreateEditAdminEndpoints.EditAdmin,
		payload: formData
	})
}
export const deleteAdmin = async (id: string) => {
	return await httpClient.delete<any, any>({
		url: getApiUrlForId(UsersEndpoint.SoftDeleteUser, id)
	})
}
