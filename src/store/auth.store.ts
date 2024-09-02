import { create } from "zustand";

type State = {
  is_auth: boolean;
  token: string;
  user: any;
};

export const useAuthStore = create<State>((set) => ({
  is_auth: false,
  token: "",
  user: {},
}));
