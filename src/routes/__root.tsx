import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useServerTimeStore } from "@/store/serverTime.store.ts";
import { useEffect } from "react";
import { AuthState, useAuthStore } from "@/store/auth.store.ts";
import { QueryClient } from "@tanstack/react-query";

const RootElement = () => {
  const fetchDateTime = useServerTimeStore((state) => state.fetchDateTime);
  const clearDateTime = useServerTimeStore((state) => state.clearDateTime);
  const loadFromStorage = useAuthStore((state) => state.loadFromStore);
  const clearUser = useAuthStore((state) => state.clear);
  useEffect(() => {
    loadFromStorage();
    fetchDateTime();
    window.addEventListener("stor", (event) => {
      console.log(event, localStorage.getItem("authResponse"));
      if (!localStorage.getItem("authResponse")) {
        clearUser();
      }
    });
    const interval = setInterval(() => {
      fetchDateTime();
    }, 60000);
    return () => {
      clearInterval(interval);
      clearDateTime();
    };
  }, []);
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  user: AuthState | null;
}>()({
  component: RootElement,
});

export default Route;
