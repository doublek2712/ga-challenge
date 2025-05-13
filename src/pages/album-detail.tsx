import { useParams, useRouter } from "@tanstack/react-router"
import { Button } from "../components/button"
import { ChevronLeft } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { AlbumsService } from "../services/albums/api"
import { UsersService } from "../services/users/api"
import { PhotosViewer } from "../components/photos-viewer"
import { PhotosService } from "../services/photos/api"
import { UserCard } from "../components/user-card"


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
        <div className="flex items-center gap-4">
          <Button onClick={() => router.history.back()}>
            <ChevronLeft />
          </Button>
          <h1 className="text-xl font-medium">Show album</h1>
        </div>
        <div className="mt-4 px-6 py-4 rounded-xl bg-white">
          <UserCard user={userQuery.data} />
          <div className="p-4 border-t border-gray-200">
            <div className="mb-4 flex justify-between">
              <h2 className="text-lg font-medium">{albumQuery.data.title}</h2>
              <span className="text-sm text-gray-600">Total: {photosQuery.data?.length}</span>
            </div>
            {!photosQuery.isPending && <PhotosViewer photos={photosQuery.data || []} />}
          </div>
        </div>
      </div>
    )
}
