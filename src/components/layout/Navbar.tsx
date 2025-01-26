import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()

  const navLinks = [
    { path: '/topup', label: 'Top Up' },
    { path: '/history', label: 'Transaction' },
    { path: '/profile', label: 'Akun' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src="/images/Logo.png" alt="SIMS PPOB" className="h-8 w-8" />
              <span className="font-bold text-xl hidden sm:block">
                SIMS PPOB
              </span>
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium transition-colors
                  ${
                    location.pathname === link.path
                      ? 'text-red-500'
                      : 'text-gray-700 hover:text-red-500'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center sm:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-2 py-2 text-xs font-medium transition-colors
                  ${
                    location.pathname === link.path
                      ? 'text-red-500'
                      : 'text-gray-700 hover:text-red-500'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
