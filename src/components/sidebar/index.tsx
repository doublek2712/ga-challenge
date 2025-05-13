import { useMatchRoute, useNavigate, type ToPathOption } from "@tanstack/react-router"
import type { FC } from "react"

import logo from '../../assets/logo.png'
import type React from "react"
import './styles.css'

interface ISidebarProps {
  routes: {
    to: ToPathOption,
    label: string,
    icon: React.ReactNode
  }[]
}
export const Sidebar: FC<ISidebarProps> = ({ routes }) => {
  const matchRoute = useMatchRoute()
  const navigate = useNavigate()
  return (
    <>
      <div className="w-[200px]" />

      <aside className="fixed top-0 left-0 h-full w-[200px] py-4 px-4 bg-white z-10">
        <img src={logo} alt='logo' className="w-12 h-12" />
        <nav className="mt-6">
          <ul className="flex flex-col gap-2">
            {routes.map((route, index) => (
              <li
                key={index}
                className={`nav-item p-2 rounded-md hover:cursor-pointer flex gap-2 items-center text-md '
                    ${!!matchRoute({ to: route.to, fuzzy: true }) ?
                    'text-purple-500 bg-purple-500/10'
                    :
                    'text-gray-700 hover:bg-gray-700/10'
                  }
                  `}
                onClick={() => navigate({ to: route.to })}
              >
                {route.icon}
                <span>{route.label}</span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}
