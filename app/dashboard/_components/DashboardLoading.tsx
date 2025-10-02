"use client"

import React from 'react'
import { FiLoader } from 'react-icons/fi'

interface Props {
  message?: string
}

export default function DashboardLoading({ message = "Loading your dashboard..." }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <FiLoader className="h-8 w-8 text-primary animate-spin" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">CashFlow Co-Pilot</h2>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}