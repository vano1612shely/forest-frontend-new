import { createFileRoute, redirect } from "@tanstack/react-router";
import { Roles } from "@/types/Roles.ts";
const roles: Roles[] = [Roles.Administrator];
export const Route = createFileRoute("/_layout/_admins")({
  beforeLoad: ({ context, location }) => {
    if (
      !context.user?.is_auth ||
      !context.user.roles.some((role) => roles.includes(role))
    ) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
