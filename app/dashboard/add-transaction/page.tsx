"use client"

import React, { useState, useEffect } from 'react'
import { 
  FiArrowLeft, 
  FiDollarSign, 
  FiCalendar, 
  FiTag, 
  FiFileText, 
  FiSave,
  FiPlus,
  FiMinus,
  FiTrendingUp,
  FiTrendingDown,
  FiX,
  FiCheck,
  FiAlertCircle
} from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Types
interface User {
  email: string;
}

interface FormData {
  type: 'income' | 'expense';
  amount: string;
  description: string;
  category: string;
  date: string;
  tags: string[];
  notes: string;
}

interface Category {
  name: string;
  icon: React.ReactNode;
  type: 'income' | 'expense' | 'both';
}

interface ValidationErrors {
  amount?: string;
  description?: string;
  category?: string;
  date?: string;
}

type AlertType = 'success' | 'error' | 'info';

interface Alert {
  type: AlertType;
  message: string;
}

export default function AddTransaction() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [saving, setSaving] = useState<boolean>(false)
  const [alert, setAlert] = useState<Alert | null>(null)
  const [newTag, setNewTag] = useState<string>('')
  const [errors, setErrors] = useState<ValidationErrors>({})
  const router = useRouter()

  const [formData, setFormData] = useState<FormData>({
    type: 'expense',
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    tags: [],
    notes: ''
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = (): void => {
    const userData = localStorage.getItem('user')
    
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push('/auth/login')
      return
    }

    setLoading(false)
  }

  const categories: Category[] = [
    // Income categories
    { name: 'Sales Revenue', icon: <FiDollarSign />, type: 'income' },
    { name: 'Service Income', icon: <FiTrendingUp />, type: 'income' },
    { name: 'Investment Return', icon: <FiTrendingUp />, type: 'income' },
    { name: 'Loan/Funding', icon: <FiDollarSign />, type: 'income' },
    { name: 'Other Income', icon: <FiPlus />, type: 'income' },
    
    // Expense categories
    { name: 'Office Rent', icon: <FiTrendingDown />, type: 'expense' },
    { name: 'Utilities', icon: <FiMinus />, type: 'expense' },
    { name: 'Marketing', icon: <FiTrendingDown />, type: 'expense' },
    { name: 'Equipment', icon: <FiMinus />, type: 'expense' },
    { name: 'Staff Salaries', icon: <FiTrendingDown />, type: 'expense' },
    { name: 'Supplies', icon: <FiMinus />, type: 'expense' },
    { name: 'Software/Subscriptions', icon: <FiTrendingDown />, type: 'expense' },
    { name: 'Travel', icon: <FiMinus />, type: 'expense' },
    { name: 'Professional Services', icon: <FiTrendingDown />, type: 'expense' },
    { name: 'Other Expense', icon: <FiMinus />, type: 'expense' },
  ]

  const getFilteredCategories = (): Category[] => {
    return categories.filter(cat => cat.type === formData.type || cat.type === 'both')
  }

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than 0'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please enter a description'
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category'
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    if (!validateForm()) {
      showAlert('error', 'Please fix the errors above')
      return
    }

    setSaving(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // In a real app, you would save to your backend here
      const transaction = {
        ...formData,
        amount: parseFloat(formData.amount),
        id: Date.now(),
        createdAt: new Date().toISOString()
      }

      // Save to localStorage for demonstration
      const existingTransactions = JSON.parse(localStorage.getItem('transactions') || '[]')
      existingTransactions.unshift(transaction)
      localStorage.setItem('transactions', JSON.stringify(existingTransactions))

      showAlert('success', 'Transaction added successfully!')
      
      // Reset form
      setFormData({
        type: 'expense',
        amount: '',
        description: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        tags: [],
        notes: ''
      })

      // Redirect after a short delay
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)

    } catch (error) {
      showAlert('error', 'Failed to save transaction. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const showAlert = (type: AlertType, message: string): void => {
    setAlert({ type, message })
    setTimeout(() => setAlert(null), 5000)
  }

  const handleInputChange = (field: keyof FormData, value: string | string[]): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Clear error when user starts typing
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const addTag = (): void => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      handleInputChange('tags', [...formData.tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string): void => {
    handleInputChange('tags', formData.tags.filter(tag => tag !== tagToRemove))
  }

  const formatCurrency = (amount: string): string => {
    const num = parseFloat(amount)
    if (isNaN(num)) return ''
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-gray-light flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-teal"></div>
          <span className="text-brand-gray-dark">Loading...</span>
        </div>
      </div>
    )
  }

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
              <h1 className="text-xl font-semibold text-brand-gray-dark">Add New Transaction</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Alert */}
      {alert && (
        <div className={`mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-4`}>
          <div className={`p-4 rounded-lg border flex items-center space-x-3 ${
            alert.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
            alert.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
            'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            {alert.type === 'success' && <FiCheck className="text-green-600" size={20} />}
            {alert.type === 'error' && <FiAlertCircle className="text-red-600" size={20} />}
            {alert.type === 'info' && <FiAlertCircle className="text-blue-600" size={20} />}
            <span>{alert.message}</span>
            <button
              onClick={() => setAlert(null)}
              className="ml-auto text-current hover:opacity-70"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Transaction Type */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-brand-gray">
            <h2 className="text-lg font-semibold text-brand-gray-dark mb-4">Transaction Type</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  handleInputChange('type', 'income')
                  handleInputChange('category', '') // Reset category when type changes
                }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData.type === 'income'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-brand-gray bg-white text-brand-gray hover:border-green-500 hover:bg-green-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-3">
                  <FiTrendingUp size={24} />
                  <div className="text-left">
                    <p className="font-medium">Income</p>
                    <p className="text-sm opacity-70">Money coming in</p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  handleInputChange('type', 'expense')
                  handleInputChange('category', '') // Reset category when type changes
                }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData.type === 'expense'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-brand-gray bg-white text-brand-gray hover:border-red-500 hover:bg-red-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-3">
                  <FiTrendingDown size={24} />
                  <div className="text-left">
                    <p className="font-medium">Expense</p>
                    <p className="text-sm opacity-70">Money going out</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Amount and Description */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-brand-gray">
            <h2 className="text-lg font-semibold text-brand-gray-dark mb-4">Transaction Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-brand-gray-dark mb-2">
                  Amount (₦)
                </label>
                <div className="relative">
                  <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-gray" size={20} />
                  <input
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal ${
                      errors.amount ? 'border-red-500' : 'border-brand-gray'
                    }`}
                    placeholder="0.00"
                  />
                </div>
                {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
                {formData.amount && (
                  <p className="mt-1 text-sm text-brand-gray">
                    {formatCurrency(formData.amount)}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-gray-dark mb-2">
                  Description
                </label>
                <div className="relative">
                  <FiFileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-gray" size={20} />
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal ${
                      errors.description ? 'border-red-500' : 'border-brand-gray'
                    }`}
                    placeholder="Enter transaction description"
                  />
                </div>
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>
            </div>
          </div>

          {/* Category and Date */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-brand-gray">
            <h2 className="text-lg font-semibold text-brand-gray-dark mb-4">Category & Date</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-brand-gray-dark mb-2">
                  Category
                </label>
                <div className="relative">
                  <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-gray z-10" size={20} />
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal appearance-none bg-white ${
                      errors.category ? 'border-red-500' : 'border-brand-gray'
                    }`}
                  >
                    <option value="">Select a category</option>
                    {getFilteredCategories().map((category) => (
                      <option key={category.name} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-gray-dark mb-2">
                  Date
                </label>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-gray" size={20} />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal ${
                      errors.date ? 'border-red-500' : 'border-brand-gray'
                    }`}
                  />
                </div>
                {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-brand-gray">
            <h2 className="text-lg font-semibold text-brand-gray-dark mb-4">Tags (Optional)</h2>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-4 py-2 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                  placeholder="Add a tag"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal/90 transition-colors"
                >
                  <FiPlus size={20} />
                </button>
              </div>
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-teal/10 text-brand-teal rounded-full text-sm"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-500 transition-colors"
                      >
                        <FiX size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-brand-gray">
            <h2 className="text-lg font-semibold text-brand-gray-dark mb-4">Notes (Optional)</h2>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal resize-none"
              placeholder="Add any additional notes about this transaction..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={saving}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-medium transition-all ${
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
                  <span>Save Transaction</span>
                </>
              )}
            </button>

            <Link
              href="/dashboard"
              className="px-6 py-3 border border-brand-gray text-brand-gray-dark rounded-lg hover:bg-brand-gray-light transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}