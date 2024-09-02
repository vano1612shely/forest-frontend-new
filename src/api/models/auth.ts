import { CustomerApiModel } from "@/api/models/authCustomer.ts";

export interface LoginRequestBody {
  login: string;
  password: string;
  signed_string?: string;
}

export interface LoginResponse {
  result: {
    token: string;
    user: MeApiModel;
    customer: CustomerApiModel;
  };
}

export enum UserRoles {
  ROLE_SUPER_ADMIN = "ROLE_SUPER_ADMIN",
}

export interface MeApiModel {
  date_created_at?: string;
  balance?: number;
  used_fee?: number;
  id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  is_blocked?: boolean;
  roles?: UserRoles[];
  selected_organization?: {
    id: string;
    is_resident: boolean;
    participates_in_ads: boolean;
    type: string;
    status: string;
    title: [
      {
        id: string;
        language: { lang_key: string };
        title: string;
      },
    ];
  };
}

export interface LogoutResponse {
  logout: string;
}
