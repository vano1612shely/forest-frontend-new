import { ISecurityGroup } from "@/api/models/ISecurityGroup.ts";

export interface CustomerApiModel {
  api_token?: string;
  email?: string;
  balance?: number;
  used_fee?: number;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  id?: string;
  is_blocked?: boolean;
  middle_name?: string;
  signatures_serial?: [
    {
      serial: String;
    },
  ];
  organizations?: [
    {
      id: string;
      status: string;
      title: [
        {
          id: string;
          language: { lang_key: string };
          title: string;
        },
      ];
    },
  ];
  security_groups?: ISecurityGroup[];
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
  status?: string;
}

export interface LoginCustomerResponse {
  result: {
    token: string;
    customer: CustomerApiModel;
  };
}

export interface CustomerMeResponse {
  result: CustomerApiModel;
}
