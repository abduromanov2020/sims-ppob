import { FC } from 'react'
import RegisterForm from '../../components/forms/RegisterForm'
import AuthLayout from '../../components/layout/AuthLayout'

const Register: FC = () => {
  return (
    <AuthLayout
      title="Lengkapi data"
      subtitle="untuk membuat akun"
      redirectText="Sudah punya akun?"
      redirectLinkText="login di sini"
      redirectTo="/login"
    >
      <RegisterForm />
    </AuthLayout>
  )
}

export default Register
