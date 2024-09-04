import { createFileRoute } from "@tanstack/react-router";
import { AdminListPage } from "@/pages/admins/adminList";
export const Route = createFileRoute("/_layout/_admins/adminList")({
  component: () => <AdminListPage />,
});
