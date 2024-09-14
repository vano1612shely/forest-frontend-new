import { queryOptions } from '@tanstack/react-query'
import { serialize } from 'object-to-formdata'

import { IResponsePagination } from '@/types/types.ts'

import { httpClient } from '@/api/api.ts'
import {
	DirectoryAreasEndpoints,
	DirectoryCountriesEndpoints,
	DirectoryMinimalTransport,
	DirectoryOwnershipEndpoints,
	DirectoryTaxesEndpoints
} from '@/api/endpoints.ts'
import {
	CreatDirectoryOwnershipRequestBody,
	CreatDirectoryTaxesRequestBody,
	CreateDirectoryMinimumTransportationsRequestBody,
	CreateRegionRequestBody,
	IAssortmentItem,
	ICountry,
	IDirectoryOwnership,
	IDirectoryTaxes,
	IMinimumTransportationsOptions,
	IRegion,
	ISpeciesItem,
	UpdateDirectoryMinimumTransportationsRequestBody,
	UpdateDirectoryOwnershipRequestBody,
	UpdateDirectoryTaxesRequestBody,
	UpdateRegionRequestBody
} from '@/api/referenceBooks/types.tsx'

import { serializeURLEncoded } from '@/lib/utils.ts'

export const fetchCountries = async () => {
	return await httpClient.get<any, IResponsePagination<ICountry[]>>({
		url: DirectoryCountriesEndpoints.GetCountries
	})
}

export const countriesOptions = () =>
	queryOptions({
		queryKey: ['countries'],
		queryFn: () => fetchCountries()
	})

export const fetchRegions = async () => {
	return await httpClient.get<any, IResponsePagination<IRegion[]>>({
		url: DirectoryAreasEndpoints.GetAreas
	})
}

export const regionsOptions = () =>
	queryOptions({
		queryKey: ['regions'],
		queryFn: () => fetchRegions()
	})

export const updateRegionsFromEOD = async () => {
	return await httpClient.post<any, any>({
		url: DirectoryAreasEndpoints.UpdateDirectoryAreasEod
	})
}

export const createRegion = async (
	values: CreateRegionRequestBody | null = null
) => {
	const formData = serialize(values, { indices: true })
	return await httpClient.post<any, any>({
		url: DirectoryAreasEndpoints.CreateAreas,
		payload: formData
	})
}

export const updateRegion = async (
	values: UpdateRegionRequestBody | null = null
) => {
	const formData = serialize(values, { indices: true })
	return await httpClient.post<any, any>({
		url: DirectoryAreasEndpoints.UpdateAreas,
		payload: formData
	})
}

export const deleteRegion = async (id: string) => {
	return await httpClient.delete<any, any>({
		url: DirectoryAreasEndpoints.DeleteAreas(id)
	})
}

export const fetchDirectoryTaxes = async () => {
	return await httpClient.get<any, IResponsePagination<IDirectoryTaxes[]>>({
		url: DirectoryTaxesEndpoints.GetTaxes
	})
}

export const directoryTaxesOptions = () =>
	queryOptions({
		queryKey: ['directoryTaxes'],
		queryFn: () => fetchDirectoryTaxes()
	})

export const createDirectoryTaxes = async (
	values: CreatDirectoryTaxesRequestBody
) => {
	const formData = serialize(values, { indices: true })
	return await httpClient.post<any, any>({
		url: DirectoryTaxesEndpoints.CreateTaxes,
		payload: formData
	})
}

export const updateDirectoryTaxes = async (
	values: UpdateDirectoryTaxesRequestBody
) => {
	const formData = serialize(values, { indices: true })
	return await httpClient.post<any, any>({
		url: DirectoryTaxesEndpoints.UpdateTaxes,
		payload: formData
	})
}

export const deleteDirectoryTaxes = async (id: string) => {
	return await httpClient.delete<any, any>({
		url: DirectoryTaxesEndpoints.DeleteTaxes(id)
	})
}

export const fetchDirectoryOwnership = async () => {
	return await httpClient.get<any, IResponsePagination<IDirectoryOwnership[]>>({
		url: DirectoryOwnershipEndpoints.GetOwnership
	})
}

export const directoryOwnershipOptions = () =>
	queryOptions({
		queryKey: ['directoryOwnership'],
		queryFn: () => fetchDirectoryOwnership()
	})

export const createDirectoryOwnership = async (
	values: CreatDirectoryOwnershipRequestBody
) => {
	const formData = serialize(values, { indices: true })
	return await httpClient.post<any, any>({
		url: DirectoryOwnershipEndpoints.CreateOwnership,
		payload: formData
	})
}

export const updateDirectoryOwnership = async (
	values: UpdateDirectoryOwnershipRequestBody
) => {
	const formData = serialize(values, { indices: true })
	return await httpClient.post<any, any>({
		url: DirectoryOwnershipEndpoints.UpdateOwnership,
		payload: formData
	})
}

export const deleteDirectoryOwnership = async (id: string) => {
	return await httpClient.delete<any, any>({
		url: DirectoryOwnershipEndpoints.DeleteOwnership(id)
	})
}

export const fetchDirectoryMinimumTransportations = async (params: any) => {
	return await httpClient.get<
		any,
		IResponsePagination<IMinimumTransportationsOptions[]>
	>({
		url: DirectoryMinimalTransport.DirectoryMinimalTransport,
		params: params
	})
}

export const directoryMinimumTransportationsOptions = (params: any) =>
	queryOptions({
		queryKey: ['directoryMinimumTransportations', params],
		queryFn: () => fetchDirectoryMinimumTransportations(params)
	})

export const createDirectoryMinimumTransportations = async (
	params: CreateDirectoryMinimumTransportationsRequestBody
) => {
	const formData = serialize(params)
	return await httpClient.post<any, any>({
		url: DirectoryMinimalTransport.DirectoryMinimalTransport,
		payload: formData
	})
}

export const updateDirectoryMinimumTransportations = async (
	params: UpdateDirectoryMinimumTransportationsRequestBody
) => {
	const formData = serializeURLEncoded(params)
	return await httpClient.patch<any, any>({
		url: DirectoryMinimalTransport.DirectoryMinimalTransport,
		payload: formData
	})
}

export const deleteDirectoryMinimumTransportations = async (id: string) => {
	const data = serializeURLEncoded({ id: id })
	return await httpClient.delete<any, any>({
		url: DirectoryMinimalTransport.DirectoryMinimalTransport,
		contentType: 'application/x-www-form-urlencoded',
		data
	})
}

export const fetchSpecies = async (params?: any) => {
	const formData = serialize(params)
	return await httpClient.post<any, IResponsePagination<ISpeciesItem[]>>({
		url: '/api/v1/reference/species/list',
		payload: formData
	})
}

export const speciesOptions = (params?: any) =>
	queryOptions({
		queryKey: ['species', params],
		queryFn: () => fetchSpecies(params)
	})

export const fetchAssortment = async (params?: any) => {
	const formData = serialize(params)
	return await httpClient.post<any, IResponsePagination<IAssortmentItem[]>>({
		url: '/api/v1/reference/assortment/list',
		payload: formData
	})
}

export const assortmentOptions = (params?: any) =>
	queryOptions({
		queryKey: ['assortment', params],
		queryFn: () => fetchAssortment(params)
	})
