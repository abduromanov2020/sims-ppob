import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useGetBalanceQuery, useGetProfileQuery } from '../../../services/api'

const ProfileSection = () => {
  const [showBalance, setShowBalance] = useState(false)
  const { data: profile, isLoading: isLoadingProfile } = useGetProfileQuery()
  const { data: balance, isLoading: isLoadingBalance } = useGetBalanceQuery()

  const toggleBalance = () => setShowBalance(!showBalance)

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="flex items-center space-x-4">
        <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200">
          {profile?.profile_image && (
            <img
              src={
                profile.profile_image.includes('null')
                  ? '/images/Profile Photo.png'
                  : profile.profile_image
              }
              alt="Profile"
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div>
          <p className="text-gray-600">Selamat datang,</p>
          <h1 className="text-2xl font-bold">
            {isLoadingProfile
              ? 'Loading...'
              : `${profile?.first_name} ${profile?.last_name}`}
          </h1>
        </div>
      </div>

      <div className="bg-red-500 rounded-xl p-6 text-white">
        <p className="text-sm mb-2">Saldo anda</p>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold">
            {isLoadingBalance
              ? 'Loading...'
              : showBalance
                ? formatBalance(balance?.balance || 0)
                : 'Rp •••••••'}
          </p>
          <button
            onClick={toggleBalance}
            className="text-white hover:text-gray-200 transition-colors cursor-pointer"
          >
            {showBalance ? (
              <EyeSlashIcon className="h-6 w-6" />
            ) : (
              <EyeIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileSection
