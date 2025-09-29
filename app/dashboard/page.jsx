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

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [businessData, setBusinessData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedTimeRange, setSelectedTimeRange] = useState('7days')
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const router = useRouter()

  // Check authentication and load user data
  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token')
        const email = localStorage.getItem('userEmail')
        const businessSetup = localStorage.getItem('businessSetup')
        
        if (!token || !email) {
          router.push('/auth/login')
          return
        }
        
        setUser({ email })
        
        // Load business data if available
        if (businessSetup) {
          const parsedSetup = JSON.parse(businessSetup)
          setBusinessData(parsedSetup)
        }
        
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userEmail')
    router.push('/')
  }

  // Mock data for demonstration - use real business data when available
  const mockData = {
    currentBalance: businessData?.startingBalance ? parseFloat(businessData.startingBalance) : 250000,
    monthlyIncome: businessData?.monthlyRevenue ? parseFloat(businessData.monthlyRevenue) : 450000,
    monthlyExpenses: businessData?.monthlyExpenses ? parseFloat(businessData.monthlyExpenses) : 320000,
    businessName: businessData?.businessName || 'Your Business',
    businessType: businessData?.businessType || 'retail',
    healthScore: 78,
    upcomingPayments: [
      { name: 'Rent', amount: 120000, dueDate: '2025-09-25', type: 'expense' },
      { name: 'Supplier Payment', amount: 85000, dueDate: '2025-09-27', type: 'expense' },
      { name: 'Client Invoice', amount: 200000, dueDate: '2025-09-30', type: 'income' }
    ],
    recentTransactions: [
      { id: 1, description: 'Sales Revenue', amount: 75000, type: 'income', date: '2025-09-22' },
      { id: 2, description: 'Office Supplies', amount: -12000, type: 'expense', date: '2025-09-21' },
      { id: 3, description: 'Freelancer Payment', amount: -25000, type: 'expense', date: '2025-09-20' },
      { id: 4, description: 'Product Sales', amount: 95000, type: 'income', date: '2025-09-19' }
    ],
    aiInsights: [
      { type: 'warning', message: 'Your expenses are trending 15% higher than last month. Consider reviewing your supplier costs.' },
      { type: 'success', message: 'Great news! Your revenue is up 23% compared to last quarter.' },
      { type: 'info', message: `Based on your patterns, you should have ₦${((businessData?.startingBalance ? parseFloat(businessData.startingBalance) : 250000) * 1.2).toLocaleString()} available for equipment purchase by October 15th.` }
    ]
  }

  // Calculate Cash Runway
  const calculateCashRunway = () => {
    const { currentBalance, monthlyIncome, monthlyExpenses } = mockData
    const netCashFlow = monthlyIncome - monthlyExpenses // Monthly surplus/deficit
    
    if (netCashFlow >= 0) {
      // If making profit, runway is theoretically infinite
      return { days: '∞', status: 'positive', message: 'Positive cash flow' }
    } else {
      // If burning cash, calculate how many days until balance reaches zero
      const monthlyBurn = Math.abs(netCashFlow)
      const runwayDays = Math.floor((currentBalance / monthlyBurn) * 30) // Convert months to days
      
      let status = 'good'
      if (runwayDays < 30) status = 'critical'
      else if (runwayDays < 90) status = 'warning'
      
      return { 
        days: runwayDays, 
        status, 
        message: `${runwayDays} days at current burn rate`,
        monthlyBurn: monthlyBurn
      }
    }
  }

  const cashRunwayData = calculateCashRunway()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <FiRefreshCw className="h-6 w-6 text-blue-600 animate-spin" />
          <span className="text-gray-600 text-lg">Loading your dashboard...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <FiTrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">
                  {businessData?.businessName ? `${businessData.businessName} - CashFlow Co-Pilot` : 'CashFlow Co-Pilot'}
                </h1>
                <p className="text-sm text-gray-500">Dashboard</p>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <FiBell className="h-5 w-5" />
              </button>
              <Link 
                href="/dashboard/settings"
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                title="Settings"
              >
                <FiSettings className="h-5 w-5" />
              </Link>
              <div className="relative">
                <button 
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <FiUser className="h-4 w-4 text-white" />
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {user?.email?.split('@')[0]}
                  </span>
                </button>
                
                {/* Dropdown Menu */}
                {showMobileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <Link href="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <FiSettings className="inline h-4 w-4 mr-2" />
                      Settings
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      <FiLogOut className="inline h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.email?.split('@')[0]}! 👋
          </h2>
          <p className="text-gray-600 mt-1">Here's your financial overview for today</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-2">
            {['7days', '30days', '90days', '1year'].map((range) => (
              <button
                key={range}
                onClick={() => setSelectedTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTimeRange === range
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {range === '7days' ? 'Last 7 Days' : 
                 range === '30days' ? 'Last 30 Days' : 
                 range === '90days' ? 'Last 90 Days' : 
                 'Last Year'}
              </button>
            ))}
          </div>
          
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <FiDownload className="h-4 w-4 mr-2" />
              Export
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              <FiRefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Current Balance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Balance</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  ₦{mockData.currentBalance.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FiDollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <FiTrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">+12% from last month</span>
            </div>
          </div>

          {/* Starting Capital */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Starting Capital</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  ₦{businessData?.startingBalance?.toLocaleString() || '0'}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FiTarget className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <FiCheckCircle className="h-4 w-4 text-blue-500 mr-1" />
              <span className="text-sm text-blue-600 font-medium">Initial investment</span>
            </div>
          </div>

          {/* Capital Used */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Capital Used</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  ₦{businessData?.startingBalance ? 
                    (parseFloat(businessData.startingBalance) - mockData.currentBalance).toLocaleString() : 
                    '0'}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FiArrowDown className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <FiZap className="h-4 w-4 text-purple-500 mr-1" />
              <span className="text-sm text-purple-600 font-medium">
                {businessData?.startingBalance ? 
                  `${(((parseFloat(businessData.startingBalance) - mockData.currentBalance) / parseFloat(businessData.startingBalance)) * 100).toFixed(1)}% of capital` : 
                  '0% of capital'}
              </span>
            </div>
          </div>

          {/* Cash Runway */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <p className="text-sm font-medium text-gray-600">Cash Runway</p>
                  <div className="ml-2 group relative">
                    <FiAlertTriangle className="h-4 w-4 text-gray-400 cursor-help" />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                      Time until cash runs out at current burn rate
                    </div>
                  </div>
                </div>
                <p className={`text-2xl font-bold mt-2 ${
                  cashRunwayData.status === 'positive' ? 'text-green-600' :
                  cashRunwayData.status === 'critical' ? 'text-red-600' :
                  cashRunwayData.status === 'warning' ? 'text-yellow-600' : 'text-gray-900'
                }`}>
                  {cashRunwayData.days} {cashRunwayData.days !== '∞' ? 'days' : ''}
                </p>
                <p className="text-xs text-gray-500 mt-1">{cashRunwayData.message}</p>
                {cashRunwayData.monthlyBurn && (
                  <p className="text-xs text-gray-400 mt-1">
                    Monthly burn: ₦{cashRunwayData.monthlyBurn.toLocaleString()}
                  </p>
                )}
              </div>
              <div className={`p-3 rounded-full ${
                cashRunwayData.status === 'positive' ? 'bg-green-100' :
                cashRunwayData.status === 'critical' ? 'bg-red-100' :
                cashRunwayData.status === 'warning' ? 'bg-yellow-100' : 'bg-purple-100'
              }`}>
                <FiClock className={`h-6 w-6 ${
                  cashRunwayData.status === 'positive' ? 'text-green-600' :
                  cashRunwayData.status === 'critical' ? 'text-red-600' :
                  cashRunwayData.status === 'warning' ? 'text-yellow-600' : 'text-purple-600'
                }`} />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Current Balance: ₦{mockData.currentBalance.toLocaleString()}</span>
                <span>Net Flow: ₦{(mockData.monthlyIncome - mockData.monthlyExpenses).toLocaleString()}/mo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/dashboard/add-transaction">
              <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors w-full">
                <div className="bg-green-100 p-3 rounded-full mb-3">
                  <FiPlus className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Add Income</span>
              </button>
            </Link>
            
            <Link href="/dashboard/add-transaction">
              <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors w-full">
                <div className="bg-red-100 p-3 rounded-full mb-3">
                  <FiMinus className="h-5 w-5 text-red-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Add Expense</span>
              </button>
            </Link>
            
            <Link href="/dashboard/upload">
              <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors w-full">
                <div className="bg-blue-100 p-3 rounded-full mb-3">
                  <FiUpload className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Upload Statement</span>
              </button>
            </Link>
            
            <Link href="/dashboard/chat">
              <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors w-full">
                <div className="bg-purple-100 p-3 rounded-full mb-3">
                  <FiMessageCircle className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Ask AI</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Chart and Transactions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Cash Flow Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Cash Flow Trend</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View Details
                </button>
              </div>
              
              {/* Custom Chart */}
              <div className="h-64 relative">
                {/* Chart Background */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent rounded-lg">
                  {/* Grid Lines */}
                  <div className="absolute inset-0">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute w-full border-t border-gray-100" 
                        style={{ top: `${i * 25}%` }}
                      />
                    ))}
                    {[...Array(7)].map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute h-full border-l border-gray-100" 
                        style={{ left: `${i * 16.67}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Chart Data Points and Lines */}
                <svg className="absolute inset-0 w-full h-full">
                  {/* Income Line (Green) */}
                  <polyline
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                    points="10,180 60,160 110,140 160,120 210,100 260,80 310,60"
                    className="animate-pulse"
                  />
                  
                  {/* Expenses Line (Red) */}
                  <polyline
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="3"
                    points="10,200 60,190 110,180 160,170 210,160 260,150 310,140"
                    className="animate-pulse"
                    style={{ animationDelay: '0.5s' }}
                  />

                  {/* Data Points for Income */}
                  {[
                    { x: 10, y: 180 },
                    { x: 60, y: 160 },
                    { x: 110, y: 140 },
                    { x: 160, y: 120 },
                    { x: 210, y: 100 },
                    { x: 260, y: 80 },
                    { x: 310, y: 60 }
                  ].map((point, index) => (
                    <circle
                      key={`income-${index}`}
                      cx={point.x}
                      cy={point.y}
                      r="4"
                      fill="#10B981"
                      className="hover:r-6 transition-all cursor-pointer"
                    />
                  ))}

                  {/* Data Points for Expenses */}
                  {[
                    { x: 10, y: 200 },
                    { x: 60, y: 190 },
                    { x: 110, y: 180 },
                    { x: 160, y: 170 },
                    { x: 210, y: 160 },
                    { x: 260, y: 150 },
                    { x: 310, y: 140 }
                  ].map((point, index) => (
                    <circle
                      key={`expense-${index}`}
                      cx={point.x}
                      cy={point.y}
                      r="4"
                      fill="#EF4444"
                      className="hover:r-6 transition-all cursor-pointer"
                    />
                  ))}
                </svg>

                {/* Chart Labels */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-between text-xs text-gray-500 px-2">
                  {['17 Sep', '18 Sep', '19 Sep', '20 Sep', '21 Sep', '22 Sep', '23 Sep'].map((date, index) => (
                    <span key={index} className="transform -rotate-45">{date}</span>
                  ))}
                </div>

                {/* Y-axis Labels */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 py-2">
                  <span>₦500K</span>
                  <span>₦400K</span>
                  <span>₦300K</span>
                  <span>₦200K</span>
                  <span>₦100K</span>
                </div>

                {/* Legend */}
                <div className="absolute top-4 right-4 bg-white shadow-sm border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-xs text-gray-600">Income</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-xs text-gray-600">Expenses</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                <button className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                  <FiEye className="h-4 w-4 mr-1" />
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {mockData.recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full mr-4 ${
                        transaction.type === 'income' 
                          ? 'bg-green-100' 
                          : 'bg-red-100'
                      }`}>
                        {transaction.type === 'income' ? (
                          <FiArrowUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <FiArrowDown className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <span className={`font-semibold ${
                      transaction.type === 'income' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : ''}₦{Math.abs(transaction.amount).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - AI Insights and Upcoming */}
          <div className="space-y-8">
            {/* AI Insights */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <FiZap className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
              </div>
              <div className="space-y-4">
                {mockData.aiInsights.map((insight, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${
                    insight.type === 'warning' ? 'bg-orange-50 border-orange-400' :
                    insight.type === 'success' ? 'bg-green-50 border-green-400' :
                    'bg-blue-50 border-blue-400'
                  }`}>
                    <div className="flex items-start">
                      {insight.type === 'warning' ? (
                        <FiAlertTriangle className="h-5 w-5 text-orange-600 mr-3 mt-0.5" />
                      ) : insight.type === 'success' ? (
                        <FiCheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                      ) : (
                        <FiZap className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      )}
                      <p className="text-sm text-gray-700 leading-relaxed">{insight.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Payments */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Upcoming Payments</h3>
              <div className="space-y-4">
                {mockData.upcomingPayments.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-100">
                    <div>
                      <p className="font-medium text-gray-900">{payment.name}</p>
                      <p className="text-sm text-gray-500">Due: {payment.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        payment.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {payment.type === 'income' ? '+' : '-'}₦{payment.amount.toLocaleString()}
                      </p>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        payment.type === 'income' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {payment.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Health Score */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Financial Health Score</h3>
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      strokeDasharray={`${mockData.healthScore}, 100`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{mockData.healthScore}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">Good Financial Health</p>
                <p className="text-xs text-gray-500">Based on your cash flow patterns and payment history</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}