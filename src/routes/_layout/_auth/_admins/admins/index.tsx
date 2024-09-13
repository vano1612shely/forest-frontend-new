import { createFileRoute } from "@tanstack/react-router";
import { AdminListPage } from "@/pages/admins/adminList";
export const Route = createFileRoute("/_layout/_auth/_admins/admins/")({
  component: () => <AdminListPage />,
});
