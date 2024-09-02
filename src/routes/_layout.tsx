import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "@/components/header";

export const Route = createFileRoute("/_layout")({
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
});
