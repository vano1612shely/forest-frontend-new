import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { UserState } from '@/types/User.ts'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const getStatusName = (status: string) => {
	switch (status) {
		case UserState.STATUS_ACTIVE:
			return 'Активний'
		case UserState.STATUS_NOT_CONFIRMED:
			return 'Не підтверджений'
		case UserState.STATUS_ALL:
			return 'Всі'
		default:
			return ''
	}
}

export const findTitleByLang = (title: any = [], lang: string = 'ua') => {
	if (title && Array.isArray(title)) {
		return title.find((t: any) => t?.language?.lang_key === lang)?.title
	}

	if (typeof title === 'object' && title !== null) {
		return title.title
	}

	return ''
}

export const serializeURLEncoded = (values: any) => {
	const data = new URLSearchParams()

	for (const [key, value] of Object.entries(values)) {
		data.append(key, value as string)
	}

	return data
}
