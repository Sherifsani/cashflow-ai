"use client"

import React, { useState, useEffect, useRef } from 'react'
import { 
  FiUpload, 
  FiFile,
  FiCheck,
  FiX,
  FiAlertTriangle,
  FiTrendingUp,
  FiArrowLeft,
  FiRefreshCw,
  FiDownload,
  FiPieChart,
  FiBarChart,
  FiActivity
} from 'react-icons/fi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Types
interface User {
  email: string;
}

interface UploadedFile {
  id: number;
  file: File;
  name: string;
  size: number;
  type: string;
  status: 'ready' | 'processing' | 'completed' | 'error';
  progress: number;
}

interface AnalysisResults {
  totalTransactions: number;
  totalIncome: number;
  totalExpenses: number;
  netCashFlow: number;
  categories: {
    name: string;
    amount: number;
    count: number;
  }[];
  insights: string[];
}

export default function BankStatementUpload() {
  const [user, setUser] = useState<User | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState<boolean>(false)
  const [processing, setProcessing] = useState<boolean>(false)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Check authentication
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      const email = localStorage.getItem('userEmail')
      
      if (!token || !email) {
        router.push('/auth/login')
        return
      }
      
      setUser({ email })
    }
  }, [router])

  // Handle drag events
  const handleDrag = (e: React.DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  // Handle drop
  const handleDrop = (e: React.DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  // Handle file selection
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  // Process uploaded files
  const handleFiles = (files: FileList): void => {
    const newFiles: UploadedFile[] = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'ready',
      progress: 0
    }))

    setUploadedFiles(prev => [...prev, ...newFiles])
  }

  // Process files with AI
  const processFiles = async (): Promise<void> => {
    setProcessing(true)
    
    // Update files to processing status
    setUploadedFiles(prev => 
      prev.map(file => ({ ...file, status: 'processing', progress: 50 }))
    )

    // Simulate AWS Textract processing
    setTimeout(() => {
      // Update files to completed status
      setUploadedFiles(prev => 
        prev.map(file => ({ ...file, status: 'completed', progress: 100 }))
      )

      // Generate mock analysis results
      const mockResults: AnalysisResults = {
        totalTransactions: 156,
        totalIncome: 2850000,
        totalExpenses: 1950000,
        netCashFlow: 900000,
        categories: [
          { name: 'Sales Revenue', amount: 1800000, count: 45 },
          { name: 'Service Income', amount: 650000, count: 23 },
          { name: 'Investment Return', amount: 400000, count: 8 },
          { name: 'Office Rent', amount: -720000, count: 12 },
          { name: 'Staff Salaries', amount: -480000, count: 24 },
          { name: 'Marketing', amount: -350000, count: 18 },
          { name: 'Equipment', amount: -200000, count: 8 },
          { name: 'Utilities', amount: -120000, count: 12 },
          { name: 'Supplies', amount: -80000, count: 15 }
        ],
        insights: [
          'Your income grew by 15% compared to the previous period',
          'Marketing expenses increased by 25% - consider reviewing ROI',
          'You have consistent monthly income from sales revenue',
          'Office rent takes up 37% of your total expenses',
          'Your profit margin is healthy at 31.6%',
          'Consider setting aside 20% of income for taxes and savings'
        ]
      }

      setAnalysisResults(mockResults)
      setProcessing(false)
    }, 3000)
  }

  // Remove file
  const removeFile = (id: number): void => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id))
  }

  // Clear all files
  const clearAllFiles = (): void => {
    setUploadedFiles([])
    setAnalysisResults(null)
  }

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(amount))
  }

  // Download sample template
  const downloadTemplate = (): void => {
    const csvContent = `Date,Description,Amount,Type,Category
2024-01-01,Opening Balance,1000000,Income,Initial Balance
2024-01-02,Sales Revenue,250000,Income,Sales
2024-01-03,Office Rent,-120000,Expense,Rent
2024-01-04,Marketing Expense,-35000,Expense,Marketing
2024-01-05,Client Payment,180000,Income,Sales
2024-01-06,Utility Bill,-25000,Expense,Utilities`

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cashflow-template.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-brand-gray-light flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <FiRefreshCw className="animate-spin text-brand-teal" size={24} />
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
              <h1 className="text-xl font-semibold text-brand-gray-dark">Upload Bank Statements</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-3">
            <FiActivity className="text-blue-600 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">How it works</h3>
              <div className="text-sm text-blue-700 space-y-1">
                <p>1. Upload your bank statements (PDF, CSV, or Excel files)</p>
                <p>2. Our AI will automatically extract and categorize transactions</p>
                <p>3. Review the analysis and insights generated</p>
                <p>4. Data is securely processed and integrated into your dashboard</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={downloadTemplate}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <FiDownload size={16} />
                  <span className="text-sm font-medium">Download CSV Template</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-lg shadow-sm border border-brand-gray mb-8">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-brand-gray-dark mb-4">Upload Files</h2>
            
            {/* Drop Zone */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-brand-teal bg-brand-teal/5' 
                  : 'border-brand-gray hover:border-brand-teal hover:bg-brand-gray-light'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <FiUpload className="mx-auto text-brand-gray mb-4" size={48} />
              <h3 className="text-lg font-medium text-brand-gray-dark mb-2">
                Drop your files here or click to browse
              </h3>
              <p className="text-brand-gray mb-4">
                Supported formats: PDF, CSV, Excel (.xlsx, .xls)
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-brand-teal text-white px-6 py-3 rounded-lg hover:bg-brand-teal/90 transition-colors"
              >
                Choose Files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.csv,.xlsx,.xls"
                onChange={handleChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-brand-gray mb-8">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-brand-gray-dark">
                  Uploaded Files ({uploadedFiles.length})
                </h3>
                <div className="space-x-2">
                  {!processing && uploadedFiles.some(f => f.status === 'ready') && (
                    <button
                      onClick={processFiles}
                      className="bg-brand-teal text-white px-4 py-2 rounded-lg hover:bg-brand-teal/90 transition-colors"
                    >
                      Process Files
                    </button>
                  )}
                  <button
                    onClick={clearAllFiles}
                    disabled={processing}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="flex items-center space-x-4 p-4 border border-brand-gray rounded-lg">
                    <div className="flex-shrink-0">
                      <FiFile className="text-brand-gray" size={24} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-brand-gray-dark truncate">
                        {file.name}
                      </p>
                      <p className="text-sm text-brand-gray">
                        {formatFileSize(file.size)}
                      </p>
                      
                      {/* Progress Bar */}
                      {file.status === 'processing' && (
                        <div className="mt-2">
                          <div className="w-full bg-brand-gray-light rounded-full h-2">
                            <div 
                              className="bg-brand-teal h-2 rounded-full transition-all duration-300"
                              style={{ width: `${file.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex-shrink-0 flex items-center space-x-2">
                      {/* Status Icon */}
                      {file.status === 'ready' && (
                        <div className="text-brand-gray">
                          <span className="text-sm">Ready</span>
                        </div>
                      )}
                      {file.status === 'processing' && (
                        <div className="flex items-center space-x-2 text-brand-teal">
                          <FiRefreshCw className="animate-spin" size={16} />
                          <span className="text-sm">Processing...</span>
                        </div>
                      )}
                      {file.status === 'completed' && (
                        <div className="flex items-center space-x-2 text-green-600">
                          <FiCheck size={16} />
                          <span className="text-sm">Complete</span>
                        </div>
                      )}
                      {file.status === 'error' && (
                        <div className="flex items-center space-x-2 text-red-600">
                          <FiAlertTriangle size={16} />
                          <span className="text-sm">Error</span>
                        </div>
                      )}

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFile(file.id)}
                        disabled={processing}
                        className="text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
                      >
                        <FiX size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analysisResults && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-brand-gray">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-brand-gray">Total Transactions</p>
                    <p className="text-2xl font-bold text-brand-gray-dark">
                      {analysisResults.totalTransactions}
                    </p>
                  </div>
                  <FiActivity className="text-brand-teal" size={24} />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-brand-gray">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-brand-gray">Total Income</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(analysisResults.totalIncome)}
                    </p>
                  </div>
                  <FiTrendingUp className="text-green-600" size={24} />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-brand-gray">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-brand-gray">Total Expenses</p>
                    <p className="text-2xl font-bold text-red-600">
                      {formatCurrency(analysisResults.totalExpenses)}
                    </p>
                  </div>
                  <FiTrendingUp className="text-red-600 rotate-180" size={24} />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-brand-gray">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-brand-gray">Net Cash Flow</p>
                    <p className={`text-2xl font-bold ${
                      analysisResults.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatCurrency(analysisResults.netCashFlow)}
                    </p>
                  </div>
                  <FiBarChart className="text-brand-teal" size={24} />
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white rounded-lg shadow-sm border border-brand-gray">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-brand-gray-dark mb-4">
                  Category Breakdown
                </h3>
                
                <div className="space-y-4">
                  {analysisResults.categories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          category.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          <FiPieChart className={
                            category.amount > 0 ? 'text-green-600' : 'text-red-600'
                          } size={16} />
                        </div>
                        <div>
                          <p className="font-medium text-brand-gray-dark">{category.name}</p>
                          <p className="text-sm text-brand-gray">{category.count} transactions</p>
                        </div>
                      </div>
                      <span className={`font-semibold ${
                        category.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {category.amount > 0 ? '+' : ''}{formatCurrency(category.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-white rounded-lg shadow-sm border border-brand-gray">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-brand-gray-dark mb-4">
                  AI-Generated Insights
                </h3>
                
                <div className="space-y-3">
                  {analysisResults.insights.map((insight, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-brand-gray-light rounded-lg">
                      <FiActivity className="text-brand-teal mt-0.5" size={16} />
                      <p className="text-brand-gray-dark text-sm">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Link
                href="/dashboard"
                className="flex-1 bg-brand-teal text-white py-3 px-6 rounded-lg text-center font-medium hover:bg-brand-teal/90 transition-colors"
              >
                View in Dashboard
              </Link>
              <button
                onClick={() => setAnalysisResults(null)}
                className="px-6 py-3 border border-brand-gray text-brand-gray-dark rounded-lg hover:bg-brand-gray-light transition-colors"
              >
                Upload More Files
              </button>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-8">
          <div className="flex items-center space-x-2">
            <FiCheck className="text-green-600" size={16} />
            <p className="text-sm text-green-800">
              <strong>Secure Processing:</strong> Your financial data is encrypted and processed securely. 
              Files are automatically deleted after processing.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}