"use client"

import React, { useState, useEffect } from 'react'
import { 
  FiTrendingUp, 
  FiUser,
  FiBell,
  FiShield,
  FiCreditCard,
  FiDownload,
  FiTrash2,
  FiSave,
  FiArrowLeft,
  FiCheck,
  FiAlertTriangle,
  FiPhone,
  FiMail,
  FiGlobe,
  FiSmartphone
} from 'react-icons/fi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [user, setUser] = useState(null)
  const [businessData, setBusinessData] = useState(null)
  const [settings, setSettings] = useState({
    // Profile settings
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+234 801 234 5678',
    businessName: 'Doe Enterprises',
    businessType: 'retail',
    startingBalance: '',
    monthlyRevenue: '',
    monthlyExpenses: '',
    
    // Notification settings
    emailNotifications: true,
    whatsappAlerts: true,
    weeklyReports: true,
    cashFlowAlerts: true,
    alertThreshold: 50000,
    
    // Security settings
    twoFactorAuth: false,
    loginAlerts: true,
    
    // Preferences
    currency: 'NGN',
    timezone: 'Africa/Lagos',
    language: 'en'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const router = useRouter()

  // Check authentication
  useEffect(() => {
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
        setSettings(prev => ({ 
          ...prev, 
          email,
          businessName: parsedSetup.businessName || prev.businessName,
          businessType: parsedSetup.businessType || prev.businessType,
          startingBalance: parsedSetup.startingBalance || '',
          monthlyRevenue: parsedSetup.monthlyRevenue || '',
          monthlyExpenses: parsedSetup.monthlyExpenses || '',
          phone: parsedSetup.phone || prev.phone
        }))
      } else {
        setSettings(prev => ({ ...prev, email }))
      }
    }
  }, [router])

  const handleInputChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = async () => {
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      // Update businessSetup in localStorage if it exists
      const existingSetup = localStorage.getItem('businessSetup')
      if (existingSetup) {
        const parsedSetup = JSON.parse(existingSetup)
        const updatedSetup = {
          ...parsedSetup,
          businessName: settings.businessName,
          businessType: settings.businessType,
          startingBalance: settings.startingBalance,
          monthlyRevenue: settings.monthlyRevenue,
          monthlyExpenses: settings.monthlyExpenses,
          phone: settings.phone
        }
        localStorage.setItem('businessSetup', JSON.stringify(updatedSetup))
      }
      
      setIsSubmitting(false)
      setShowSuccess(true)
      
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 1000)
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'security', label: 'Security', icon: FiShield },
    { id: 'billing', label: 'Billing', icon: FiCreditCard }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link 
                href="/dashboard"
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <FiArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg mr-3">
                <FiTrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Settings</h1>
                <p className="text-sm text-gray-500">Manage your account and preferences</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Success Message */}
      {showSuccess && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <FiCheck className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-green-800">Settings Updated</h3>
                <p className="text-sm text-green-700 mt-1">Your changes have been saved successfully.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-3" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={settings.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          value={settings.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <FiPhone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          value={settings.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Name
                      </label>
                      <input
                        type="text"
                        value={settings.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Type
                      </label>
                      <select
                        value={settings.businessType}
                        onChange={(e) => handleInputChange('businessType', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="retail">Retail</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="services">Professional Services</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="technology">Technology</option>
                        <option value="consulting">Consulting</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Opening Capital (Starting Balance)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-500">₦</span>
                        <input
                          type="number"
                          value={settings.startingBalance}
                          onChange={(e) => handleInputChange('startingBalance', e.target.value)}
                          placeholder="100,000"
                          className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Your initial business capital when you started</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Revenue
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-500">₦</span>
                        <input
                          type="number"
                          value={settings.monthlyRevenue}
                          onChange={(e) => handleInputChange('monthlyRevenue', e.target.value)}
                          placeholder="450,000"
                          className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <FiMail className="h-5 w-5 text-gray-500 mr-3" />
                        <div>
                          <h3 className="font-medium text-gray-900">Email Notifications</h3>
                          <p className="text-sm text-gray-600">Receive updates via email</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications}
                          onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <FiSmartphone className="h-5 w-5 text-gray-500 mr-3" />
                        <div>
                          <h3 className="font-medium text-gray-900">WhatsApp Alerts</h3>
                          <p className="text-sm text-gray-600">Get instant alerts on WhatsApp</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.whatsappAlerts}
                          onChange={(e) => handleInputChange('whatsappAlerts', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <FiDownload className="h-5 w-5 text-gray-500 mr-3" />
                        <div>
                          <h3 className="font-medium text-gray-900">Weekly Reports</h3>
                          <p className="text-sm text-gray-600">Receive weekly financial summaries</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.weeklyReports}
                          onChange={(e) => handleInputChange('weeklyReports', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-start">
                        <FiAlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-2">Cash Flow Alert Threshold</h3>
                          <p className="text-sm text-gray-600 mb-4">Get notified when your balance drops below this amount</p>
                          <input
                            type="number"
                            value={settings.alertThreshold}
                            onChange={(e) => handleInputChange('alertThreshold', parseFloat(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="₦50,000"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <button
                        onClick={() => handleInputChange('twoFactorAuth', !settings.twoFactorAuth)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          settings.twoFactorAuth
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {settings.twoFactorAuth ? 'Disable' : 'Enable'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Login Alerts</h3>
                        <p className="text-sm text-gray-600">Get notified of new login attempts</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.loginAlerts}
                          onChange={(e) => handleInputChange('loginAlerts', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <input
                          type="password"
                          placeholder="Current Password"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="password"
                          placeholder="New Password"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="password"
                          placeholder="Confirm New Password"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing Tab */}
              {activeTab === 'billing' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing & Subscription</h2>
                  
                  <div className="space-y-6">
                    {/* Current Plan */}
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Professional Plan</h3>
                          <p className="text-sm text-gray-600">Advanced AI forecasting and WhatsApp alerts</p>
                          <p className="text-sm text-blue-600 font-medium mt-1">₦15,000/month</p>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                            Active
                          </span>
                          <p className="text-sm text-gray-500 mt-1">Next billing: Oct 23, 2025</p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-4">Payment Method</h3>
                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center">
                          <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center mr-3">
                            <span className="text-white text-xs font-bold">VISA</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">**** **** **** 4242</p>
                            <p className="text-sm text-gray-500">Expires 12/25</p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Update
                        </button>
                      </div>
                    </div>

                    {/* Billing History */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">Recent Invoices</h3>
                      <div className="space-y-2">
                        {[
                          { date: 'Sep 23, 2025', amount: '₦15,000', status: 'Paid' },
                          { date: 'Aug 23, 2025', amount: '₦15,000', status: 'Paid' },
                          { date: 'Jul 23, 2025', amount: '₦15,000', status: 'Paid' }
                        ].map((invoice, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{invoice.date}</p>
                              <p className="text-sm text-gray-500">Professional Plan</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900">{invoice.amount}</p>
                              <span className="inline-flex px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                {invoice.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  disabled={isSubmitting}
                  className={`flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium transition-colors ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}