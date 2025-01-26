import React, { useState } from 'react'

import LoadingSpinner from '../../../components/common/LoadingSpinner'
import { useGetTransactionHistoryQuery } from '../../../services/api'
import { formatCurrency } from '../../../utils/formatter'

const TransactionItem: React.FC<{
  type: 'TOPUP' | 'PAYMENT'
  amount: number
  date: string
  description: string
}> = ({ type, amount, date, description }) => {
  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
  }).format(new Date(date))
  const formattedTime = new Intl.DateTimeFormat('id-ID', {
    timeStyle: 'short',
  }).format(new Date(date))

  return (
    <div className="flex items-center justify-between py-4 border rounded-xl px-4 border-neutral-200">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span
            className={`text-lg font-semibold ${type === 'TOPUP' ? 'text-green-500' : 'text-red-500'}`}
          >
            {type === 'TOPUP' ? '+' : '-'} {formatCurrency(amount)}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          {formattedDate} {formattedTime}
        </div>
      </div>
      <div className="text-right">
        <span className="text-sm text-gray-700">{description}</span>
      </div>
    </div>
  )
}

const ITEMS_PER_PAGE = 5

const TransactionHistory = () => {
  const [offset, setOffset] = useState(0)
  const {
    data: transactions,
    isLoading,
    isFetching,
  } = useGetTransactionHistoryQuery({
    offset,
    limit: ITEMS_PER_PAGE,
  })

  const handleShowMore = () => {
    setOffset((prevOffset) => prevOffset + ITEMS_PER_PAGE)
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Semua Transaksi</h2>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-16 bg-gray-100 rounded"></div>
              </div>
            ))}
          </div>
        ) : transactions?.records.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Tidak ada transaksi
          </div>
        ) : (
          <div className="space-y-2">
            {transactions?.records.map((transaction) => (
              <TransactionItem
                key={transaction.invoice_number}
                type={transaction.transaction_type}
                amount={transaction.total_amount}
                date={transaction.created_on}
                description={transaction.description}
              />
            ))}
          </div>
        )}

        {transactions &&
          transactions.records.length > 0 &&
          transactions.records.length % ITEMS_PER_PAGE === 0 && (
            <div className="flex justify-center p-6">
              <button
                className="text-red-500 hover:text-red-600 font-medium cursor-pointer"
                onClick={handleShowMore}
                disabled={isFetching}
              >
                {isFetching ? <LoadingSpinner /> : 'Show more'}
              </button>
            </div>
          )}
      </div>
    </div>
  )
}

export default TransactionHistory
