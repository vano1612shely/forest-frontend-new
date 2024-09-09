import { queryOptions } from '@tanstack/react-query'
import { serialize } from 'object-to-formdata'

import { httpClient } from '@/api/api.ts'
import { NotificationsEndpoints } from '@/api/endpoints.ts'
import {
	IGetNotificationsListParams,
	ListNotificationsResponse
} from '@/api/notifications/types.ts'

export const fetchNotifications = async (
	params: IGetNotificationsListParams | null = null
) => {
	const { ...rest } = params
	const formData = serialize(rest)
	return await httpClient.post<any, ListNotificationsResponse>({
		url: NotificationsEndpoints.GetNotificationsList,
		payload: formData
	})
}

export const notificationOptions = (
	params: IGetNotificationsListParams | null = null
) =>
	queryOptions({
		queryKey: ['notifications'],
		queryFn: () => fetchNotifications(params)
	})

export const notificationPageOptions = (
	params: IGetNotificationsListParams | null = null
) =>
	queryOptions({
		queryKey: ['notifications', params?.page || 1],
		queryFn: () => fetchNotifications(params)
	})
