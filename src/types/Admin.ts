import { UserState } from "@/types/User.ts";

export type Admin = {
  created_by_user?: Admin;
  date_created_at: Date;
  date_last_activity_at: Date;
  description: string;
  email: string;
  first_name: string;
  id: string;
  is_blocked: boolean;
  last_name: string;
  status: UserState.STATUS_ACTIVE | UserState.STATUS_NOT_CONFIRMED;
};
