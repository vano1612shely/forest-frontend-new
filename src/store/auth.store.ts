import { create } from "zustand";
import { User } from "@/types/User.ts";
import { Roles } from "@/types/Roles.ts";

export type AuthState = {
  is_auth: boolean;
  token: string;
  lang_key: "ua" | "en";
  user: User | null;
  roles: Roles[];
};

export type AuthAction = {
  login: (token: string, user: User) => void;
  loadFromStore: () => void;
  clear: () => void;
};

const initialState: AuthState = {
  is_auth: false,
  lang_key: "ua",
  token: "",
  roles: [Roles.Anonymous],
  user: null,
};

export const useAuthStore = create<AuthState & AuthAction>((set) => ({
  ...initialState,
  login: (token: string, user: User) => {
    set({
      is_auth: true,
      token: token,
      user: user,
      roles: user.security_groups.map((i) => i.slug),
    });
  },
  loadFromStore: () => {
    if (localStorage.getItem("authResponse")) {
      const data = JSON.parse(localStorage.getItem("authResponse") as string);
      set({
        is_auth: true,
        token: data.token,
        user: data.user,
        roles: data.user.security_groups.map((i: any) => i.slug),
      });
    }
  },
  clear: () => {
    set({
      is_auth: false,
      token: "",
      user: null,
    });
  },
}));
