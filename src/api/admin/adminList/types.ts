import { UserState } from "@/types/User.ts";
import { Admin } from "@/types/Admin.ts";

export interface IUserListParams {
  page?: number;
  search?: string;
  limit?: number;
  filters?: [{ status: UserState }];
  orders?: [{ number?: string }];
}
export interface ListAdminsResponse {
  status: string;
  result: {
    total: number;
    current_page: number;
    per_page: number;
    last_page: number;
    result: Admin[];
  };
  error?: string;
}
