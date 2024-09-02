import { create } from "zustand";
import { httpClient } from "@/api/api.ts";

type State = {
  current_datetime: string | null;
};

type Action = {
  fetchDateTime: () => void;
  clearDateTime: () => void;
};
export const useServerTimeStore = create<State & Action>((set) => ({
  current_datetime: null,
  fetchDateTime: async () => {
    try {
      const getTime = await httpClient.get<undefined, any>({
        url: "/api/v1/reference/server/info",
      });
      set({ current_datetime: getTime.result.current_datetime });
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  clearDateTime: () => {
    set({ current_datetime: null });
  },
}));
