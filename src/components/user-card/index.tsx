
import type { FC } from 'react'
import { AVATAR_URL } from '../../services/base'
import type { UserType } from '../../services/users/type'
import { Link } from '@tanstack/react-router'

interface IUserCardProps {
  user: UserType
}

export const UserCard: FC<IUserCardProps> = ({ user }) => {
  return (
    <div className="p-4 flex items-center gap-4 ">
      <img className="w-12 h-12" src={AVATAR_URL + user.name} alt={user.name} />
      <div className="flex flex-col">
        <Link className="text-blue-500 text-lg font-medium" to="/users/$id" params={{ id: user.id.toString() }}>
          {user.name}
        </Link>
        <a className="text-blue-500" href={`mailto:${user.email}`}>{user.email}</a>
      </div>
    </div>
  )
}
