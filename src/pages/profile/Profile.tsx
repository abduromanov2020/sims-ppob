import { EnvelopeIcon, UserIcon } from '@heroicons/react/24/outline'
import { PencilIcon } from '@heroicons/react/24/solid'
import { useFormik } from 'formik'
import React, { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Button from '../../components/common/Button'
import FormInput from '../../components/common/FormInput'
import { logout } from '../../features/auth/authSlice'
import { useAppDispatch } from '../../hooks/useRedux'
import {
  useGetProfileQuery,
  useUpdateProfileImageMutation,
  useUpdateProfileMutation,
} from '../../services/api'
import { removeAuthToken } from '../../utils/cookie'

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const { data: profile, isLoading } = useGetProfileQuery()
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
  const [updateProfileImage, { isLoading: isUploadingImage }] =
    useUpdateProfileImageMutation()

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('Nama depan harus diisi'),
    last_name: Yup.string().required('Nama belakang harus diisi'),
  })

  const formik = useFormik({
    initialValues: {
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await updateProfile(values).unwrap()
        toast.success('Profile berhasil diperbarui')
        setIsEditing(false)
      } catch (error: any) {
        toast.error(error?.data?.message || 'Gagal memperbarui profile')
      }
    },
  })

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > 100 * 1024) {
      toast.error('Ukuran gambar maksimal 100kb')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
      await updateProfileImage(formData).unwrap()
      toast.success('Foto profile berhasil diperbarui')
    } catch (error: any) {
      toast.error(error?.data?.message || 'Gagal memperbarui foto profile')
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    removeAuthToken()
    navigate('/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <div
            className="w-32 h-32 rounded-full overflow-hidden cursor-pointer group"
            onClick={handleImageClick}
          >
            <img
              src={profile?.profile_image || '/images/Profile Photo.png'}
              alt="Profile"
              className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = '/images/Profile Photo.png'
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <PencilIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            disabled={isUploadingImage}
          />
        </div>

        <h1 className="text-2xl font-bold">
          {profile?.first_name} {profile?.last_name}
        </h1>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <FormInput
          type="email"
          name="email"
          placeholder="Email"
          value={profile?.email || ''}
          onChange={() => {}}
          onBlur={() => {}}
          leftIcon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
          touched={false}
          error=""
        />

        <FormInput
          type="text"
          name="first_name"
          placeholder="Nama Depan"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.first_name ? formik.errors.first_name : ''}
          touched={formik.touched.first_name}
          leftIcon={<UserIcon className="h-5 w-5 text-gray-400" />}
        />

        <FormInput
          type="text"
          name="last_name"
          placeholder="Nama Belakang"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.last_name ? formik.errors.last_name : ''}
          touched={formik.touched.last_name}
          leftIcon={<UserIcon className="h-5 w-5 text-gray-400" />}
        />

        <div className="space-y-4">
          {isEditing ? (
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="submit"
                isLoading={isUpdating}
                disabled={isUpdating}
                fullWidth
              >
                Simpan
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false)
                  formik.resetForm()
                }}
                fullWidth
              >
                Batal
              </Button>
            </div>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(true)}
                fullWidth
              >
                Edit Profile
              </Button>
              <Button type="button" onClick={handleLogout} fullWidth>
                Logout
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  )
}

export default Profile
