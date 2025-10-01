"use client"

import React, { useState, useEffect } from 'react'
import { 
  FiTrendingUp, 
  FiTrendingDown,
  FiDollarSign, 
  FiBarChart, 
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiUpload,
  FiMessageCircle,
  FiSettings,
  FiBell,
  FiUser,
  FiLogOut,
  FiPlus,
  FiMinus,
  FiRefreshCw,
  FiDownload,
  FiEye,
  FiFilter,
  FiCalendar,
  FiArrowUp,
  FiArrowDown,
  FiTarget,
  FiZap
} from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Types
interface User {
  email: string;
}

interface BusinessData {
  businessName?: string;
  businessType?: string;
  startingBalance?: string;
  monthlyRevenue?: string;
  monthlyExpenses?: string;
}

interface Payment {
  name: string;
  amount: number;
  dueDate: string;
  type: 'expense' | 'income';
}

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
}

interface AIInsight {
  type: 'warning' | 'success' | 'info';
  message: string;
}

interface MockData {
  currentBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  businessName: string;
  businessType: string;
  healthScore: number;
  upcomingPayments: Payment[];
  recentTransactions: Transaction[];
  aiInsights: AIInsight[];
}

interface CashRunwayData {
  days: number | '∞';
  status: 'positive' | 'good' | 'warning' | 'critical';
  message: string;
  monthlyBurn?: number;
}

type TimeRange = '7days' | '30days' | '90days' | '1year';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [businessData, setBusinessData] = useState<BusinessData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('7days')
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = (): void => {
    const userData = localStorage.getItem('user')
    const businessUserData = localStorage.getItem('businessData')
    
    // if (userData) {
    //   setUser(JSON.parse(userData))
    // } else {
    //   router.push('/auth/login')
    //   return
    // }

    if (businessUserData) {
      setBusinessData(JSON.parse(businessUserData))
    }

    setLoading(false)
  }

  const handleLogout = (): void => {
    localStorage.removeItem('user')
    localStorage.removeItem('businessData')
    localStorage.removeItem('token')
    router.push('/auth/login')
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Mock data for demonstration
  const mockData: MockData = {
    currentBalance: 2850000,
    monthlyIncome: 450000,
    monthlyExpenses: 320000,
    businessName: businessData?.businessName || 'Your Business',
    businessType: businessData?.businessType || 'General',
    healthScore: 78,
    upcomingPayments: [
      { name: 'Office Rent', amount: 120000, dueDate: '2024-01-15', type: 'expense' },
      { name: 'Client Payment', amount: 85000, dueDate: '2024-01-18', type: 'income' },
      { name: 'Supplier Payment', amount: 65000, dueDate: '2024-01-20', type: 'expense' },
      { name: 'Service Fee', amount: 25000, dueDate: '2024-01-22', type: 'expense' },
    ],
    recentTransactions: [
      { id: 1, description: 'Sales Revenue', amount: 150000, type: 'income', date: '2024-01-10' },
      { id: 2, description: 'Marketing Expense', amount: -35000, type: 'expense', date: '2024-01-09' },
      { id: 3, description: 'Consulting Income', amount: 80000, type: 'income', date: '2024-01-08' },
      { id: 4, description: 'Office Supplies', amount: -12000, type: 'expense', date: '2024-01-07' },
      { id: 5, description: 'Software License', amount: -25000, type: 'expense', date: '2024-01-06' },
    ],
    aiInsights: [
      { 
        type: 'warning', 
        message: 'Your expenses increased by 15% this month. Consider reviewing your marketing spend.' 
      },
      { 
        type: 'success', 
        message: 'Your payment collection rate improved by 12% compared to last month.' 
      },
      { 
        type: 'info', 
        message: 'Based on your cash flow pattern, you might want to set aside ₦80,000 for Q1 taxes.' 
      }
    ]
  }

  const calculateCashRunway = (): CashRunwayData => {
    const { currentBalance, monthlyExpenses, monthlyIncome } = mockData
    const monthlyBurn = monthlyExpenses - monthlyIncome
    
    if (monthlyBurn <= 0) {
      return {
        days: '∞',
        status: 'positive',
        message: 'Your business is profitable! 🎉',
        monthlyBurn: 0
      }
    }
    
    const months = currentBalance / monthlyBurn
    const days = Math.floor(months * 30)
    
    let status: CashRunwayData['status']
    let message: string
    
    if (days > 180) {
      status = 'good'
      message = `You have ${Math.floor(months)} months of runway. Strong position! 💪`
    } else if (days > 90) {
      status = 'warning'
      message = `${Math.floor(months)} months runway. Consider increasing revenue or reducing costs. ⚠️`
    } else {
      status = 'critical'
      message = `Only ${Math.floor(months)} months left. Take immediate action! 🚨`
    }
    
    return { days, status, message, monthlyBurn }
  }

  const cashRunway = calculateCashRunway()

  const getHealthScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'warning':
        return <FiAlertTriangle className="text-yellow-500" />
      case 'success':
        return <FiCheckCircle className="text-green-500" />
      case 'info':
        return <FiZap className="text-blue-500" />
      default:
        return <FiZap className="text-blue-500" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <FiRefreshCw className="animate-spin text-primary" size={24} />
          <span className="text-text-primary">Loading dashboard...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-border-brand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <FiBarChart className="text-primary" size={28} />
              <span className="ml-2 text-xl font-bold text-text-primary">CashFlow Co-Pilot</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/dashboard" className="text-primary font-medium border-b-2 border-primary pb-1">
                Overview
              </Link>
              <Link href="/dashboard/add-transaction" className="text-text-secondary hover:text-primary transition-colors">
                Add Transaction
              </Link>
              <Link href="/dashboard/upload" className="text-text-secondary hover:text-primary transition-colors">
                Upload Data
              </Link>
              <Link href="/dashboard/chat" className="text-text-secondary hover:text-primary transition-colors">
                AI Assistant
              </Link>
              <Link href="/dashboard/settings" className="text-text-secondary hover:text-primary transition-colors">
                Settings
              </Link>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-text-secondary hover:text-primary transition-colors">
                <FiBell size={20} />
              </button>
              <div className="relative group">
                <button className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors">
                  <FiUser size={20} />
                  <span className="hidden sm:block">{user?.email}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-text-secondary hover:bg-background-light hover:text-primary w-full text-left"
                    >
                      <FiLogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-text-secondary hover:text-primary transition-colors"
              >
                <FiBarChart size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden bg-white border-t border-border-brand">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/dashboard" className="block px-3 py-2 text-primary font-medium bg-background-light rounded-md">
                Overview
              </Link>
              <Link href="/dashboard/add-transaction" className="block px-3 py-2 text-text-secondary hover:text-primary hover:bg-background-light rounded-md transition-colors">
                Add Transaction
              </Link>
              <Link href="/dashboard/upload" className="block px-3 py-2 text-text-secondary hover:text-primary hover:bg-background-light rounded-md transition-colors">
                Upload Data
              </Link>
              <Link href="/dashboard/chat" className="block px-3 py-2 text-text-secondary hover:text-primary hover:bg-background-light rounded-md transition-colors">
                AI Assistant
              </Link>
              <Link href="/dashboard/settings" className="block px-3 py-2 text-text-secondary hover:text-primary hover:bg-background-light rounded-md transition-colors">
                Settings
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary">
            Welcome back, {mockData.businessName}! 👋
          </h1>
          <p className="text-text-secondary mt-2">
            Here's an overview of your business cash flow and financial health.
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Current Balance */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-border-brand">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary">Current Balance</p>
                <p className="text-2xl font-bold text-text-primary">
                  {formatCurrency(mockData.currentBalance)}
                </p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <FiDollarSign className="text-primary" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <FiTrendingUp className="text-green-500 mr-1" size={16} />
              <span className="text-sm text-green-600">+12.5% from last month</span>
            </div>
          </div>

          {/* Monthly Income */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-border-brand">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary">Monthly Income</p>
                <p className="text-2xl font-bold text-text-primary">
                  {formatCurrency(mockData.monthlyIncome)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FiArrowUp className="text-green-600" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <FiTrendingUp className="text-green-500 mr-1" size={16} />
              <span className="text-sm text-green-600">+8.2% from last month</span>
            </div>
          </div>

          {/* Monthly Expenses */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-border-brand">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary">Monthly Expenses</p>
                <p className="text-2xl font-bold text-text-primary">
                  {formatCurrency(mockData.monthlyExpenses)}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <FiArrowDown className="text-red-600" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <FiTrendingUp className="text-red-500 mr-1" size={16} />
              <span className="text-sm text-red-600">+15.1% from last month</span>
            </div>
          </div>

          {/* Cash Flow Health Score */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-border-brand">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary">Health Score</p>
                <p className={`text-2xl font-bold ${getHealthScoreColor(mockData.healthScore)}`}>
                  {mockData.healthScore}/100
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FiTarget className="text-blue-600" size={24} />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-background-light rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${mockData.healthScore}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Cash Runway Alert */}
        <div className={`mb-8 p-6 rounded-lg border ${
          cashRunway.status === 'positive' ? 'bg-green-50 border-green-200' :
          cashRunway.status === 'good' ? 'bg-blue-50 border-blue-200' :
          cashRunway.status === 'warning' ? 'bg-yellow-50 border-yellow-200' :
          'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-start space-x-4">
            <div className={`p-2 rounded-full ${
              cashRunway.status === 'positive' ? 'bg-green-100' :
              cashRunway.status === 'good' ? 'bg-blue-100' :
              cashRunway.status === 'warning' ? 'bg-yellow-100' :
              'bg-red-100'
            }`}>
              <FiClock className={
                cashRunway.status === 'positive' ? 'text-green-600' :
                cashRunway.status === 'good' ? 'text-blue-600' :
                cashRunway.status === 'warning' ? 'text-yellow-600' :
                'text-red-600'
              } size={24} />
            </div>
            <div>
              <h3 className={`font-semibold ${
                cashRunway.status === 'positive' ? 'text-green-800' :
                cashRunway.status === 'good' ? 'text-blue-800' :
                cashRunway.status === 'warning' ? 'text-yellow-800' :
                'text-red-800'
              }`}>
                Cash Runway: {cashRunway.days === '∞' ? 'Unlimited' : `${cashRunway.days} days`}
              </h3>
              <p className={
                cashRunway.status === 'positive' ? 'text-green-700' :
                cashRunway.status === 'good' ? 'text-blue-700' :
                cashRunway.status === 'warning' ? 'text-yellow-700' :
                'text-red-700'
              }>
                {cashRunway.message}
              </p>
              {cashRunway.monthlyBurn && cashRunway.monthlyBurn > 0 && (
                <p className="text-sm text-brand-gray mt-1">
                  Monthly burn rate: {formatCurrency(cashRunway.monthlyBurn)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts and Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Time Range Selector */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border-brand">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h2 className="text-lg font-semibold text-text-primary mb-4 sm:mb-0">Cash Flow Trend</h2>
                <div className="flex space-x-2">
                  {(['7days', '30days', '90days', '1year'] as TimeRange[]).map((range) => (
                    <button
                      key={range}
                      onClick={() => setSelectedTimeRange(range)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        selectedTimeRange === range
                          ? 'bg-primary text-white'
                          : 'text-text-secondary hover:text-primary hover:bg-background-light'
                      }`}
                    >
                      {range === '7days' ? '7D' : range === '30days' ? '30D' : range === '90days' ? '90D' : '1Y'}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Placeholder for Chart */}
              <div className="h-64 bg-background-light rounded-lg flex items-center justify-center">
                <div className="text-center text-text-secondary">
                  <FiBarChart size={48} className="mx-auto mb-2" />
                  <p>Cash flow chart will be displayed here</p>
                  <p className="text-sm">Integrate with charting library like Chart.js or Recharts</p>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border-brand">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-text-primary">AI-Powered Insights</h2>
                <FiZap className="text-primary" size={20} />
              </div>
              
              <div className="space-y-4">
                {mockData.aiInsights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-background-light rounded-lg">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <p className="text-text-primary text-sm">{insight.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-border-brand">
                <Link 
                  href="/dashboard/chat"
                  className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors"
                >
                  <FiMessageCircle size={16} />
                  <span className="text-sm font-medium">Chat with AI for more insights</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Recent Activity & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border-brand">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/dashboard/add-transaction"
                  className="flex items-center space-x-3 p-3 border border-border-brand rounded-lg hover:bg-background-light hover:border-primary transition-colors group"
                >
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                    <FiPlus className="text-primary group-hover:text-white" size={16} />
                  </div>
                  <span className="text-text-primary group-hover:text-primary">Add Transaction</span>
                </Link>
                
                <Link
                  href="/dashboard/upload"
                  className="flex items-center space-x-3 p-3 border border-border-brand rounded-lg hover:bg-background-light hover:border-primary transition-colors group"
                >
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                    <FiUpload className="text-primary group-hover:text-white" size={16} />
                  </div>
                  <span className="text-text-primary group-hover:text-primary">Upload Bank Data</span>
                </Link>
                
                <Link
                  href="/dashboard/chat"
                  className="flex items-center space-x-3 p-3 border border-border-brand rounded-lg hover:bg-background-light hover:border-primary transition-colors group"
                >
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                    <FiMessageCircle className="text-primary group-hover:text-white" size={16} />
                  </div>
                  <span className="text-text-primary group-hover:text-primary">Ask AI Assistant</span>
                </Link>
              </div>
            </div>

            {/* Upcoming Payments */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border-brand">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">Upcoming Payments</h3>
                <FiCalendar className="text-text-secondary" size={20} />
              </div>
              
              <div className="space-y-3">
                {mockData.upcomingPayments.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-background-light rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        payment.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {payment.type === 'income' ? 
                          <FiArrowUp className="text-green-600" size={16} /> :
                          <FiArrowDown className="text-red-600" size={16} />
                        }
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{payment.name}</p>
                        <p className="text-xs text-text-secondary">{payment.dueDate}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${
                      payment.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {payment.type === 'income' ? '+' : '-'}{formatCurrency(payment.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border-brand">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">Recent Transactions</h3>
                <button className="text-primary hover:text-primary-dark transition-colors">
                  <FiEye size={20} />
                </button>
              </div>
              
              <div className="space-y-3">
                {mockData.recentTransactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'income' ? 
                          <FiArrowUp className="text-green-600" size={14} /> :
                          <FiArrowDown className="text-red-600" size={14} />
                        }
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{transaction.description}</p>
                        <p className="text-xs text-text-secondary">{transaction.date}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : ''}{formatCurrency(Math.abs(transaction.amount))}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-border-brand">
                <Link 
                  href="/dashboard/add-transaction"
                  className="flex items-center justify-center space-x-2 text-primary hover:text-primary-dark transition-colors"
                >
                  <FiPlus size={16} />
                  <span className="text-sm font-medium">Add New Transaction</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}