"use client"

import React from 'react'
import { FiBell, FiUser, FiLogOut, FiSettings, FiRefreshCw } from 'react-icons/fi'
import { User, BusinessData } from '../_types'

interface Props {
  user: User | null
  businessData: BusinessData | null
  onLogout: () => void
  onRefresh: () => void
  loading?: boolean
}

export default function DashboardHeader({ user, businessData, onLogout, onRefresh, loading }: Props) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Welcome message */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ''}!
          </h1>
          {businessData && (
            <p className="text-sm text-gray-600 mt-1">
              {businessData.businessName} • {businessData.businessType}
            </p>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-4">
          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            title="Refresh data"
          >
            <FiRefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          </button>

          {/* Notifications */}
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative">
            <FiBell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Settings */}
          <button 
            onClick={() => window.location.href = '/dashboard/settings'}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Settings"
          >
            <FiSettings className="h-5 w-5" />
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {user?.firstName && user?.lastName 
                  ? `${user.firstName} ${user.lastName}`
                  : user?.email}
              </p>
              <p className="text-xs text-gray-500">Business Owner</p>
            </div>
            
            <div className="relative">
              <button className="flex items-center justify-center h-8 w-8 bg-primary text-white rounded-full">
                <FiUser className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={onLogout}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <FiLogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}