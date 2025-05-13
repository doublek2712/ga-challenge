import { Link, useCanGoBack, useParams, useRouter } from "@tanstack/react-router"
import type { FC } from "react"
import { Button } from "../components/button"
import { ChevronLeft } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { AlbumsService } from "../services/albums/api"
import { UsersService } from "../services/users/api"
import { AVATAR_URL } from "../services/base"
import { PhotosViewer } from "../components/photos-viewer"
import { PhotosService } from "../services/photos/api"


export const AlbumDetailPage = () => {
  const { id } = useParams({ strict: false })
  const router = useRouter()

  const albumQuery = useQuery({
    queryKey: ['album', id],
    queryFn: () => AlbumsService.getAlbum(id as string),
    enabled: !!id,
  })

  const userQuery = useQuery({
    queryKey: ['user', id],
    queryFn: () => UsersService.getUser(albumQuery.data?.userId.toString() as string),
    enabled: albumQuery.data !== undefined,
  })

  const photosQuery = useQuery({
    queryKey: ['photos', id],
    queryFn: () => PhotosService.getPhotos(Number(id)),
    enabled: !!id,
  })

  if (albumQuery.isPending || userQuery.isPending) {
    return <div>Loading...</div>
  }
  else if (albumQuery.isError || userQuery.isError) {
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
            {!photosQuery.isPending && <PhotosViewer photos={photosQuery.data || []} />}
          </div>
        </div>
      </div>
    )
}
