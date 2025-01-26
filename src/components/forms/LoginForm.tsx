import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { useFormik } from 'formik'
import { FC, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { setCredentials } from '../../features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { useLoginMutation } from '../../services/api'
import { LoginRequest } from '../../types/request'
import { setAuthToken } from '../../utils/cookie'
import { loginSchema } from '../../utils/validation'
import Button from '../common/Button'
import FormInput from '../common/FormInput'
import PasswordInput from '../common/PasswordInput'

const LoginForm: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { token } = useAppSelector((state) => state.auth)
  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  const formik = useFormik<LoginRequest>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const response = await login(values).unwrap()

        dispatch(setCredentials(response))
        setAuthToken(response.data.token)

        toast.success('Login berhasil!')
        navigate('/')
      } catch (error: any) {
        const errorCode = error?.data?.status
        const errorMessage = error?.data?.message || 'Login gagal'

        switch (errorCode) {
          case 102:
            formik.setFieldError('email', errorMessage)
            break
          case 103:
            toast.error('Username atau password salah')
            break
          default:
            toast.error(errorMessage)
        }
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <FormInput
        type="email"
        placeholder="masukan email anda"
        leftIcon={
          <EnvelopeIcon
            className={`h-5 w-5 ${
              formik.touched.email && formik.errors.email
                ? 'text-red-500'
                : 'text-gray-400'
            }`}
          />
        }
        {...formik.getFieldProps('email')}
        error={formik.errors.email}
        touched={formik.touched.email}
      />

      <PasswordInput
        placeholder="masukan password anda"
        {...formik.getFieldProps('password')}
        error={formik.errors.password}
        touched={formik.touched.password}
      />

      <Button
        type="submit"
        isLoading={isLoading}
        fullWidth
        disabled={isLoading || !formik.isValid || !formik.dirty}
      >
        Masuk
      </Button>
    </form>
  )
}

export default LoginForm
