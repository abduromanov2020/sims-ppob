import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { Fragment } from 'react'
import Button from '../../../components/common/Button'
import { formatCurrency } from '../../../utils/formatter'

export const TopUpSuccessModal = ({
  isOpen,
  onClose,
  amount,
}: SuccessModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
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
            >
              <DialogPanel className="w-full max-w-md transform rounded-lg bg-white p-6 text-center align-middle shadow-xl transition-all">
                <CheckCircleIcon className="text-green-500 w-28 h-28 mx-auto" />

                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-gray-900"
                >
                  Top Up sebesar
                </DialogTitle>
                <p className="text-2xl font-bold">{formatCurrency(amount)}</p>
                <p className="mt-1 text-lg text-green-600 font-medium">
                  Berhasil!
                </p>

                <div className="mt-8">
                  <Button type="button" onClick={onClose} fullWidth>
                    Kembali ke Beranda
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
