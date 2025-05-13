import { useQuery } from '@tanstack/react-query'
import { UsersService } from '../services/users/api'
import { Table } from '../components/table'
import { AVATAR_URL } from '../services/base'
import { Button } from '../components/button'
import { EyeIcon } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

export const UsersPage = () => {
  const navigate = useNavigate()

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => UsersService.getUsers(),
  })

  if (usersQuery.isPending) {
    return <div>Loading...</div>
  }
  else if (usersQuery.isError) {
    return <div>Error</div>
  }
  else
    return (
      <div>
        <Table
          headers={['ID', 'Avatar', 'Name', 'Email', 'Phone', 'Website', 'Actions']}
          data={usersQuery.data?.map((item) => {
            return {
              id: item.id,
              avatar: <img className='w-8 h-8' src={AVATAR_URL + item.name} alt={item.name} />,
              name: item.name,
              email: <a className='text-blue-500' href={`mailto:${item.email}`}>{item.email}</a>,
              phone: <a className='text-blue-500' href={`tel:${item.phone}`}>{item.phone}</a>,
              website: <a className='text-blue-500' href={`https://${item.website}`} target='_blank'>{item.website}</a>,
              actions: (
                <Button
                  onClick={() => navigate({ to: `/users/${item.id}` })}
                >
                  <EyeIcon />
                  Show
                </Button>
              ),
            }
          })}
        />
      </div>
    )
}
