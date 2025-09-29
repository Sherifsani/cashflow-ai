"use client"

import React, { useState, useEffect, useRef } from 'react'
import { 
  FiMessageCircle,
  FiSend,
  FiArrowLeft,
  FiTrendingUp,
  FiUser,
  FiCpu,
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiRefreshCw,
  FiMic,
  FiPaperclip
} from 'react-icons/fi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AIChatbot() {
  const [user, setUser] = useState(null)
  const [businessData, setBusinessData] = useState(null)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your CashFlow AI Assistant. I can help you with business forecasting, expense analysis, and financial planning. What would you like to know?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
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
      }
    }
  }, [router])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Sample business questions
  const sampleQuestions = [
    "If I hire a barista at ₦50k/month, can I stay profitable?",
    "What's my cash flow forecast for next month?",
    "How can I reduce my monthly expenses?",
    "When should I consider expanding my business?",
    "What's my optimal inventory purchase amount?"
  ]

  // Mock AI responses based on Ada's scenario
  const getAIResponse = (question) => {
    const lowerQuestion = question.toLowerCase()
    
    if (lowerQuestion.includes('hire') && lowerQuestion.includes('barista')) {
      return {
        type: 'bot',
        content: `Based on your current data:

**Current Monthly Profit:** ₦130,000 (₦450k income - ₦320k expenses)

**Impact of hiring at ₦50k/month:**
• New profit: ₦80,000 (₦130k - ₦50k)
• Profit reduction: 38%

**Recommendation:** You can afford to hire, but you should:
1. Increase daily sales by 15% to maintain current profit margins
2. Target ₦525k monthly income (₦17.5k daily sales)
3. Monitor performance for 3 months before considering further hires

**Break-even point:** You need ₦50k additional monthly revenue to offset the cost.`,
        insights: [
          { type: 'warning', text: 'Consider increasing sales volume before hiring' },
          { type: 'info', text: 'Track performance for 90 days after hiring' }
        ]
      }
    }
    
    if (lowerQuestion.includes('cash flow') && lowerQuestion.includes('forecast')) {
      return {
        type: 'bot',
        content: `**Next Month Forecast (October 2025):**

**Projected Income:** ₦465,000
• Daily sales trend: +3% growth
• Expected range: ₦440k - ₦490k

**Projected Expenses:** ₦335,000
• Seasonal inventory increase: +5%
• Utilities: +10% (festive season)

**Net Cash Flow:** +₦130,000
**Ending Balance:** ₦380,000

**Key Insights:**
• You're maintaining healthy 28% profit margins
• October typically sees 15% sales increase (Detty December prep)
• Consider bulk inventory purchases for better rates`,
        insights: [
          { type: 'success', text: 'Strong positive cash flow projected' },
          { type: 'info', text: 'October is historically your best month' }
        ]
      }
    }
    
    if (lowerQuestion.includes('reduce') && lowerQuestion.includes('expenses')) {
      return {
        type: 'bot',
        content: `**Expense Reduction Opportunities:**

**Top 3 Areas to Optimize:**

1. **Inventory (45% of expenses - ₦144k/month)**
   • Bulk purchasing could save 12-15%
   • Negotiate with suppliers for volume discounts
   • Potential savings: ₦20k/month

2. **Operations (18% of expenses - ₦58k/month)**
   • Energy-efficient equipment
   • Optimize opening hours based on peak times
   • Potential savings: ₦10k/month

3. **Equipment (8% of expenses - ₦26k/month)**
   • Lease vs buy analysis
   • Maintenance contracts vs per-incident
   • Potential savings: ₦5k/month

**Total potential monthly savings:** ₦35,000 (11% reduction)`,
        insights: [
          { type: 'success', text: '₦35k monthly savings possible without affecting quality' },
          { type: 'warning', text: 'Focus on inventory optimization first' }
        ]
      }
    }
    
    if (lowerQuestion.includes('expand') || lowerQuestion.includes('expansion')) {
      return {
        type: 'bot',
        content: `**Business Expansion Analysis:**

**Current Financial Health:** Excellent ✅
• 6+ months cash runway
• 28% profit margins
• Consistent growth trend

**Expansion Readiness Checklist:**
✅ Stable cash flow (₦130k monthly surplus)
✅ Growing customer base
✅ Proven business model
⚠️ Operational systems need scaling

**Recommended Timeline:**
• **Month 1-2:** Optimize current operations
• **Month 3-4:** Secure additional funding/location
• **Month 5-6:** Launch expansion

**Financing Options:**
1. Self-funded: ₦500k available by December
2. Bank loan: Pre-qualified for ₦2M at 18% APR
3. Investor partnership: Maintain 60% ownership`,
        insights: [
          { type: 'success', text: 'Financially ready for expansion' },
          { type: 'info', text: 'Consider second location in high-traffic area' }
        ]
      }
    }
    
    if (lowerQuestion.includes('inventory') && lowerQuestion.includes('optimal')) {
      return {
        type: 'bot',
        content: `**Optimal Inventory Analysis:**

**Current Inventory Spend:** ₦144,000/month (45% of expenses)

**Recommended Optimization:**
• **Coffee Beans:** ₦80k (bulk monthly purchase)
• **Milk & Dairy:** ₦35k (weekly deliveries)
• **Pastries & Snacks:** ₦20k (bi-weekly)
• **Supplies:** ₦9k (monthly)

**Bulk Purchase Benefits:**
• 12-15% supplier discounts
• Reduced delivery fees
• Better cash flow planning

**Inventory Turnover Target:** 8-10 times/month
**Safety Stock:** 1 week supply

**ROI:** ₦20k monthly savings = 14% cost reduction`,
        insights: [
          { type: 'success', text: 'Bulk purchasing can save ₦240k annually' },
          { type: 'warning', text: 'Monitor perishables closely to avoid waste' }
        ]
      }
    }
    
    // Default response for other questions
    return {
      type: 'bot',
      content: `I understand you're asking about "${question}". Based on your current business data:

**Your Business Profile:**
• Monthly Revenue: ₦450,000
• Monthly Expenses: ₦320,000  
• Net Profit: ₦130,000
• Profit Margin: 28%
• Business Type: Coffee Shop

I can help you with specific analysis on:
📊 Financial forecasting
💰 Cash flow planning  
📈 Growth strategies
💡 Cost optimization
🎯 Investment decisions

Could you ask a more specific question about any of these areas?`,
      insights: [
        { type: 'info', text: 'Try asking about hiring, expansion, or cost reduction' }
      ]
    }
  }

  // Send message
  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(inputMessage)
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: aiResponse.content,
        insights: aiResponse.insights,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Quick question handler
  const handleQuickQuestion = (question) => {
    setInputMessage(question)
    inputRef.current?.focus()
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
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg mr-3">
                <FiMessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Business Assistant</h1>
                <p className="text-sm text-gray-500">Ask me anything about your business finances</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[600px]">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex max-w-3xl space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'user' 
                          ? 'bg-blue-500' 
                          : 'bg-purple-100'
                      }`}>
                        {message.type === 'user' ? (
                          <FiUser className="h-4 w-4 text-white" />
                        ) : (
                          <FiCpu className="h-4 w-4 text-purple-600" />
                        )}
                      </div>

                      {/* Message Content */}
                      <div className={`rounded-lg px-4 py-3 max-w-full ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.content}
                        </div>
                        
                        {/* AI Insights */}
                        {message.insights && (
                          <div className="mt-3 space-y-2">
                            {message.insights.map((insight, index) => (
                              <div key={index} className={`flex items-start space-x-2 p-2 rounded text-xs ${
                                insight.type === 'success' ? 'bg-green-100 text-green-800' :
                                insight.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {insight.type === 'success' ? <FiCheckCircle className="h-3 w-3 mt-0.5" /> :
                                 insight.type === 'warning' ? <FiAlertCircle className="h-3 w-3 mt-0.5" /> :
                                 <FiInfo className="h-3 w-3 mt-0.5" />}
                                <span>{insight.text}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="text-xs mt-2 opacity-60">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex space-x-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <FiCpu className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="bg-gray-100 rounded-lg px-4 py-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-end space-x-4">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <FiPaperclip className="h-5 w-5" />
                  </button>
                  <div className="flex-1 relative">
                    <textarea
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about your business finances..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={1}
                      style={{ minHeight: '44px', maxHeight: '120px' }}
                    />
                  </div>
                  <button 
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                  >
                    <FiSend className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Questions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">💡 Quick Questions</h3>
              <div className="space-y-3">
                {sampleQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left p-3 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                  >
                    "{question}"
                  </button>
                ))}
              </div>
            </div>

            {/* Business Context */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Your Business Context</h3>
              <div className="space-y-3 text-sm">
                {businessData?.businessName && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Business Name:</span>
                    <span className="font-medium">{businessData.businessName}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Revenue:</span>
                  <span className="font-medium">₦{businessData?.monthlyRevenue ? parseFloat(businessData.monthlyRevenue).toLocaleString() : '450,000'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Expenses:</span>
                  <span className="font-medium">₦{businessData?.monthlyExpenses ? parseFloat(businessData.monthlyExpenses).toLocaleString() : '320,000'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Net Profit:</span>
                  <span className="font-medium text-green-600">
                    ₦{businessData?.monthlyRevenue && businessData?.monthlyExpenses 
                      ? (parseFloat(businessData.monthlyRevenue) - parseFloat(businessData.monthlyExpenses)).toLocaleString()
                      : '130,000'
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Profit Margin:</span>
                  <span className="font-medium">
                    {businessData?.monthlyRevenue && businessData?.monthlyExpenses 
                      ? ((parseFloat(businessData.monthlyRevenue) - parseFloat(businessData.monthlyExpenses)) / parseFloat(businessData.monthlyRevenue) * 100).toFixed(1)
                      : '28'
                    }%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Business Type:</span>
                  <span className="font-medium capitalize">{businessData?.businessType || 'Coffee Shop'}</span>
                </div>
                {businessData?.startingBalance && (
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-gray-600">Starting Balance:</span>
                    <span className="font-medium">₦{parseFloat(businessData.startingBalance).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">💬 Chat Tips</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Ask specific financial questions</p>
                <p>• Request forecasts and projections</p>
                <p>• Get advice on hiring decisions</p>
                <p>• Analyze expansion opportunities</p>
                <p>• Optimize costs and expenses</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}