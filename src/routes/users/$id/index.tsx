import { createFileRoute } from '@tanstack/react-router'
import { UserDetail } from '../../../pages/user-detail'

export const Route = createFileRoute('/users/$id/')({
  beforeLoad: ({ params }) => {
    document.title = `#${params.id} Show user`
  },
  component: () => <UserDetail />,
})
