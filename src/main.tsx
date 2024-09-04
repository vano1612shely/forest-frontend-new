import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "@/store/auth.store.ts";
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
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    user: undefined!,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
function App() {
  const user = useAuthStore((state) => state);
  return <RouterProvider router={router} context={{ queryClient, user }} />;
}
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster />
      </QueryClientProvider>
    </StrictMode>,
  );
}
