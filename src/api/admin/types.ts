import { ISecurityGroup } from '@/types/Roles.ts'
import { UserState } from '@/types/User.ts'
import { IPhone } from '@/types/types.ts'

export interface IUserListParams {
	page?: number
	search?: string
	limit?: number
	filters?: [{ status: UserState; is_deleted: 0 | 1 }]
	orders?: [{ number?: string }]
}

export type Admin = {
	created_by_user?: Admin
	date_created_at: Date
	date_last_activity_at: Date
	description: string
	email: string
	first_name: string
	id: string
	is_blocked: boolean
	last_name: string
	status: UserState.STATUS_ACTIVE | UserState.STATUS_NOT_CONFIRMED
}

export interface ListAdminsResponse {
	status: string
	result: {
		total: number
		current_page: number
		per_page: number
		last_page: number
		result: Admin[]
	}
	error?: string
}

export interface AdminDetails extends Admin {
	confirm: any[]
	phones: IPhone[]
	security_groups: ISecurityGroup[]
	email_confirm: any[]
	email_sent: any[]
}

export interface AdminDetailsResponse {
	result: AdminDetails
	status: string
}

export interface CreateAdminRequestBody {
	email: string
	password: string
	phones: Array<string>
	first_name: string
	last_name: string
	description?: string
	role: 'ADMIN' | 'OBSERVER'
}

export interface EditAdminRequestBody {
	id: string
	email?: string
	password?: string
	is_blocked?: boolean | 0 | 1
	phones?: IPhone[]
	name?: string
	surname?: string
	description?: string
	ids_groups?: string | string[]
	first_name?: string
	last_name?: string
}

export interface CreateAdminResponse {
	status: string
	result: {
		confirm: []
		id: string
		email: string
		roles: []
		phones: IPhone[]
	}
}

export interface EditAdminResponse {
	status: string
	result: {
		id: string
		email: string
		roles: any[]
		phones: IPhone[]
	}
	error?: string
}
