import { useMatchRoute, useNavigate, type ToPathOption } from "@tanstack/react-router"
import { useRef, type FC } from "react"

import logo from '../../assets/logo.png'
import type React from "react"
import './styles.css'
import { MenuIcon } from "lucide-react"
import { Spinner } from "../spinner"

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

  const asideRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  return (
    <>
      <div className="hidden sm:block w-[200px]" />
      <div ref={overlayRef} className="hidden w-screen h-screen fixed z-1 bg-black/50" />
      <aside ref={asideRef} className="hidden sm:block fixed top-0 left-0 h-full w-[200px] py-4 px-4 bg-white z-10">
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
      <div className="sm:hidden fixed bottom-2 left-2 w-16 h-16 border border-purple-500 rounded-xl text-purple-500 bg-white z-10 flex items-center justify-center shadow-md
        hover:cursor-pointer hover:bg-purple-500/10 transition-all duration-200 ease-in-out"
        onClick={() => {
          if (asideRef.current && overlayRef.current) {
            asideRef.current.classList.toggle('hidden')
            overlayRef.current.classList.toggle('hidden')
          }
        }}
      >
        <MenuIcon />
      </div>
    </>
  )
}
