import { Title } from "@/types/types.ts";

export interface IGetNotificationsListParams {
  page?: number;
  search?: string;
  limit?: number;
  to_read: boolean;
}
export interface INotification {
  id: string;
  contract:
    | false
    | {
        id: string;
        number: string;
      };
  date_created_at: Date;
  is_read: boolean;
  type: string;
  message: {
    [lang_key: string]: string;
  };
  trading?: {
    id: string;
    is_use_unified_account: boolean;
    number: number;
    title: Title[];
  };
}
export interface ListNotificationsResponse {
  status: string;
  result: {
    current_page: number;
    per_page: number;
    last_page: number;
    result: INotification[];
    total: number;
    total_unread: number;
  };
  error?: string;
}
