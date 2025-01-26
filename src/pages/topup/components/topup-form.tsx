import { CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { useFormik } from 'formik'
import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Button from '../../../components/common/Button'
import FormInput from '../../../components/common/FormInput'
import { useTopupMutation } from '../../../services/api'
import { formatCurrency } from '../../../utils/formatter'
import { TopUpConfirmationModal } from './topup-confimation-modal'
import { TopUpErrorModal } from './topup-error-modal'
import { TopUpSuccessModal } from './topup-success-modal'

const PRESET_AMOUNTS = [10000, 20000, 50000, 100000, 250000, 500000]

const TopUpForm = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [customAmount, setCustomAmount] = useState(true)
  const [successAmount, setSuccessAmount] = useState(0)
  const [topup, { isLoading }] = useTopupMutation()

  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .typeError('Nominal harus berupa angka')
      .positive('Nominal tidak boleh lebih kecil dari 0')
      .required('Nominal harus diisi')
      .min(10000, 'Minimal top up Rp 10.000')
      .max(1000000, 'Maksimal top up Rp 1.000.000'),
  })

  const formik = useFormik({
    initialValues: {
      amount: '',
    },
    validationSchema,
    onSubmit: () => {
      setShowConfirmModal(true)
    },
  })

  const handlePresetAmount = (amount: number) => {
    setCustomAmount(false)
    formik.setFieldValue('amount', amount.toString())
  }

  const handleTopUp = async () => {
    try {
      await topup({ top_up_amount: Number(formik.values.amount) }).unwrap()

      setSuccessAmount(Number(formik.values.amount))

      setShowConfirmModal(false)
      setShowSuccessModal(true)

      formik.resetForm()
    } catch (error: any) {
      const errorMsg = error?.data?.message || 'Top Up gagal'

      setErrorMessage(errorMsg)

      setShowConfirmModal(false)
      setShowErrorModal(true)
    }
  }

  return (
    <Fragment>
      <div className="mb-6">
        <p className="text-lg">Silahkan masukan</p>
        <h2 className="text-2xl font-bold">Nominal Top Up</h2>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="space-y-6 flex gap-4 flex-col-reverse md:flex-row"
      >
        <div className="w-full max-w-4xl space-y-6">
          <FormInput
            type="text"
            name="amount"
            placeholder="masukan nominal Top Up"
            value={formik.values.amount}
            onChange={(e) => {
              setCustomAmount(true)
              formik.handleChange(e)
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.amount ? formik.errors.amount : ''}
            touched={formik.touched.amount}
            leftIcon={<CurrencyDollarIcon className="h-5 w-5 text-gray-400" />}
          />

          <Button
            type="submit"
            isLoading={isLoading}
            disabled={isLoading || !formik.isValid || !formik.dirty}
            fullWidth
          >
            Top Up
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4 md:gap-y-0 md:max-w-md w-full">
          {PRESET_AMOUNTS.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => handlePresetAmount(amount)}
              className={`h-max py-4 w-full text-sm rounded-lg border transition-colors cursor-pointer
              ${
                !customAmount && formik.values.amount === amount.toString()
                  ? 'border-red-500 text-red-500'
                  : 'border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500'
              }
            `}
            >
              {formatCurrency(amount)}
            </button>
          ))}
        </div>
      </form>
      <TopUpConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        amount={Number(formik.values.amount)}
        onConfirm={handleTopUp}
        isLoading={isLoading}
      />

      <TopUpSuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false)
          setSuccessAmount(0)
          navigate('/')
        }}
        amount={successAmount}
      />

      <TopUpErrorModal
        isOpen={showErrorModal}
        onClose={() => {
          setShowErrorModal(false)
          setErrorMessage('')
        }}
        error={errorMessage}
      />
    </Fragment>
  )
}

export default TopUpForm
