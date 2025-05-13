import { useQuery } from '@tanstack/react-query'
import { Link, useCanGoBack, useNavigate, useParams, useRouter } from '@tanstack/react-router'
import { AlbumsService } from '../services/albums/api'
import { UsersService } from '../services/users/api'
import { Button } from '../components/button'
import { ChevronLeft, EyeIcon } from 'lucide-react'
import { AVATAR_URL } from '../services/base'
import { Table } from '../components/table'

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
        <div>
          <Button onClick={() => router.history.back()}>
            <ChevronLeft />
          </Button>
          <h1>Show album</h1>
        </div>
        <div>
          <div>
            <img src={AVATAR_URL + userQuery.data.name} alt={userQuery.data.name} />
            <div>
              <Link to="/users/$id" params={{ id: userQuery.data.id.toString() }}>
                {userQuery.data.name}
              </Link>
              <a href={`mailto:${userQuery.data.email}`}>{userQuery.data.email}</a>
            </div>
          </div>
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
