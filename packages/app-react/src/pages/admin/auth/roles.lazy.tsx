import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/auth/roles')({
  component: () => <div>Hello /auth/auth/roles!</div>
})