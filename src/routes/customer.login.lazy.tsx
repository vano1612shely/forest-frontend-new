import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/customer/login')({
  component: () => <div>Hello /customer/login!</div>
})