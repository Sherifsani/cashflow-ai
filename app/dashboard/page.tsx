"use client"

import React, { useState, useEffect } from 'react'
import { 
  FiTrendingUp, 
  FiTrendingDown,
  FiDollarSign, 
  FiBarChart, 
  FiAlertTriangle,
  FiCheckCircle,
  FiZap,
  FiTarget,
  FiUpload,
  FiMessageCircle,
  FiSettings,
  FiUser,
  FiLogOut,
  FiPlus,
  FiRefreshCw,
  FiTrash2
} from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useDashboard } from '../../hooks/useDashboard'
import { useTransactions } from '../../hooks/useTransactions'
import { getAIInsights } from '../../lib/api'

export default function Dashboard() {
  const router = useRouter()
  const { dashboardData, userProfile, transactions, loading, error, refreshData } = useDashboard()
  const { removeTransaction } = useTransactions()
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)
  const [aiInsights, setAiInsights] = useState<any>(null)
  const [aiLoading, setAiLoading] = useState<boolean>(false)

  const fetchAIInsights = async () => {
    try {
      setAiLoading(true)
      const response = await getAIInsights()
      setAiInsights(response.data.insights)
    } catch (error) {
      console.error('Failed to fetch AI insights:', error)
    } finally {
      setAiLoading(false)
    }
  }

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('idToken') || localStorage.getItem('accessToken')
    if (!token) {
      router.push('/auth/login')
    } else {
      fetchAIInsights()
    }
  }, [router])

  const handleLogout = () => {
    localStorage.clear()
    router.push('/')
  }

  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      await removeTransaction(transactionId)
      refreshData()
    } catch (error) {
      console.error('Failed to delete transaction:', error)
    }
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-gray-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-teal mx-auto mb-4"></div>
          <p className="text-brand-text-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-brand-gray-light flex items-center justify-center">
        <div className="text-center">
          <FiAlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={refreshData}
            className="bg-brand-teal text-white px-4 py-2 rounded-lg hover:bg-brand-teal-dark"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-gray-light">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-brand-teal p-2 rounded-lg mr-3">
                <FiTrendingUp className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-brand-text-dark">CashFlow Co-Pilot</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={refreshData}
                className="p-2 text-brand-text-medium hover:text-brand-text-dark"
              >
                <FiRefreshCw className="h-5 w-5" />
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="flex items-center text-brand-text-medium hover:text-brand-text-dark"
                >
                  <FiUser className="h-5 w-5 mr-2" />
                  {userProfile?.email || 'User'}
                </button>
                
                {showMobileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    {/* <Link href="/dashboard/settings" className="flex items-center px-4 py-2 text-brand-text-medium hover:bg-gray-50">
                      <FiSettings className="h-4 w-4 mr-2" />
                      Settings
                    </Link> */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-gray-50"
                    >
                      <FiLogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-brand-text-dark mb-2">
            Welcome back, {userProfile?.businessName || 'Business Owner'}!
          </h2>
          <p className="text-brand-text-medium">
            Here's your financial overview for today
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brand-text-medium text-sm font-medium">Current Balance</p>
                <p className="text-2xl font-bold text-brand-text-dark">
                  {formatCurrency(dashboardData?.currentBalance?.value || 0)}
                </p>
                {dashboardData?.currentBalance?.percentageChange && (
                  <p className={`text-sm flex items-center ${
                    dashboardData.currentBalance.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {dashboardData.currentBalance.trend === 'up' ? <FiTrendingUp className="h-4 w-4 mr-1" /> : <FiTrendingDown className="h-4 w-4 mr-1" />}
                    {Math.abs(dashboardData.currentBalance.percentageChange)}%
                  </p>
                )}
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiDollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brand-text-medium text-sm font-medium">Monthly Income</p>
                <p className="text-2xl font-bold text-brand-text-dark">
                  {formatCurrency(dashboardData?.monthlyIncome?.value || 0)}
                </p>
                {dashboardData?.monthlyIncome?.percentageChange && (
                  <p className={`text-sm flex items-center ${
                    dashboardData.monthlyIncome.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {dashboardData.monthlyIncome.trend === 'up' ? <FiTrendingUp className="h-4 w-4 mr-1" /> : <FiTrendingDown className="h-4 w-4 mr-1" />}
                    {Math.abs(dashboardData.monthlyIncome.percentageChange)}%
                  </p>
                )}
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FiTrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brand-text-medium text-sm font-medium">Monthly Expenses</p>
                <p className="text-2xl font-bold text-brand-text-dark">
                  {formatCurrency(dashboardData?.monthlyExpense?.value || 0)}
                </p>
                {dashboardData?.monthlyExpense?.percentageChange && (
                  <p className={`text-sm flex items-center ${
                    dashboardData.monthlyExpense.trend === 'down' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {dashboardData.monthlyExpense.trend === 'up' ? <FiTrendingUp className="h-4 w-4 mr-1" /> : <FiTrendingDown className="h-4 w-4 mr-1" />}
                    {Math.abs(dashboardData.monthlyExpense.percentageChange)}%
                  </p>
                )}
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <FiTrendingDown className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brand-text-medium text-sm font-medium">Health Score</p>
                <p className="text-2xl font-bold text-brand-text-dark">
                  {dashboardData?.healthScore?.value || 0}%
                </p>
                {dashboardData?.healthScore?.percentageChange && (
                  <p className={`text-sm flex items-center ${
                    dashboardData.healthScore.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {dashboardData.healthScore.trend === 'up' ? <FiTrendingUp className="h-4 w-4 mr-1" /> : <FiTrendingDown className="h-4 w-4 mr-1" />}
                    {Math.abs(dashboardData.healthScore.percentageChange)}%
                  </p>
                )}
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <FiBarChart className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Link href="/dashboard/add-transaction" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="bg-brand-teal p-3 rounded-lg mr-4">
                <FiPlus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-text-dark">Add Transaction</h3>
                <p className="text-brand-text-medium text-sm">Record income or expense</p>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/insights" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="bg-purple-500 p-3 rounded-lg mr-4">
                <FiBarChart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-text-dark">Financial Insights</h3>
                <p className="text-brand-text-medium text-sm">View trends and analytics</p>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/upload" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="bg-blue-500 p-3 rounded-lg mr-4">
                <FiUpload className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-text-dark">Upload Documents</h3>
                <p className="text-brand-text-medium text-sm">Bank statements, invoices</p>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/chat" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="bg-green-500 p-3 rounded-lg mr-4">
                <FiMessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-text-dark">AI Assistant</h3>
                <p className="text-brand-text-medium text-sm">Get financial insights</p>
              </div>
            </div>
          </Link>
        </div>

        {/* AI Insights Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-brand-text-dark flex items-center">
              <div className="bg-purple-100 p-2 rounded-lg mr-3">
                <FiZap className="h-5 w-5 text-purple-600" />
              </div>
              AI Insights
            </h3>
            <div className="flex items-center space-x-2">
              <button 
                onClick={fetchAIInsights}
                disabled={aiLoading}
                className="text-brand-teal hover:text-brand-teal-dark text-sm font-medium disabled:opacity-50"
              >
                {aiLoading ? <FiRefreshCw className="animate-spin h-4 w-4" /> : 'Refresh'}
              </button>
              <Link href="/dashboard/insights" className="text-brand-teal hover:text-brand-teal-dark text-sm font-medium">
                View All
              </Link>
            </div>
          </div>
          
          {aiLoading ? (
            <div className="flex items-center justify-center py-8">
              <FiRefreshCw className="animate-spin h-6 w-6 text-brand-teal mr-2" />
              <span className="text-brand-text-medium">Generating AI insights...</span>
            </div>
          ) : aiInsights?.recommendations ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiInsights.recommendations.slice(0, 3).map((rec: any, index: number) => (
                <div key={index} className={`border rounded-lg p-4 ${
                  rec.priority === 'high' ? 'bg-red-50 border-red-200' :
                  rec.priority === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-blue-50 border-blue-200'
                }`}>
                  <div className="flex items-start">
                    {rec.priority === 'high' ? (
                      <FiAlertTriangle className={`h-5 w-5 mt-0.5 mr-3 flex-shrink-0 ${
                        rec.priority === 'high' ? 'text-red-600' : 'text-yellow-600'
                      }`} />
                    ) : rec.priority === 'medium' ? (
                      <FiTarget className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                    ) : (
                      <FiCheckCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    )}
                    <div>
                      <p className={`text-sm font-medium ${
                        rec.priority === 'high' ? 'text-red-800' :
                        rec.priority === 'medium' ? 'text-yellow-800' :
                        'text-blue-800'
                      }`}>{rec.title}</p>
                      <p className={`text-sm mt-1 ${
                        rec.priority === 'high' ? 'text-red-700' :
                        rec.priority === 'medium' ? 'text-yellow-700' :
                        'text-blue-700'
                      }`}>{rec.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-brand-text-medium">No AI insights available. Try refreshing or check back later.</p>
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-brand-text-dark">Recent Transactions</h3>
            <Link href="/dashboard/transactions" className="text-brand-teal hover:text-brand-teal-dark text-sm font-medium">
              View All
            </Link>
          </div>

          {transactions.length === 0 ? (
            <div className="text-center py-8">
              <FiBarChart className="h-12 w-12 text-brand-text-medium mx-auto mb-4" />
              <p className="text-brand-text-medium">No transactions yet</p>
              <Link href="/dashboard/add-transaction" className="text-brand-teal hover:text-brand-teal-dark text-sm font-medium">
                Add your first transaction
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.slice(0, 5).map((transaction) => (
                <div key={transaction.transactionId} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg mr-4 ${
                      transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'income' ? 
                        <FiTrendingUp className="h-5 w-5 text-green-600" /> : 
                        <FiTrendingDown className="h-5 w-5 text-red-600" />
                      }
                    </div>
                    <div>
                      <p className="font-medium text-brand-text-dark">{transaction.description}</p>
                      <p className="text-sm text-brand-text-medium">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className={`font-semibold mr-4 ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                    <button
                      onClick={() => handleDeleteTransaction(transaction.transactionId)}
                      className="text-brand-text-medium hover:text-red-600"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
