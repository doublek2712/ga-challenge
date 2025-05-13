import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams, useRouter } from '@tanstack/react-router'
import { AlbumsService } from '../services/albums/api'
import { UsersService } from '../services/users/api'
import { Button } from '../components/button'
import { ChevronLeft, EyeIcon } from 'lucide-react'
import { Table } from '../components/table'
import { UserCard } from '../components/user-card'

export const UserDetail = () => {
  const { id } = useParams({ strict: false })
  const router = useRouter()
  const navigate = useNavigate()

  const albumsQuery = useQuery({
    queryKey: ['albums', id],
    queryFn: () => AlbumsService.getAlbums(100, 1, Number(id)),
    enabled: !!id,
  })

  const userQuery = useQuery({
    queryKey: ['user', id],
    queryFn: () => UsersService.getUser(id as string),
    enabled: !!id,
  })

  if (albumsQuery.isPending || userQuery.isPending) {
    return <div>Loading...</div>
  }
  else if (albumsQuery.isError || userQuery.isError) {
    return <div>Error</div>
  }
  else
    return (
      <div>
        <div className="flex items-center gap-4">
          <Button onClick={() => router.history.back()}>
            <ChevronLeft />
          </Button>
          <h1 className="text-xl font-medium">Show user</h1>
        </div>
        <div className="mt-4 px-6 py-4 rounded-xl bg-white">
          <UserCard user={userQuery.data} />
          <div>
            <Table
              headers={['ID', 'Title', 'Actions']}
              data={albumsQuery.data?.map((item) => {
                return {
                  id: item.id,
                  title: item.title,
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
        </div>
      </div>
    )
}
