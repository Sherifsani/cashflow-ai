"use client"

import React, { useState, useEffect } from 'react'
import { 
  FiTrendingUp, 
  FiPlus, 
  FiMinus,
  FiUpload,
  FiCalendar,
  FiDollarSign,
  FiTag,
  FiSave,
  FiX,
  FiCheck,
  FiAlertCircle,
  FiArrowLeft,
  FiFileText
} from 'react-icons/fi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AddTransaction() {
  const [transactionType, setTransactionType] = useState('income')
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const router = useRouter()

  // Check authentication
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/auth/login')
      }
    }
  }, [router])

  const incomeCategories = [
    'Sales Revenue', 'Service Income', 'Product Sales', 'Consulting', 
    'Investment Returns', 'Rental Income', 'Grants', 'Other Income'
  ]

  const expenseCategories = [
    'Rent/Mortgage', 'Utilities', 'Salaries', 'Office Supplies', 'Marketing',
    'Equipment', 'Travel', 'Professional Services', 'Insurance', 'Taxes',
    'Inventory', 'Maintenance', 'Other Expenses'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      
      // Reset form after success
      setTimeout(() => {
        setShowSuccess(false)
        setFormData({
          amount: '',
          description: '',
          category: '',
          date: new Date().toISOString().split('T')[0],
          notes: ''
        })
      }, 2000)
    }, 1000)
  }

  const getCurrentCategories = () => {
    return transactionType === 'income' ? incomeCategories : expenseCategories
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <h1 className="text-xl font-bold text-gray-900">Add Transaction</h1>
                <p className="text-sm text-gray-500">Record your income or expense</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <FiCheck className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-green-800">Transaction Added Successfully!</h3>
                <p className="text-sm text-green-700 mt-1">Your {transactionType} of ₦{parseFloat(formData.amount).toLocaleString()} has been recorded.</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {/* Transaction Type Toggle */}
              <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
                <button
                  type="button"
                  onClick={() => setTransactionType('income')}
                  className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    transactionType === 'income'
                      ? 'bg-green-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FiPlus className="h-4 w-4 mr-2" />
                  Income
                </button>
                <button
                  type="button"
                  onClick={() => setTransactionType('expense')}
                  className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    transactionType === 'expense'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FiMinus className="h-4 w-4 mr-2" />
                  Expense
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount *
                  </label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder={`What was this ${transactionType} for?`}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <div className="relative">
                    <FiTag className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                      required
                    >
                      <option value="">Select a category</option>
                      {getCurrentCategories().map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <div className="relative">
                    <FiCalendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <div className="relative">
                    <FiFileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Any additional details or context..."
                      rows="4"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 flex items-center justify-center py-3 px-6 rounded-lg text-sm font-medium transition-colors ${
                      transactionType === 'income'
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    } ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
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
                        Add {transactionType === 'income' ? 'Income' : 'Expense'}
                      </>
                    )}
                  </button>
                  
                  <Link
                    href="/dashboard"
                    className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Tips */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">💡 Quick Tips</h3>
              <div className="space-y-3 text-sm text-blue-800">
                <div className="flex items-start">
                  <FiCheck className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Be specific with descriptions to track patterns better</span>
                </div>
                <div className="flex items-start">
                  <FiCheck className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Choose the right category for accurate reporting</span>
                </div>
                <div className="flex items-start">
                  <FiCheck className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Add notes for complex transactions</span>
                </div>
                <div className="flex items-start">
                  <FiCheck className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Regular data entry gives better AI predictions</span>
                </div>
              </div>
            </div>

            {/* Bulk Import Option */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Need to add multiple transactions?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Save time by uploading your bank statements or Excel files instead of entering data manually.
              </p>
              <button className="w-full flex items-center justify-center py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                <FiUpload className="h-4 w-4 mr-2" />
                Upload Bank Statement
              </button>
            </div>

            {/* Recent Categories */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 Recently Used Categories</h3>
              <div className="space-y-2">
                {['Sales Revenue', 'Office Supplies', 'Marketing', 'Rent/Mortgage'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setFormData(prev => ({ ...prev, category }))}
                    className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}