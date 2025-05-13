import { createFileRoute, redirect } from '@tanstack/react-router'
import { AlbumsPage } from '../../pages/albums'
import { DEFAULT_ALBUMS_CURRENT_PAGE, DEFAULT_ALBUMS_PAGE_SIZE } from '../../lib/constants/pagination';

export const Route = createFileRoute('/albums/')({
  beforeLoad: async ({ search }) => {
    const hasParams = 'pageSize' in search && 'currentPage' in search;
    if (!hasParams) {
      throw redirect({
        to: '/albums',
        search: { pageSize: DEFAULT_ALBUMS_PAGE_SIZE, currentPage: DEFAULT_ALBUMS_CURRENT_PAGE },
        replace: true,
      });
    }
  },
  component: () => <AlbumsPage />,
})
