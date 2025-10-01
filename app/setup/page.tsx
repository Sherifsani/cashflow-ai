"use client"

import React, { JSX, useState } from 'react'
import { 
  FiTrendingUp, 
  FiArrowRight,
  FiArrowLeft,
  FiCheck,
  FiDollarSign,
  FiUser,
  FiBriefcase,
  FiMapPin,
  FiPhone,
  FiMail,
  FiTarget,
  FiSettings
} from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Type definitions
interface BusinessType {
  id: string;
  name: string;
  icon: string;
}

interface Goal {
  id: string;
  name: string;
  description: string;
}

interface BusinessData {
  // Step 1: Business Info
  businessName: string;
  businessType: string;
  location: string;
  
  // Step 2: Financial Info  
  startingBalance: string;
  monthlyRevenue: string;
  monthlyExpenses: string;
  
  // Step 3: Goals
  primaryGoal: string;
  targetGrowth: string;
  
  // Step 4: Contact
  phone: string;
  whatsappAlerts: boolean;
  emailReports: boolean;
}

export default function BusinessSetup(): JSX.Element {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [businessData, setBusinessData] = useState<BusinessData>({
    // Step 1: Business Info
    businessName: '',
    businessType: '',
    location: '',
    
    // Step 2: Financial Info  
    startingBalance: '',
    monthlyRevenue: '',
    monthlyExpenses: '',
    
    // Step 3: Goals
    primaryGoal: '',
    targetGrowth: '',
    
    // Step 4: Contact
    phone: '',
    whatsappAlerts: true,
    emailReports: true
  })
  const router = useRouter()

  const businessTypes: BusinessType[] = [
    { id: 'restaurant', name: 'Restaurant/Food Service', icon: '🍽️' },
    { id: 'retail', name: 'Retail/Shop', icon: '🏪' },
    { id: 'services', name: 'Professional Services', icon: '💼' },
    { id: 'beauty', name: 'Beauty/Salon', icon: '💇‍♀️' },
    { id: 'tech', name: 'Technology/IT', icon: '💻' },
    { id: 'construction', name: 'Construction', icon: '🏗️' },
    { id: 'transport', name: 'Transportation', icon: '🚛' },
    { id: 'other', name: 'Other', icon: '📋' }
  ]

  const goals: Goal[] = [
    { id: 'grow', name: 'Grow my business', description: 'Expand operations and increase revenue' },
    { id: 'save', name: 'Save more money', description: 'Optimize expenses and build reserves' },
    { id: 'plan', name: 'Better financial planning', description: 'Forecast and budget effectively' },
    { id: 'hire', name: 'Hire more staff', description: 'Expand team when financially ready' },
    { id: 'expand', name: 'Open new locations', description: 'Scale to multiple locations' }
  ]

  const handleInputChange = (field: keyof BusinessData, value: string | boolean): void => {
    setBusinessData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const nextStep = (): void => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = (): void => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completeSetup = (): void => {
    // Save business data to localStorage
    localStorage.setItem('businessSetup', JSON.stringify(businessData))
    localStorage.setItem('setupCompleted', 'true')
    
    // Redirect to dashboard
    router.push('/dashboard')
  }

  const getStepTitle = (): string => {
    switch (currentStep) {
      case 1: return 'Tell us about your business'
      case 2: return 'Your current financial situation'
      case 3: return 'What are your goals?'
      case 4: return 'Stay connected'
      default: return 'Business Setup'
    }
  }

  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 1: 
        return !!(businessData.businessName && businessData.businessType && businessData.location)
      case 2: 
        return !!(businessData.startingBalance && businessData.monthlyExpenses)
      case 3: 
        return !!businessData.primaryGoal
      case 4: 
        return !!businessData.phone
      default: 
        return false
    }
  }

  const formatCurrency = (amount: string): string => {
    if (!amount) return "X"
    return parseFloat(amount).toLocaleString()
  }

  const calculateRunwayMonths = (): number => {
    if (!businessData.startingBalance || !businessData.monthlyExpenses) return 0
    return Math.floor(parseFloat(businessData.startingBalance) / parseFloat(businessData.monthlyExpenses))
  }

  const calculateProfitMargin = (): number => {
    if (!businessData.monthlyRevenue || !businessData.monthlyExpenses) return 0
    const revenue = parseFloat(businessData.monthlyRevenue)
    const expenses = parseFloat(businessData.monthlyExpenses)
    return ((revenue - expenses) / revenue * 100)
  }

  const calculateMonthlyProfit = (): number => {
    if (!businessData.monthlyRevenue || !businessData.monthlyExpenses) return 0
    return parseFloat(businessData.monthlyRevenue) - parseFloat(businessData.monthlyExpenses)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-white p-3 rounded-full w-16 h-16 mx-auto mb-4 shadow-lg">
            <FiTrendingUp className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to CashFlow Co-Pilot</h1>
          <p className="text-gray-600">Let's set up your business profile to get personalized insights</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Step {currentStep} of 4</span>
            <span className="text-sm text-gray-500">{Math.round((currentStep / 4) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{getStepTitle()}</h2>

          {/* Step 1: Business Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name *
                </label>
                <div className="relative">
                  <FiBriefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={businessData.businessName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('businessName', e.target.value)}
                    placeholder="e.g., Ada's Coffee Shop"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Business Type *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {businessTypes.map((type: BusinessType) => (
                    <button
                      key={type.id}
                      onClick={() => handleInputChange('businessType', type.id)}
                      className={`flex items-center p-3 rounded-lg border-2 transition-colors ${
                        businessData.businessType === type.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="mr-3 text-xl">{type.icon}</span>
                      <span className="text-sm font-medium">{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={businessData.location}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('location', e.target.value)}
                    placeholder="e.g., Lagos, Nigeria"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Financial Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start">
                  <FiDollarSign className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-900">Your money stays safe!</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      We only track your finances - your money remains in your bank account.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Starting Balance (Current cash in bank) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">₦</span>
                  <input
                    type="number"
                    value={businessData.startingBalance}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('startingBalance', e.target.value)}
                    placeholder="100,000"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Capital Allocation Section */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">How will you use your starting capital?</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Understanding how you plan to spend your ₦{formatCurrency(businessData.startingBalance)} helps us track your cash runway.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Monthly Expenses *
                </label>
                <p className="text-xs text-gray-500 mb-2">How much do you expect to spend per month on rent, supplies, salaries, etc.?</p>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">₦</span>
                  <input
                    type="number"
                    value={businessData.monthlyExpenses}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('monthlyExpenses', e.target.value)}
                    placeholder="50,000"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Monthly Revenue (Optional)
                </label>
                <p className="text-xs text-gray-500 mb-2">Once your business is running, how much do you expect to earn monthly? (You can update this later)</p>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">₦</span>
                  <input
                    type="number"
                    value={businessData.monthlyRevenue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('monthlyRevenue', e.target.value)}
                    placeholder="100,000"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {businessData.startingBalance && businessData.monthlyExpenses && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <FiCheck className="h-5 w-5 text-green-600 mr-3" />
                    <div>
                      <h3 className="font-medium text-green-900">
                        Cash Runway: {calculateRunwayMonths()} months
                      </h3>
                      <p className="text-sm text-green-700">
                        Your ₦{formatCurrency(businessData.startingBalance)} can cover expenses for about {calculateRunwayMonths()} months
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {businessData.monthlyRevenue && businessData.monthlyExpenses && parseFloat(businessData.monthlyRevenue) > parseFloat(businessData.monthlyExpenses) && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center">
                    <FiCheck className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <h3 className="font-medium text-blue-900">
                        Projected Monthly Profit: ₦{calculateMonthlyProfit().toLocaleString()}
                      </h3>
                      <p className="text-sm text-blue-700">
                        {calculateProfitMargin().toFixed(1)}% projected profit margin
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Goals */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  What's your primary business goal? *
                </label>
                <div className="space-y-3">
                  {goals.map((goal: Goal) => (
                    <button
                      key={goal.id}
                      onClick={() => handleInputChange('primaryGoal', goal.id)}
                      className={`w-full flex items-start p-4 rounded-lg border-2 text-left transition-colors ${
                        businessData.primaryGoal === goal.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <FiTarget className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">{goal.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Monthly Growth (%)
                </label>
                <select
                  value={businessData.targetGrowth}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange('targetGrowth', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select target growth</option>
                  <option value="5">5% - Conservative growth</option>
                  <option value="10">10% - Steady growth</option>
                  <option value="15">15% - Aggressive growth</option>
                  <option value="20">20% - Ambitious growth</option>
                  <option value="25">25%+ - Rapid expansion</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 4: Contact & Preferences */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (for WhatsApp alerts) *
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={businessData.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('phone', e.target.value)}
                    placeholder="+234 801 234 5678"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Notification Preferences</h3>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <FiPhone className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">WhatsApp Alerts</h4>
                      <p className="text-sm text-gray-600">Daily cash flow summaries via WhatsApp</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={businessData.whatsappAlerts}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('whatsappAlerts', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <FiMail className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Weekly Email Reports</h4>
                      <p className="text-sm text-gray-600">Detailed financial analysis every week</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={businessData.emailReports}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('emailReports', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          {currentStep > 1 ? (
            <button
              onClick={prevStep}
              className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FiArrowLeft className="h-5 w-5 mr-2" />
              Previous
            </button>
          ) : (
            <Link 
              href="/dashboard"
              className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Skip Setup
            </Link>
          )}

          <div className="flex space-x-3">
            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <FiArrowRight className="h-5 w-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={completeSetup}
                disabled={!isStepValid()}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Complete Setup
                <FiCheck className="h-5 w-5 ml-2" />
              </button>
            )}
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Need help? <a href="#" className="text-blue-600 hover:text-blue-700">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  )
}