import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/_auth")({
  beforeLoad: ({ context, location }) => {
    if (!context.user?.is_auth) {
      throw redirect({
        to: "/customer/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
