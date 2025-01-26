import { FC } from 'react'
import LoginForm from '../../components/forms/LoginForm'
import AuthLayout from '../../components/layout/AuthLayout'

export const Login: FC = () => {
  return (
    <AuthLayout
      title="Masuk atau buat akun"
      subtitle="untuk memulai"
      redirectText="belum punya akun? registrasi"
      redirectLinkText="di sini"
      redirectTo="/register"
    >
      <LoginForm />
    </AuthLayout>
  )
}
