import { createFileRoute } from "@tanstack/react-router";
import { NotificationsPage } from "@/pages/notifications";

export const Route = createFileRoute("/_layout/_auth/notifications")({
  component: () => <NotificationsPage />,
});
