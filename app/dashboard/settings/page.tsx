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

interface Settings {
  // Profile settings
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  startingBalance: string;
  monthlyRevenue: string;
  monthlyExpenses: string;
  
  // Notification settings
  emailNotifications: boolean;
  whatsappAlerts: boolean;
  weeklyReports: boolean;
  cashFlowAlerts: boolean;
  alertThreshold: number;
  
  // Security settings
  twoFactorAuth: boolean;
  loginAlerts: boolean;
  
  // Preferences
  currency: string;
  dateFormat: string;
  timezone: string;
  language: string;
}

type TabType = 'profile' | 'notifications' | 'security' | 'billing' | 'preferences';

interface Alert {
  type: 'success' | 'error' | 'warning';
  message: string;
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState<TabType>('profile')
  const [user, setUser] = useState<User | null>(null)
  const [businessData, setBusinessData] = useState<BusinessData | null>(null)
  const [saving, setSaving] = useState<boolean>(false)
  const [alert, setAlert] = useState<Alert | null>(null)
  const router = useRouter()

  const [settings, setSettings] = useState<Settings>({
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
    dateFormat: 'DD/MM/YYYY',
    timezone: 'Africa/Lagos',
    language: 'en'
  })

  useEffect(() => {
    checkAuth()
    loadSettings()
  }, [])

  const checkAuth = (): void => {
    const userData = localStorage.getItem('user')
    const businessUserData = localStorage.getItem('businessData')
    
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push('/auth/login')
      return
    }

    if (businessUserData) {
      setBusinessData(JSON.parse(businessUserData))
    }
  }

  const loadSettings = (): void => {
    // Load settings from localStorage or API
    const savedSettings = localStorage.getItem('userSettings')
    if (savedSettings) {
      setSettings(prev => ({ ...prev, ...JSON.parse(savedSettings) }))
    }

    // Load user data
    const userData = localStorage.getItem('user')
    const businessData = localStorage.getItem('businessData')
    
    if (userData) {
      const user = JSON.parse(userData)
      setSettings(prev => ({
        ...prev,
        email: user.email || prev.email
      }))
    }

    if (businessData) {
      const business = JSON.parse(businessData)
      setSettings(prev => ({
        ...prev,
        businessName: business.businessName || prev.businessName,
        businessType: business.businessType || prev.businessType,
        startingBalance: business.startingBalance || prev.startingBalance,
        monthlyRevenue: business.monthlyRevenue || prev.monthlyRevenue,
        monthlyExpenses: business.monthlyExpenses || prev.monthlyExpenses
      }))
    }
  }

  const handleSettingChange = (key: keyof Settings, value: string | number | boolean): void => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const showAlert = (type: Alert['type'], message: string): void => {
    setAlert({ type, message })
    setTimeout(() => setAlert(null), 5000)
  }

  const saveSettings = async (): Promise<void> => {
    setSaving(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Save to localStorage
      localStorage.setItem('userSettings', JSON.stringify(settings))
      
      // Update business data if changed
      const businessDataUpdate = {
        businessName: settings.businessName,
        businessType: settings.businessType,
        startingBalance: settings.startingBalance,
        monthlyRevenue: settings.monthlyRevenue,
        monthlyExpenses: settings.monthlyExpenses
      }
      localStorage.setItem('businessData', JSON.stringify(businessDataUpdate))
      
      showAlert('success', 'Settings saved successfully!')
      
    } catch (error) {
      showAlert('error', 'Failed to save settings. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const exportData = (): void => {
    const data = {
      settings,
      businessData,
      exportedAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cashflow-data-export.json'
    a.click()
    URL.revokeObjectURL(url)
    
    showAlert('success', 'Data exported successfully!')
  }

  const deleteAccount = (): void => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Clear all data
      localStorage.clear()
      showAlert('success', 'Account deleted successfully!')
      setTimeout(() => {
        router.push('/auth/register')
      }, 2000)
    }
  }

  const businessTypes = [
    { value: 'retail', label: 'Retail' },
    { value: 'wholesale', label: 'Wholesale' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'services', label: 'Services' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'other', label: 'Other' }
  ]

  const tabs = [
    { id: 'profile' as TabType, label: 'Profile', icon: <FiUser /> },
    { id: 'notifications' as TabType, label: 'Notifications', icon: <FiBell /> },
    { id: 'security' as TabType, label: 'Security', icon: <FiShield /> },
    { id: 'billing' as TabType, label: 'Billing', icon: <FiCreditCard /> },
    { id: 'preferences' as TabType, label: 'Preferences', icon: <FiGlobe /> }
  ]

  return (
    <div className="min-h-screen bg-brand-gray-light">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-brand-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link 
              href="/dashboard" 
              className="flex items-center space-x-3 text-brand-gray hover:text-brand-teal transition-colors"
            >
              <FiArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </Link>
            <div className="ml-8">
              <h1 className="text-xl font-semibold text-brand-gray-dark">Settings</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Alert */}
      {alert && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
          <div className={`p-4 rounded-lg border flex items-center space-x-3 ${
            alert.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
            alert.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
            'bg-yellow-50 border-yellow-200 text-yellow-800'
          }`}>
            {alert.type === 'success' && <FiCheck className="text-green-600" size={20} />}
            {alert.type === 'error' && <FiAlertTriangle className="text-red-600" size={20} />}
            {alert.type === 'warning' && <FiAlertTriangle className="text-yellow-600" size={20} />}
            <span>{alert.message}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow-sm border border-brand-gray">
              <div className="p-4">
                <h2 className="text-lg font-semibold text-brand-gray-dark mb-4">Settings</h2>
                <ul className="space-y-2">
                  {tabs.map((tab) => (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === tab.id
                            ? 'bg-brand-teal text-white'
                            : 'text-brand-gray hover:bg-brand-gray-light hover:text-brand-teal'
                        }`}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-brand-gray">
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-brand-gray-dark mb-6">Profile Information</h3>
                  
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h4 className="text-md font-medium text-brand-gray-dark mb-4">Personal Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-brand-gray-dark mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={settings.name}
                            onChange={(e) => handleSettingChange('name', e.target.value)}
                            className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-brand-gray-dark mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={settings.email}
                            onChange={(e) => handleSettingChange('email', e.target.value)}
                            className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-brand-gray-dark mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={settings.phone}
                            onChange={(e) => handleSettingChange('phone', e.target.value)}
                            className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Business Information */}
                    <div>
                      <h4 className="text-md font-medium text-brand-gray-dark mb-4">Business Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-brand-gray-dark mb-2">
                            Business Name
                          </label>
                          <input
                            type="text"
                            value={settings.businessName}
                            onChange={(e) => handleSettingChange('businessName', e.target.value)}
                            className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-brand-gray-dark mb-2">
                            Business Type
                          </label>
                          <select
                            value={settings.businessType}
                            onChange={(e) => handleSettingChange('businessType', e.target.value)}
                            className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                          >
                            {businessTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-brand-gray-dark mb-2">
                            Starting Balance (₦)
                          </label>
                          <input
                            type="number"
                            value={settings.startingBalance}
                            onChange={(e) => handleSettingChange('startingBalance', e.target.value)}
                            className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-brand-gray-dark mb-2">
                            Monthly Revenue (₦)
                          </label>
                          <input
                            type="number"
                            value={settings.monthlyRevenue}
                            onChange={(e) => handleSettingChange('monthlyRevenue', e.target.value)}
                            className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-brand-gray-dark mb-2">
                            Monthly Expenses (₦)
                          </label>
                          <input
                            type="number"
                            value={settings.monthlyExpenses}
                            onChange={(e) => handleSettingChange('monthlyExpenses', e.target.value)}
                            className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-brand-gray-dark mb-6">Notification Preferences</h3>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FiMail className="text-brand-teal" size={20} />
                          <div>
                            <p className="font-medium text-brand-gray-dark">Email Notifications</p>
                            <p className="text-sm text-brand-gray">Receive updates via email</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.emailNotifications}
                            onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-brand-gray-light peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-teal/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-teal"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FiSmartphone className="text-brand-teal" size={20} />
                          <div>
                            <p className="font-medium text-brand-gray-dark">WhatsApp Alerts</p>
                            <p className="text-sm text-brand-gray">Critical alerts via WhatsApp</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.whatsappAlerts}
                            onChange={(e) => handleSettingChange('whatsappAlerts', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-brand-gray-light peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-teal/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-teal"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FiTrendingUp className="text-brand-teal" size={20} />
                          <div>
                            <p className="font-medium text-brand-gray-dark">Weekly Reports</p>
                            <p className="text-sm text-brand-gray">Receive weekly cash flow summary</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.weeklyReports}
                            onChange={(e) => handleSettingChange('weeklyReports', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-brand-gray-light peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-teal/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-teal"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FiAlertTriangle className="text-brand-teal" size={20} />
                          <div>
                            <p className="font-medium text-brand-gray-dark">Cash Flow Alerts</p>
                            <p className="text-sm text-brand-gray">Alert when balance is low</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.cashFlowAlerts}
                            onChange={(e) => handleSettingChange('cashFlowAlerts', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-brand-gray-light peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-teal/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-teal"></div>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-gray-dark mb-2">
                        Alert Threshold (₦)
                      </label>
                      <input
                        type="number"
                        value={settings.alertThreshold}
                        onChange={(e) => handleSettingChange('alertThreshold', parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                        placeholder="50000"
                      />
                      <p className="text-sm text-brand-gray mt-2">
                        You'll be alerted when your balance falls below this amount
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-brand-gray-dark mb-6">Security & Privacy</h3>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FiShield className="text-brand-teal" size={20} />
                          <div>
                            <p className="font-medium text-brand-gray-dark">Two-Factor Authentication</p>
                            <p className="text-sm text-brand-gray">Add an extra layer of security</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.twoFactorAuth}
                            onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-brand-gray-light peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-teal/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-teal"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FiBell className="text-brand-teal" size={20} />
                          <div>
                            <p className="font-medium text-brand-gray-dark">Login Alerts</p>
                            <p className="text-sm text-brand-gray">Get notified of new logins</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.loginAlerts}
                            onChange={(e) => handleSettingChange('loginAlerts', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-brand-gray-light peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-teal/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-teal"></div>
                        </label>
                      </div>
                    </div>

                    <div className="border-t border-brand-gray pt-6">
                      <h4 className="text-md font-medium text-brand-gray-dark mb-4">Data Management</h4>
                      <div className="space-y-3">
                        <button
                          onClick={exportData}
                          className="flex items-center space-x-2 px-4 py-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal/90 transition-colors"
                        >
                          <FiDownload size={16} />
                          <span>Export My Data</span>
                        </button>
                        
                        <button
                          onClick={deleteAccount}
                          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <FiTrash2 size={16} />
                          <span>Delete Account</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing Settings */}
              {activeTab === 'billing' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-brand-gray-dark mb-6">Billing & Subscription</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-brand-gray-light p-4 rounded-lg">
                      <h4 className="font-medium text-brand-gray-dark mb-2">Current Plan</h4>
                      <p className="text-brand-gray mb-4">Free Plan - Basic features included</p>
                      <div className="space-y-2">
                        <p className="text-sm text-brand-gray">✅ Basic cash flow tracking</p>
                        <p className="text-sm text-brand-gray">✅ Up to 50 transactions per month</p>
                        <p className="text-sm text-brand-gray">✅ Basic AI insights</p>
                        <p className="text-sm text-brand-gray">❌ Advanced analytics</p>
                        <p className="text-sm text-brand-gray">❌ Custom reports</p>
                        <p className="text-sm text-brand-gray">❌ Priority support</p>
                      </div>
                    </div>

                    <div className="border border-brand-teal rounded-lg p-6">
                      <h4 className="font-medium text-brand-gray-dark mb-2">Upgrade to Pro</h4>
                      <p className="text-brand-gray mb-4">₦2,500/month - Advanced features for growing businesses</p>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-brand-gray">✅ Unlimited transactions</p>
                        <p className="text-sm text-brand-gray">✅ Advanced AI insights</p>
                        <p className="text-sm text-brand-gray">✅ Custom reports & analytics</p>
                        <p className="text-sm text-brand-gray">✅ WhatsApp notifications</p>
                        <p className="text-sm text-brand-gray">✅ Priority support</p>
                        <p className="text-sm text-brand-gray">✅ API access</p>
                      </div>
                      <button className="w-full bg-brand-teal text-white py-3 rounded-lg hover:bg-brand-teal/90 transition-colors">
                        Upgrade Now
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences */}
              {activeTab === 'preferences' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-brand-gray-dark mb-6">Preferences</h3>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-brand-gray-dark mb-2">
                          Currency
                        </label>
                        <select
                          value={settings.currency}
                          onChange={(e) => handleSettingChange('currency', e.target.value)}
                          className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                        >
                          <option value="NGN">Nigerian Naira (₦)</option>
                          <option value="USD">US Dollar ($)</option>
                          <option value="EUR">Euro (€)</option>
                          <option value="GBP">British Pound (£)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-brand-gray-dark mb-2">
                          Date Format
                        </label>
                        <select
                          value={settings.dateFormat}
                          onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
                          className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                        >
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-brand-gray-dark mb-2">
                          Timezone
                        </label>
                        <select
                          value={settings.timezone}
                          onChange={(e) => handleSettingChange('timezone', e.target.value)}
                          className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                        >
                          <option value="Africa/Lagos">Africa/Lagos</option>
                          <option value="UTC">UTC</option>
                          <option value="Europe/London">Europe/London</option>
                          <option value="America/New_York">America/New_York</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-brand-gray-dark mb-2">
                          Language
                        </label>
                        <select
                          value={settings.language}
                          onChange={(e) => handleSettingChange('language', e.target.value)}
                          className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                        >
                          <option value="en">English</option>
                          <option value="yo">Yoruba</option>
                          <option value="ig">Igbo</option>
                          <option value="ha">Hausa</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="border-t border-brand-gray px-6 py-4">
                <button
                  onClick={saveSettings}
                  disabled={saving}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    saving
                      ? 'bg-brand-gray text-brand-gray-dark cursor-not-allowed'
                      : 'bg-brand-teal text-white hover:bg-brand-teal/90'
                  }`}
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <FiSave size={20} />
                      <span>Save Changes</span>
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