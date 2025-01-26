import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline'
import { FC, useState } from 'react'
import FormInput from './FormInput'

interface PasswordInputProps {
  placeholder: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  error?: string
  touched?: boolean
}

const PasswordInput: FC<PasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <FormInput
      type={showPassword ? 'text' : 'password'}
      leftIcon={
        <LockClosedIcon
          className={`h-5 w-5 ${
            props.touched && props.error ? 'text-red-500' : 'text-gray-400'
          }`}
        />
      }
      rightIcon={
        <button
          type="button"
          className="cursor-pointer transition-all"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeSlashIcon className="h-5 w-5 text-gray-400" />
          ) : (
            <EyeIcon className="h-5 w-5 text-gray-400" />
          )}
        </button>
      }
      {...props}
    />
  )
}

export default PasswordInput
