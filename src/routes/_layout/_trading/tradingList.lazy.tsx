import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/_trading/tradingList")({
  component: () => <div>Hello /_layout/trading/tradingList!</div>,
});
