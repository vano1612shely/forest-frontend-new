import { httpClient } from "@/api/api.ts";
import { serialize } from "object-to-formdata";
import { queryOptions } from "@tanstack/react-query";
import { IUserListParams, ListAdminsResponse } from "./types.ts";

export const fetchAdminList = async (params: IUserListParams | null = null) => {
  const formData = serialize({
    ...params,
    filters: [...(params?.filters ? params.filters : [])],
  });
  return await httpClient.post<any, ListAdminsResponse>({
    url: "/api/v1/users",
    payload: formData,
  });
};

export const adminListQueryOptions = (params: IUserListParams | null = null) =>
  queryOptions({
    queryKey: ["adminList"],
    queryFn: () => fetchAdminList(params),
  });
