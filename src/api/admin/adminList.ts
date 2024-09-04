import { httpClient } from "@/api/api.ts";
import { UserState } from "@/types/User.ts";
import { serialize } from "object-to-formdata";
import { queryOptions } from "@tanstack/react-query";
import { Admin } from "@/types/Admin.ts";

export interface IUserListParams {
  page?: number;
  search?: string;
  limit?: number;
  filters?: [{ status: { id: UserState } }];
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

export const fetchAdminList = async (params: IUserListParams | null = null) => {
  const formData = serialize({
    ...params,
    filters: [...(!!params?.filters ? params?.filters : [])],
  });
  const res = await httpClient.post<any, ListAdminsResponse>({
    url: "/api/v1/users",
    payload: formData,
  });
  return res;
};

export const adminListQueryOptions = (params: IUserListParams | null = null) =>
  queryOptions({
    queryKey: ["adminList"],
    queryFn: () => fetchAdminList(params),
  });
