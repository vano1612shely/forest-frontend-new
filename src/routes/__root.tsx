import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useServerTimeStore } from "@/store/serverTime.store.ts";
import { useEffect } from "react";

const RootElement = () => {
  const fetchDateTime = useServerTimeStore((state) => state.fetchDateTime);
  const clearDateTime = useServerTimeStore((state) => state.clearDateTime);
  useEffect(() => {
    fetchDateTime();
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

export const Route = createRootRoute({
  component: RootElement,
});
