import { Link, type ToPathOption } from "@tanstack/react-router"
import type { FC } from "react"

interface IHeaderProps {
  routes: {
    to: ToPathOption,
    label: string,
  }[]
}
export const Header: FC<IHeaderProps> = ({ routes }) => {
  return (
    <header >
      <nav>
        <ul>
          {routes.map((route, index) => (
            <li key={index}>
              <Link
                to={route.to}
              // onClick={handleToggle}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
