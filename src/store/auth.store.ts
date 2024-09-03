import { create } from "zustand";
import { httpClient } from "@/api/api.ts";

type State = {
  is_auth: boolean;
  token: string;
  user: any;
};

type Action = {
  login: (email: string, password: string) => void;
};

export const useAuthStore = create<State & Action>((set) => ({
  is_auth: false,
  token: "",
  user: {},
  login: async (email: string, password: string) => {
    const res = await httpClient.login({
      url: "/api/v1/login",
      payload: { login: email, password: password },
    });
    console.log(res);
    set({
      is_auth: true,
      token: res.result.token,
      user: res.result.user,
    });
  },
}));
