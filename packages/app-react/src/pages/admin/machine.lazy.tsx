import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/machine')({
  component: () => <div>Hello /admin/machine!</div>
})
