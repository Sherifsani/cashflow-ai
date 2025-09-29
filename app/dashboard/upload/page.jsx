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

export default function BankStatementUpload() {
  const [user, setUser] = useState(null)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [dragActive, setDragActive] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState(null)
  const fileInputRef = useRef(null)
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
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  // Handle file selection
  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  // Process uploaded files
  const handleFiles = (files) => {
    const newFiles = Array.from(files).map(file => ({
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
  const processFiles = async () => {
    setProcessing(true)
    
    // Update files to processing status
    setUploadedFiles(prev => 
      prev.map(file => ({ ...file, status: 'processing', progress: 50 }))
    )

    // Simulate AWS Textract processing
    setTimeout(() => {
      setUploadedFiles(prev => 
        prev.map(file => ({ ...file, status: 'completed', progress: 100 }))
      )
      
      // Mock analysis results
      setAnalysisResults({
        totalTransactions: 47,
        income: 285000,
        expenses: 198000,
        categories: {
          'Inventory': { amount: 89000, percentage: 45, color: 'bg-blue-500' },
          'Rent': { amount: 48000, percentage: 24, color: 'bg-purple-500' },
          'Operations': { amount: 35000, percentage: 18, color: 'bg-green-500' },
          'Equipment': { amount: 16000, percentage: 8, color: 'bg-yellow-500' },
          'Miscellaneous': { amount: 10000, percentage: 5, color: 'bg-gray-500' }
        },
        insights: [
          'Your inventory costs represent 45% of expenses - consider bulk purchasing for better rates',
          'Equipment expenses were 60% higher than usual this month',
          'Daily sales averaging ₦9,500 - up 12% from previous month'
        ]
      })
      
      setProcessing(false)
    }, 3000)
  }

  // Remove file
  const removeFile = (id) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id))
  }

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

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
                <FiUpload className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Upload Bank Statement</h1>
                <p className="text-sm text-gray-500">Auto-categorize transactions with AI</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Upload Area */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Your Statement</h2>
              <p className="text-gray-600 mb-6">
                Upload PDF or Excel bank statements. Our AI will automatically categorize transactions and provide insights.
              </p>

              {/* Drag & Drop Area */}
              <div 
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-blue-400 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <FiUpload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-900">
                    Drop your files here, or{' '}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-blue-600 hover:text-blue-500"
                    >
                      browse
                    </button>
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports PDF, Excel (.xlsx, .xls), and CSV files up to 10MB
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleChange}
                  accept=".pdf,.xlsx,.xls,.csv"
                  className="hidden"
                />
              </div>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Uploaded Files</h3>
                  {uploadedFiles.some(file => file.status === 'ready') && (
                    <button
                      onClick={processFiles}
                      disabled={processing}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                      {processing ? (
                        <>
                          <FiRefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <FiActivity className="h-4 w-4 mr-2" />
                          Process with AI
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FiFile className="h-8 w-8 text-blue-500" />
                        <div>
                          <p className="font-medium text-gray-900">{file.name}</p>
                          <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {file.status === 'ready' && (
                          <span className="text-sm text-gray-500">Ready to process</span>
                        )}
                        {file.status === 'processing' && (
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all"
                                style={{ width: `${file.progress}%` }}
                              />
                            </div>
                            <span className="text-sm text-blue-600">Processing...</span>
                          </div>
                        )}
                        {file.status === 'completed' && (
                          <div className="flex items-center space-x-2">
                            <FiCheck className="h-5 w-5 text-green-500" />
                            <span className="text-sm text-green-600">Completed</span>
                          </div>
                        )}
                        <button
                          onClick={() => removeFile(file.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <FiX className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analysis Results */}
            {analysisResults && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <FiBarChart className="h-5 w-5 mr-2" />
                  Analysis Results
                </h3>

                {/* Summary Stats */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-600 font-medium">Total Transactions</p>
                        <p className="text-2xl font-bold text-blue-900">{analysisResults.totalTransactions}</p>
                      </div>
                      <FiActivity className="h-8 w-8 text-blue-500" />
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-600 font-medium">Total Income</p>
                        <p className="text-2xl font-bold text-green-900">₦{analysisResults.income.toLocaleString()}</p>
                      </div>
                      <FiTrendingUp className="h-8 w-8 text-green-500" />
                    </div>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-red-600 font-medium">Total Expenses</p>
                        <p className="text-2xl font-bold text-red-900">₦{analysisResults.expenses.toLocaleString()}</p>
                      </div>
                      <FiBarChart className="h-8 w-8 text-red-500" />
                    </div>
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                    <FiPieChart className="h-4 w-4 mr-2" />
                    Expense Categories
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(analysisResults.categories).map(([category, data]) => (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${data.color}`}></div>
                          <span className="font-medium text-gray-700">{category}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-900 font-medium">₦{data.amount.toLocaleString()}</span>
                          <span className="text-sm text-gray-500">{data.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Insights */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">💡 AI Insights</h4>
                  <div className="space-y-3">
                    {analysisResults.insights.map((insight, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <FiAlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <p className="text-sm text-gray-700">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* How It Works */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">How It Works</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <p className="font-medium text-gray-900">Upload Statement</p>
                    <p className="text-sm text-gray-600">Drop your bank statement file</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <p className="font-medium text-gray-900">AI Processing</p>
                    <p className="text-sm text-gray-600">Extract and categorize transactions</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <p className="font-medium text-gray-900">Get Insights</p>
                    <p className="text-sm text-gray-600">Receive personalized recommendations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Supported Banks */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Supported Banks</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>✓ GTBank</p>
                <p>✓ Access Bank</p>
                <p>✓ First Bank</p>
                <p>✓ UBA</p>
                <p>✓ Zenith Bank</p>
                <p>✓ Fidelity Bank</p>
                <p className="text-blue-600 mt-3">+ All major Nigerian banks</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}