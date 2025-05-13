import type { ButtonHTMLAttributes, FC } from "react"
import './styles.css'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode,
}
export const Button: FC<IButtonProps> = ({ children, ...rest }) => {
  return (
    <button className="button flex items-center gap-2 px-2 py-1 rounded-md border border-gray-200 transition duration-300 ease-in-out
    hover:cursor-pointer hover:border-purple-500 hover:text-purple-500" {...rest}>
      {children}
    </button>
  )
}