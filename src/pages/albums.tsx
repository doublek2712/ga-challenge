import { useQuery } from '@tanstack/react-query'
import { AlbumsService } from '../services/albums/api'
import { getRouteApi, Link, useNavigate } from '@tanstack/react-router'
import { UsersService } from '../services/users/api'
import { Table } from '../components/table'
import { FAKE_ALBUMS_TOTAL_COUNT } from '../lib/constants/pagination'
import { Pagination } from '../components/pagination'
import { EyeIcon } from 'lucide-react'
import { Button } from '../components/button'
import { AVATAR_URL } from '../services/base'

const routeApi = getRouteApi('/albums/')
type RouteSearch = { pageSize: number, currentPage: number }

export const AlbumsPage = () => {
  const navigate = useNavigate()
  const routeSearch = routeApi.useSearch() as RouteSearch

  const albumsQuery = useQuery({
    queryKey: ['albums', routeSearch.pageSize, routeSearch.currentPage],
    queryFn: () => AlbumsService.getAlbums(routeSearch.pageSize, routeSearch.currentPage),
  })
  const usersQuery = useQuery({
    queryKey: ['users', routeSearch.pageSize, routeSearch.currentPage],
    queryFn: () => {
      const seen = new Set<number>()
      const unique = albumsQuery.data?.filter(item => {
        if (seen.has(item.userId)) return false
        seen.add(item.userId)
        return true
      }).map((item) => item.userId)
      return UsersService.getUsers(unique)
    },
    enabled: albumsQuery.data !== undefined,
  })

  if (albumsQuery.isPending) {
    return <div>Loading...</div>
  }
  else if (albumsQuery.isError || usersQuery.isError) {
    return <div>Error</div>
  }
  else
    return (
      <div className='flex flex-col gap-2 items-center'>
        <div className='w-full'>
          <Table
            headers={['ID', 'Title', 'User', 'Actions']}
            data={albumsQuery.data?.map((item) => {
              const user = usersQuery.data?.find(user => user.id === item.userId)
              return {
                id: item.id,
                title: item.title,
                user: user ? (
                  <Link
                    className='flex items-center gap-2'
                    to="/users/$id"
                    params={{ id: user.id.toString() }}>
                    <img className='w-8 h-8' src={AVATAR_URL + user.name} alt={user.name} />
                    <span>{user.name}</span>
                  </Link>
                ) : 'Unknown',
                actions: (
                  <Button
                    onClick={() => navigate({ to: `/albums/${item.id}` })}
                  >
                    <EyeIcon />
                    Show
                  </Button>
                ),
              }
            })}
          />
        </div>
        <Pagination
          pageSize={routeSearch.pageSize}
          currentPage={routeSearch.currentPage}
          totalPages={Math.ceil(FAKE_ALBUMS_TOTAL_COUNT / routeSearch.pageSize)}
          onPageChange={(page) => {
            navigate({
              to: '/albums',
              search: {
                pageSize: routeSearch.pageSize,
                currentPage: page,
              },
            })
          }}
          onPageSizeChange={(pageSize) => {
            const adjustedPage = Math.min(Math.ceil(FAKE_ALBUMS_TOTAL_COUNT / pageSize), routeSearch.currentPage)
            navigate({
              to: '/albums',
              search: {
                pageSize: pageSize,
                currentPage: adjustedPage,
              },
            })
          }}
        />
      </div>
    )
}
