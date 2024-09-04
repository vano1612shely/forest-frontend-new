import { ISecurityGroup } from "@/types/Roles.ts";

export enum UserState {
  STATUS_ACTIVE = "STATUS_ACTIVE",
  STATUS_NOT_CONFIRMED = "STATUS_NOT_CONFIRMED",
  STATUS_ALL = "all",
}

export interface IPhone {
  id: string;
  phone: string;
}

export interface ISignaturesSerial {
  id: string;
  signatures_serial: string;
}

export interface LoginUser {
  login: string;
  password: string;
  signed_string?: string;
}

export interface User {
  created_by_user: {
    date_created_at: string;
    email: string;
    first_name: string;
    id: string;
    is_blocked: boolean;
    last_name: string;
    status: string;
  };
  date_created_at: string;
  email: string;
  first_name: string;
  id: string;
  is_blocked: boolean;
  last_name: string;
  middle_name: string;
  phones: IPhone[] | string[] | [] | any;
  status: UserState.STATUS_ACTIVE | UserState.STATUS_NOT_CONFIRMED;
  selected_organization: any;
  security_groups: ISecurityGroup[];
  organizations: any[];
}
