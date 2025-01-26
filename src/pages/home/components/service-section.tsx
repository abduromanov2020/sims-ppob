import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetServicesQuery } from '../../../services/api'

const ServiceCard: React.FC<{
  service: {
    service_code: string
    service_name: string
    service_icon: string
    service_tariff: number
  }
}> = ({ service }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/service/${service.service_code.toLowerCase()}`)
  }

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
    >
      <div className="w-12 h-12 mb-2">
        <img
          src={service.service_icon}
          alt={service.service_name}
          className="w-full h-full object-contain group-hover:scale-110 transition-all"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = '/images/Logo.png'
          }}
        />
      </div>
      <span className="text-xs text-center text-gray-700">
        {service.service_name}
      </span>
    </button>
  )
}

const ServicesSection = () => {
  const { data: services, isLoading, error } = useGetServicesQuery()

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse flex flex-col items-center p-4"
          >
            <div className="w-12 h-12 bg-gray-200 rounded-lg mb-2" />
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-4 text-gray-500">
        Gagal memuat layanan. Silakan coba lagi nanti.
      </div>
    )
  }

  return (
    <div className="mb-8">
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
        {services?.map((service) => (
          <ServiceCard key={service.service_code} service={service} />
        ))}
      </div>
    </div>
  )
}

export default ServicesSection
