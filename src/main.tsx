import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { appConfig } from "@/config.ts";
// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";
// if (process.env.NODE_ENV !== "development") {
//   Sentry.init({
//     dsn: appConfig.SentryDSN,
//     integrations: [new Integrations.BrowserTracing()],
//     tracesSampleRate: 1.0,
//   });
// }
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    SIGN_DATA_BY_ESD?: Function | null;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    CALLBACK_SIGN_DATA_BY_ESD?: Function | null;
    PREVENT_CHECK_SIGNATURES_SERIAL_ON_FRONT_END?: boolean;
  }
}
const queryClient = new QueryClient();
// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
}
