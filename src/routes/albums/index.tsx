import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/albums/')({
  component: () => <div>Albums</div>,
})
