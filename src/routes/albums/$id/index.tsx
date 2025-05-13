import { createFileRoute } from '@tanstack/react-router'
import { AlbumDetailPage } from '../../../pages/album-detail'

export const Route = createFileRoute('/albums/$id/')({
  component: () => <AlbumDetailPage />,
})

