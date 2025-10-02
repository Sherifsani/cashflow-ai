"use client"

import type { DashboardData } from '../_types'

interface UpcomingPaymentsProps {
  payments: DashboardData['upcomingPayments']
}

export default function UpcomingPayments({ payments }: UpcomingPaymentsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Upcoming Payments</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {payments.slice(0, 4).map((payment, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{payment.name}</p>
                <p className="text-xs text-gray-500">{payment.dueDate}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${
                  payment.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {payment.type === 'income' ? '+' : '-'}
                  {new Intl.NumberFormat('en-NG', {
                    style: 'currency',
                    currency: 'NGN',
                    minimumFractionDigits: 0
                  }).format(payment.amount)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}