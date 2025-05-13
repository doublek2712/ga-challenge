import { createFileRoute } from '@tanstack/react-router'
import { UsersPage } from '../../pages/users'

export const Route = createFileRoute('/users/')({
  beforeLoad: () => {
    document.title = 'Users';
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <UsersPage />
}
