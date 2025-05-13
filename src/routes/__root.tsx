import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Sidebar } from '../components/sidebar'
import { AlbumIcon, User2Icon } from 'lucide-react'

const mainNavigations = [
  { to: '/albums', label: 'Albums', icon: <AlbumIcon /> },
  { to: '/users', label: 'Users', icon: <User2Icon /> },
]

export const Route = createRootRoute({
  component: () => (
    <div className='min-h-full flex gap-0 bg-white'>
      <Sidebar routes={mainNavigations} />
      <main className='mt-16 mb-8 mx-2 py-6 px-8 flex-1 min-h-full rounded-2xl bg-gray-100 overflow-hidden'>
        <Outlet />
      </main>
    </div>
  ),
  notFoundComponent: () =>
    <div>
      Not Found
    </div>,
})