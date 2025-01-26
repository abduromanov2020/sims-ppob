import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/24/solid'
import { Fragment } from 'react'
import Button from '../../../components/common/Button'

export const TopUpErrorModal = ({
  isOpen,
  onClose,
  error,
}: ErrorModalProps) => {
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
                <XCircleIcon className="text-red-500 w-28 h-28 mx-auto" />

                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-gray-900"
                >
                  Top Up Gagal
                </DialogTitle>
                <p className="mt-2 text-sm text-gray-500">{error}</p>

                <div className="mt-8">
                  <Button type="button" onClick={onClose}>
                    Coba Lagi
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
