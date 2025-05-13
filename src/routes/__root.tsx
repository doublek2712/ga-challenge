import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Header } from '../components/header'

const mainNavigations = [
  { to: '/albums', label: 'Albums' },
  { to: '/users', label: 'Users' },]

export const Route = createRootRoute({
  component: () => (
    <main>
      <Header routes={mainNavigations} />
      <Outlet />
    </main>
  ),
  notFoundComponent: () =>
    <main>
      Not Found
    </main>,
})