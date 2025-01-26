import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { Fragment } from 'react'
import Button from '../../../components/common/Button'
import LoadingSpinner from '../../../components/common/LoadingSpinner'

export const TopUpConfirmationModal = ({
  isOpen,
  onClose,
  amount,
  onConfirm,
  isLoading,
}: TopUpModalProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform rounded-lg bg-white p-6 text-center align-middle shadow-xl transition-all">
                <img
                  src="/images/Logo.png"
                  alt="Logo"
                  className="mx-auto mb-4 w-20 h-20"
                />

                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Anda yakin untuk Top Up sebesar
                </DialogTitle>
                <p className="mt-2 text-2xl font-bold">
                  {formatCurrency(amount)} ?
                </p>

                <div className="mt-2 flex flex-col">
                  <Button
                    type="button"
                    onClick={onConfirm}
                    disabled={isLoading}
                    variant="boderless"
                  >
                    {isLoading ? (
                      <LoadingSpinner className="mx-auto" />
                    ) : (
                      'Ya, lanjutkan Top Up'
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={onClose}
                    disabled={isLoading}
                    variant="secondaryBorderless"
                  >
                    Batalkan
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
