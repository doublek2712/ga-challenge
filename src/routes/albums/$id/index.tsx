import { createFileRoute } from '@tanstack/react-router'
import { AlbumDetailPage } from '../../../pages/album-detail'

export const Route = createFileRoute('/albums/$id/')({
  beforeLoad: ({ params }) => {
    document.title = `#${params.id} Show album`
  },
  component: () => <AlbumDetailPage />,
})

