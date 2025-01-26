import { ButtonHTMLAttributes, FC } from 'react'
import LoadingSpinner from './LoadingSpinner'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'boderless'
    | 'secondaryBorderless'
  fullWidth?: boolean
}

const Button: FC<ButtonProps> = ({
  children,
  isLoading,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseClasses =
    'py-3 px-4 rounded-md font-semibold transition-colors cursor-pointer'
  const widthClass = fullWidth ? 'w-full' : ''

  const variantClasses = {
    primary: 'bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600 disabled:bg-gray-300',
    outline:
      'border-2 border-red-500 text-red-500 hover:bg-red-50 disabled:opacity-50',
    boderless:
      'text-red-500 hover:text-red-600 disabled:opacity-50 hover:bg-red-50',
    secondaryBorderless:
      'text-gray-500 hover:text-gray-600 disabled:opacity-50 hover:bg-gray-50',
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {isLoading ? (
        <LoadingSpinner className="h-5 w-5 animate-spin mx-auto" />
      ) : (
        children
      )}
    </button>
  )
}

export default Button
