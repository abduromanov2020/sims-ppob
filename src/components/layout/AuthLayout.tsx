import React from 'react'
import { Link } from 'react-router-dom'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
  redirectText: string
  redirectLinkText: string
  redirectTo: string
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  redirectText,
  redirectLinkText,
  redirectTo,
}) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6 justify-center">
              <img src="/images/Logo.png" alt="Logo" className="w-8 h-8" />
              <span className="font-bold text-xl">SIMS PPOB</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-bold text-center">
              {title}
            </h1>
            <h1 className="text-xl lg:text-2xl font-bold mb-2 text-center">
              {subtitle}
            </h1>
          </div>

          {children}

          <div className="mt-4 text-center text-sm text-gray-600">
            {redirectText}{' '}
            <Link to={redirectTo} className="text-red-500 font-semibold">
              {redirectLinkText}
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex w-full lg:w-1/2 bg-[#fff1ee] items-center justify-center p-8">
        <img
          src="/images/Illustrasi Login.png"
          alt="Auth Illustration"
          className="w-3/4 h-auto object-contain"
        />
      </div>
    </div>
  )
}

export default AuthLayout
