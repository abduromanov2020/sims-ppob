import { EnvelopeIcon, UserIcon } from '@heroicons/react/24/outline'
import { useFormik } from 'formik'
import React from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../../services/api'
import { RegisterRequest } from '../../types/request'
import { registerSchema } from '../../utils/validation'
import Button from '../common/Button'
import FormInput from '../common/FormInput'
import PasswordInput from '../common/PasswordInput'

interface RegisterFormValues extends RegisterRequest {
  confirm_password: string
}

const RegisterForm: React.FC = () => {
  const navigate = useNavigate()
  const [register, { isLoading }] = useRegisterMutation()

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        const { confirm_password, ...registerData } = values
        const response = await register(registerData).unwrap()
        toast.success(response.message || 'Registrasi berhasil!')
        navigate('/login')
      } catch (error: any) {
        const errorCode = error?.data?.status
        const errorMessage = error?.data?.message || 'Registrasi gagal'

        switch (errorCode) {
          case 102:
            formik.setFieldError('email', errorMessage)
            break
          case 103:
            formik.setFieldError('email', 'Format email tidak valid')
            break
          default:
            toast.error(errorMessage)
        }
      }
    },
  })

  const { handleSubmit, getFieldProps, touched, errors, dirty, isValid } =
    formik

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        type="email"
        placeholder="masukan email anda"
        leftIcon={
          <EnvelopeIcon
            className={`h-5 w-5 ${
              touched.email && errors.email ? 'text-red-500' : 'text-gray-400'
            }`}
          />
        }
        {...getFieldProps('email')}
        error={errors.email}
        touched={touched.email}
      />

      <FormInput
        placeholder="nama depan"
        leftIcon={
          <UserIcon
            className={`h-5 w-5 ${
              touched.first_name && errors.first_name
                ? 'text-red-500'
                : 'text-gray-400'
            }`}
          />
        }
        {...getFieldProps('first_name')}
        error={errors.first_name}
        touched={touched.first_name}
      />

      <FormInput
        placeholder="nama belakang"
        leftIcon={
          <UserIcon
            className={`h-5 w-5 ${
              touched.last_name && errors.last_name
                ? 'text-red-500'
                : 'text-gray-400'
            }`}
          />
        }
        {...getFieldProps('last_name')}
        error={errors.last_name}
        touched={touched.last_name}
      />

      <PasswordInput
        placeholder="buat password"
        {...getFieldProps('password')}
        error={errors.password}
        touched={touched.password}
      />

      <PasswordInput
        placeholder="konfirmasi password"
        {...getFieldProps('confirm_password')}
        error={errors.confirm_password}
        touched={touched.confirm_password}
      />

      <Button
        type="submit"
        isLoading={isLoading}
        fullWidth
        disabled={isLoading || !isValid || !dirty}
      >
        Registrasi
      </Button>
    </form>
  )
}

export default RegisterForm
