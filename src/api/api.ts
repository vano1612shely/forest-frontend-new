import axios, { AxiosRequestConfig } from 'axios'

import { LoginUser } from '@/types/User.ts'

import { useAuthStore } from '@/store/auth.store.ts'

export interface IHttpClientRequestParameters<T> {
	url: string
	payload?: T
	contentType?: string
	data?: any
	params?: T
}

export interface IHttpClient {
	login(parameters: IHttpClientRequestParameters<LoginUser>): Promise<any>
	logout(parameters: any): Promise<any>
	get<T, U>(parameters: IHttpClientRequestParameters<T>): Promise<U>
	post<T, U>(parameters: IHttpClientRequestParameters<T>): Promise<U>
	patch<T, U>(parameters: IHttpClientRequestParameters<T>): Promise<U>
	put<T, U>(parameters: IHttpClientRequestParameters<T>): Promise<U>
	delete<T, U>(parameters: IHttpClientRequestParameters<T>): Promise<U>
	isLoggedIn(): boolean
}
export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BASE_API_URL
})

export const LocalStorageTokenKey = 'authToken'
export const LocalStorageAuthDataKey = 'authResponse'

class HttpClient implements IHttpClient {
	constructor() {
		const token = localStorage.getItem(LocalStorageTokenKey)

		if (token) {
			axiosInstance.defaults.headers.token = token
			const current_customer_serial = localStorage.getItem('signature_serial')
			if (current_customer_serial)
				axiosInstance.defaults.headers['current-customer-serial'] =
					current_customer_serial
		}
	}

	checkUnauthorizedError(status: number): void {
		if (status === 401) {
			localStorage.removeItem(LocalStorageTokenKey)
			localStorage.removeItem(LocalStorageAuthDataKey)

			window.SIGN_DATA_BY_ESD = null
			delete axiosInstance.defaults.headers.token
			delete axiosInstance.defaults.headers['current-customer-serial']
			useAuthStore.getState().clear()
		}
	}

	async login(parameters: IHttpClientRequestParameters<LoginUser>) {
		const { url, payload } = parameters

		const formData = new FormData()
		if (payload?.login) {
			formData.append('login', payload.login)
			formData.append('password', payload.password)
			formData.append('signed_string', payload.signed_string || '')
		}

		const options = {
			headers: { 'content-type': 'multipart/form-data' }
		}

		delete axiosInstance.defaults.headers.token

		const res = await axiosInstance.post(url, formData, options)
		const data = res.data
		const token = data.result.token

		axiosInstance.defaults.headers.token = token

		localStorage.setItem(LocalStorageAuthDataKey, JSON.stringify(data.result))
		localStorage.setItem(LocalStorageTokenKey, token)

		return res.data
	}
	async logout(parameters: any) {
		const { url } = parameters
		const options = {
			headers: {}
		}

		const res = await axiosInstance.post(url, null, options)
		localStorage.removeItem(LocalStorageTokenKey)
		localStorage.removeItem(LocalStorageAuthDataKey)
		useAuthStore.getState().clear()
		delete axiosInstance.defaults.headers.token
		return res.data
	}
	async get<T, U>(parameters: IHttpClientRequestParameters<T>): Promise<U> {
		const { url, params, contentType } = parameters

		const options: AxiosRequestConfig = {
			headers: { ...(contentType && { 'content-type': contentType }) },
			params: {}
		}

		if (params) {
			options.params = params
		}
		try {
			const res = await axiosInstance.get(url, options)
			return res.data
		} catch (e: any) {
			this.checkUnauthorizedError(e.response.status)
			return Promise.reject(e)
		}
	}

	async getBlobFile<T>(
		parameters: IHttpClientRequestParameters<T>
	): Promise<any> {
		const { url, params } = parameters

		const options: AxiosRequestConfig = {
			headers: {},
			responseType: 'blob'
		}

		if (params) {
			options.params = params
		}
		try {
			const res = await axiosInstance.get(url, options)
			const isZip =
				res && res.headers && res.headers['content-type'] === 'application/zip'

			return {
				fileBlob: res?.data,
				isZip
			}
		} catch (e: any) {
			this.checkUnauthorizedError(e.response.status)
			return Promise.reject(e)
		}
	}

	async post<T, U>(parameters: IHttpClientRequestParameters<T>): Promise<U> {
		const { url, contentType, payload } = parameters

		const options: AxiosRequestConfig = {
			headers: { 'content-type': contentType || 'multipart/form-data' }
		}
		try {
			const res = await axiosInstance.post(url, payload, options)
			return res.data
		} catch (e: any) {
			this.checkUnauthorizedError(e.response.status)
			return Promise.reject(e)
		}
	}

	async postJSON<T, U>(
		parameters: IHttpClientRequestParameters<T>
	): Promise<U> {
		const { url, payload } = parameters

		try {
			const res = await axiosInstance.post(url, payload)
			return res.data
		} catch (e: any) {
			this.checkUnauthorizedError(e.response.status)
			return Promise.reject(e)
		}
	}

	async patch<T, U>(parameters: IHttpClientRequestParameters<T>): Promise<U> {
		const { url, payload } = parameters

		const options: AxiosRequestConfig = {
			headers: {}
		}
		try {
			const res = await axiosInstance.patch(url, payload, options)
			return res.data
		} catch (e: any) {
			this.checkUnauthorizedError(e.response.status)
			return Promise.reject(e)
		}
	}

	async put<T, U>(parameters: IHttpClientRequestParameters<T>): Promise<U> {
		const { url, payload, params } = parameters

		const options: AxiosRequestConfig = {
			headers: {}
		}

		if (params) {
			options.params = params
		}
		try {
			const res = await axiosInstance.put(url, payload, options)
			return res.data
		} catch (e: any) {
			this.checkUnauthorizedError(e.response.status)
			throw new Error(e)
		}
	}

	async delete<T, U>(parameters: IHttpClientRequestParameters<T>): Promise<U> {
		const { url, contentType, data } = parameters

		const options: AxiosRequestConfig = {
			headers: { ...(contentType && { 'content-type': contentType }) },
			...(data && { data: data })
		}
		try {
			const res = await axiosInstance.delete(url, options)
			return res.data
		} catch (e: any) {
			this.checkUnauthorizedError(e.response.status)
			return Promise.reject(e)
		}
	}

	isLoggedIn() {
		return !!localStorage.getItem(LocalStorageTokenKey)
	}
}

export const httpClient = new HttpClient()
