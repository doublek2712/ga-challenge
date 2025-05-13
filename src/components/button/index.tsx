import type { ButtonHTMLAttributes, FC } from "react"

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'subtle' | 'link',
  children?: React.ReactNode,
}
export const Button: FC<IButtonProps> = ({ variant = 'solid', children, ...rest }) => {
  return (
    <button className="hover:cursor-pointer" {...rest}>
      {children}
    </button>
  )
}