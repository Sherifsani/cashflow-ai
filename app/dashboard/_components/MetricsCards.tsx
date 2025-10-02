"use client"

import React from 'react'
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiTarget, FiAlertTriangle } from 'react-icons/fi'
import { DashboardData } from '../_types'

interface Props {
  data: DashboardData
  loading?: boolean
}

export default function MetricsCards({ data, loading }: Props) {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getHealthScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getHealthScoreBg = (score: number): string => {
    if (score >= 80) return 'bg-green-50 border-green-200'
    if (score >= 60) return 'bg-yellow-50 border-yellow-200'
    return 'bg-red-50 border-red-200'
  }

  const getCashRunwayColor = (status: string): string => {
    switch (status) {
      case 'positive': return 'text-green-600'
      case 'good': return 'text-blue-600' 
      case 'warning': return 'text-yellow-600'
      case 'critical': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const metrics = [
    {
      title: 'Current Balance',
      value: formatCurrency(data.currentBalance),
      icon: FiDollarSign,
      change: '+12.5%',
      changeType: 'positive',
      subtitle: 'vs last month'
    },
    {
      title: 'Monthly Income',
      value: formatCurrency(data.monthlyIncome),
      icon: FiTrendingUp,
      change: '+8.2%',
      changeType: 'positive',
      subtitle: 'this month'
    },
    {
      title: 'Monthly Expenses',
      value: formatCurrency(data.monthlyExpenses),
      icon: FiTrendingDown,
      change: '-3.1%',
      changeType: 'positive',
      subtitle: 'vs last month'
    },
    {
      title: 'Health Score',
      value: `${data.healthScore}%`,
      icon: FiTarget,
      change: data.healthScore >= 80 ? 'Excellent' : data.healthScore >= 60 ? 'Good' : 'Needs Attention',
      changeType: data.healthScore >= 60 ? 'positive' : 'negative',
      subtitle: 'business health'
    }
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-2 bg-primary/10 rounded-lg">
                <metric.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              metric.changeType === 'positive' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {metric.change}
            </span>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
            <p className={`text-2xl font-bold mb-1 ${
              metric.title === 'Health Score' ? getHealthScoreColor(data.healthScore) : 'text-gray-900'
            }`}>
              {metric.value}
            </p>
            <p className="text-xs text-gray-500">{metric.subtitle}</p>
          </div>
        </div>
      ))}

      {/* Cash Runway Card */}
      <div className={`bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow ${
        getHealthScoreBg(data.healthScore)
      } lg:col-span-2`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FiAlertTriangle className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 ml-3">Cash Runway</h3>
          </div>
        </div>
        
        <div>
          <p className={`text-3xl font-bold mb-2 ${getCashRunwayColor(data.cashRunway.status)}`}>
            {data.cashRunway.days === '∞' ? '∞' : `${data.cashRunway.days} days`}
          </p>
          <p className="text-sm text-gray-600 mb-2">{data.cashRunway.message}</p>
          {data.cashRunway.monthlyBurn && (
            <p className="text-xs text-gray-500">
              Monthly burn: {formatCurrency(data.cashRunway.monthlyBurn)}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}