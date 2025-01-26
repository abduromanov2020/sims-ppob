import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../../components/common/Button'
import {
  useCreateTransactionMutation,
  useGetBalanceQuery,
  useGetServicesQuery,
} from '../../../services/api'
import { formatCurrency } from '../../../utils/formatter'

const ServicePayment = () => {
  const { serviceCode } = useParams()
  const navigate = useNavigate()
  const [createTransaction, { isLoading }] = useCreateTransactionMutation()

  const { data: balanceData } = useGetBalanceQuery()
  const { data: services } = useGetServicesQuery()

  const selectedService = services?.find(
    (service) =>
      service.service_code.toLowerCase() === serviceCode?.toLowerCase()
  )

  const handlePayment = async () => {
    if (!selectedService) {
      toast.error('Service not found')
      return
    }

    if (
      !balanceData?.balance ||
      balanceData.balance < selectedService.service_tariff
    ) {
      toast.error('Insufficient balance')
      return
    }

    try {
      const response = await createTransaction({
        service_code: selectedService.service_code,
      }).unwrap()

      toast.success(response.message || 'Transaction successful')
      navigate('/history')
    } catch (error: any) {
      toast.error(error?.data?.message || 'Transaction failed')
    }
  }

  if (!selectedService) {
    return (
      <div className="text-center py-8 text-gray-500">Service not found</div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-xl">Pembayaran</h1>
            <div className="flex items-center gap-2">
              <img
                src={selectedService.service_icon}
                alt={selectedService.service_name}
                className="w-10 h-10"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = '/images/placeholder-service.png'
                }}
              />
              <h1 className="text-lg font-semibold">
                {selectedService.service_name}
              </h1>
            </div>
          </div>

          <div>
            <input
              type="text"
              value={formatCurrency(selectedService.service_tariff)}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <Button
            onClick={handlePayment}
            isLoading={isLoading}
            disabled={
              isLoading ||
              !balanceData?.balance ||
              balanceData.balance < selectedService.service_tariff
            }
            fullWidth
            className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition-colors"
          >
            Bayar
          </Button>
        </div>
      </div>
    </div>
  )
}
export default ServicePayment
