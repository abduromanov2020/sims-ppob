import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { FC } from 'react'

interface FormInputProps {
  type?: 'text' | 'email' | 'password'
  placeholder: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  error?: string
  touched?: boolean
  leftIcon: React.ReactNode
  rightIcon?: React.ReactNode
  readOnly?: boolean
}

const FormInput: FC<FormInputProps> = ({
  type = 'text',
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  leftIcon,
  rightIcon,
  readOnly = false,
}) => {
  return (
    <div className="space-y-2">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {leftIcon}
        </div>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full pl-10 pr-${rightIcon ? '20' : '10'} py-3 rounded-md border 
          ${touched && error ? 'border-rose-500' : 'border-gray-300'}
          focus:outline-none focus:ring-1 focus:ring-blue-500`}
          readOnly={readOnly}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-2">
          {touched && error && (
            <ExclamationCircleIcon className="h-5 w-5 text-rose-500" />
          )}
          {rightIcon}
        </div>
      </div>
      {touched && error && (
        <p className="text-rose-500 text-sm flex justify-end">{error}</p>
      )}
    </div>
  )
}

export default FormInput
