"use client"

import React, { useState, useEffect, useRef } from 'react'
import { 
  FiArrowLeft, 
  FiSend, 
  FiMessageCircle, 
  FiUser, 
  FiCpu,
  FiRefreshCw,
  FiTrash2,
  FiCopy,
  FiThumbsUp,
  FiThumbsDown,
  FiZap,
  FiTrendingUp,
  FiDollarSign,
  FiPieChart,
  FiBarChart
} from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Types
interface User {
  email: string;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  typing?: boolean;
}

interface SuggestedQuestion {
  question: string;
  icon: React.ReactNode;
  category: string;
}

export default function AIChat() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState<string>('')
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [isConnected, setIsConnected] = useState<boolean>(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const suggestedQuestions: SuggestedQuestion[] = [
    {
      question: "What's my current cash flow status?",
      icon: <FiTrendingUp />,
      category: "Cash Flow"
    },
    {
      question: "How can I improve my business profitability?",
      icon: <FiDollarSign />,
      category: "Profitability"
    },
    {
      question: "Show me my expense breakdown",
      icon: <FiPieChart />,
      category: "Expenses"
    },
    {
      question: "What are some cost-cutting strategies?",
      icon: <FiBarChart />,
      category: "Optimization"
    },
    {
      question: "Help me create a financial forecast",
      icon: <FiZap />,
      category: "Planning"
    },
    {
      question: "Analyze my payment patterns",
      icon: <FiTrendingUp />,
      category: "Analysis"
    }
  ]

  useEffect(() => {
    checkAuth()
    loadChatHistory()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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

  const loadChatHistory = (): void => {
    const savedMessages = localStorage.getItem('chatHistory')
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages)
      setMessages(parsedMessages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })))
    } else {
      // Add welcome message
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: "👋 Hello! I'm your AI Financial Assistant. I'm here to help you understand your cash flow, identify opportunities, and provide personalized financial insights for your business. What would you like to know?",
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
    }
  }

  const saveChatHistory = (newMessages: Message[]): void => {
    localStorage.setItem('chatHistory', JSON.stringify(newMessages))
  }

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const simulateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

    // Mock AI responses based on keywords
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes('cash flow') || lowerMessage.includes('status')) {
      return `Based on your current data, your cash flow looks healthy! 📊

**Current Overview:**
• Monthly Income: ₦450,000
• Monthly Expenses: ₦320,000
• Net Cash Flow: +₦130,000
• Cash Runway: 22 months

**Key Insights:**
✅ Your income exceeds expenses by 40%
⚠️ Marketing expenses increased 15% this month
💡 Consider setting aside ₦50,000 monthly for emergency fund

Would you like me to dive deeper into any specific area?`
    }

    if (lowerMessage.includes('profitability') || lowerMessage.includes('profit')) {
      return `Great question! Here are some strategies to boost your profitability: 💰

**Revenue Growth:**
• Focus on your top 20% customers (80/20 rule)
• Increase prices by 5-10% for new customers
• Develop recurring revenue streams

**Cost Optimization:**
• Review your marketing ROI - cut underperforming channels
• Negotiate better rates with suppliers
• Automate repetitive tasks to reduce labor costs

**Cash Flow Management:**
• Offer early payment discounts (2% for 10 days)
• Implement stricter payment terms
• Use invoice factoring for immediate cash

Which area would you like to explore first?`
    }

    if (lowerMessage.includes('expense') || lowerMessage.includes('spending')) {
      return `Here's your expense breakdown analysis: 📋

**Top Expense Categories (This Month):**
1. 🏢 Office Rent: ₦120,000 (37.5%)
2. 👥 Staff Salaries: ₦85,000 (26.6%)
3. 📢 Marketing: ₦45,000 (14.1%) ↑15%
4. 🔧 Equipment: ₦30,000 (9.4%)
5. 💻 Software: ₦25,000 (7.8%)
6. ⚡ Utilities: ₦15,000 (4.7%)

**Recommendations:**
• Marketing costs are rising - review campaign performance
• Consider co-working space to reduce rent
• Bundle software subscriptions for discounts

Need help with any specific expense category?`
    }

    if (lowerMessage.includes('forecast') || lowerMessage.includes('prediction')) {
      return `Let me create a 3-month financial forecast for you: 🔮

**Projected Cash Flow (Next 3 Months):**

**Month 1:**
• Income: ₦465,000 (+3% growth)
• Expenses: ₦335,000
• Net: +₦130,000

**Month 2:**
• Income: ₦480,000 (+6% growth)
• Expenses: ₦345,000
• Net: +₦135,000

**Month 3:**
• Income: ₦495,000 (+10% growth)
• Expenses: ₦350,000
• Net: +₦145,000

**Key Assumptions:**
• Steady customer growth
• Seasonal marketing increase
• No major expense changes

Would you like me to adjust any assumptions or explore different scenarios?`
    }

    // Default responses
    const defaultResponses = [
      `That's an interesting question! Based on your business data, I can provide some insights. Let me analyze your current financial position and get back to you with specific recommendations.

Could you provide more details about what specific aspect you'd like me to focus on?`,

      `I'd be happy to help you with that! 🎯

From what I can see in your financial data, there are several factors to consider. Let me break this down for you:

**Quick Analysis:**
• Your business is performing well overall
• There are opportunities for optimization
• Cash flow trends are positive

What specific metrics or time period would you like me to focus on?`,

      `Great question! Let me provide you with some personalized insights based on your business profile.

**Your Business Overview:**
• Type: ${localStorage.getItem('businessData') ? JSON.parse(localStorage.getItem('businessData')!).businessType || 'General Business' : 'General Business'}
• Monthly Revenue: ₦450,000
• Growth Trend: Positive

Is there a particular area of your finances you'd like to dive deeper into?`
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSendMessage = async (): Promise<void> => {
    if (!inputMessage.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInputMessage('')
    setIsTyping(true)

    // Add typing indicator
    const typingMessage: Message = {
      id: 'typing',
      content: 'AI is typing...',
      sender: 'ai',
      timestamp: new Date(),
      typing: true
    }
    setMessages(prev => [...prev, typingMessage])

    try {
      const aiResponse = await simulateAIResponse(userMessage.content)
      
      // Remove typing indicator and add actual response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      }

      const finalMessages = [...updatedMessages, aiMessage]
      setMessages(finalMessages)
      saveChatHistory(finalMessages)

    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'ai',
        timestamp: new Date()
      }
      
      const finalMessages = [...updatedMessages, errorMessage]
      setMessages(finalMessages)
      setIsConnected(false)
    } finally {
      setIsTyping(false)
    }
  }

  const handleSuggestedQuestion = (question: string): void => {
    setInputMessage(question)
    inputRef.current?.focus()
  }

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const clearChat = (): void => {
    setMessages([])
    localStorage.removeItem('chatHistory')
    loadChatHistory()
  }

  const copyMessage = (content: string): void => {
    navigator.clipboard.writeText(content)
    // Could add a toast notification here
  }

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    const formatted = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />')

    return <div dangerouslySetInnerHTML={{ __html: formatted }} />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-gray-light flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <FiRefreshCw className="animate-spin text-brand-teal" size={24} />
          <span className="text-brand-gray-dark">Loading chat...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-gray-light flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-brand-gray flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard" 
                className="flex items-center space-x-3 text-brand-gray hover:text-brand-teal transition-colors"
              >
                <FiArrowLeft size={20} />
                <span>Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-brand-gray"></div>
              <div className="flex items-center space-x-2">
                <FiMessageCircle className="text-brand-teal" size={20} />
                <h1 className="text-xl font-semibold text-brand-gray-dark">AI Financial Assistant</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                isConnected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  isConnected ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span>{isConnected ? 'Connected' : 'Offline'}</span>
              </div>
              
              <button
                onClick={clearChat}
                className="p-2 text-brand-gray hover:text-brand-teal transition-colors"
                title="Clear chat history"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-6">
            {messages.filter(msg => !msg.typing).map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-4 ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  message.sender === 'user' 
                    ? 'bg-brand-teal text-white' 
                    : 'bg-brand-gray-light text-brand-gray-dark border border-brand-gray'
                }`}>
                  {message.sender === 'user' ? <FiUser size={20} /> : <FiCpu size={20} />}
                </div>

                {/* Message Bubble */}
                <div className={`flex-1 max-w-3xl ${
                  message.sender === 'user' ? 'text-right' : ''
                }`}>
                  <div className={`inline-block p-4 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-brand-teal text-white'
                      : 'bg-white border border-brand-gray text-brand-gray-dark'
                  }`}>
                    <div className="text-sm md:text-base">
                      {formatMessage(message.content)}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs text-brand-gray">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                    
                    {message.sender === 'ai' && (
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => copyMessage(message.content)}
                          className="text-brand-gray hover:text-brand-teal transition-colors"
                          title="Copy message"
                        >
                          <FiCopy size={14} />
                        </button>
                        <button className="text-brand-gray hover:text-green-600 transition-colors">
                          <FiThumbsUp size={14} />
                        </button>
                        <button className="text-brand-gray hover:text-red-600 transition-colors">
                          <FiThumbsDown size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-gray-light text-brand-gray-dark border border-brand-gray flex items-center justify-center">
                  <FiCpu size={20} />
                </div>
                <div className="bg-white border border-brand-gray rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-brand-gray rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-brand-gray rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-brand-gray rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-brand-gray">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Suggested Questions */}
        {messages.filter(msg => !msg.typing).length <= 1 && (
          <div className="px-4 sm:px-6 lg:px-8 py-4 bg-white border-t border-brand-gray">
            <h3 className="text-sm font-medium text-brand-gray-dark mb-3">
              Try asking me about:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {suggestedQuestions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(item.question)}
                  className="flex items-center space-x-3 p-3 text-left text-sm bg-brand-gray-light hover:bg-brand-teal/10 hover:text-brand-teal rounded-lg transition-colors group"
                >
                  <div className="text-brand-teal group-hover:text-brand-teal">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.question}</p>
                    <p className="text-xs text-brand-gray group-hover:text-brand-teal/70">
                      {item.category}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="flex-shrink-0 bg-white border-t border-brand-gray px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your finances..."
                className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal resize-none"
                disabled={isTyping}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className={`p-3 rounded-lg transition-all ${
                inputMessage.trim() && !isTyping
                  ? 'bg-brand-teal text-white hover:bg-brand-teal/90'
                  : 'bg-brand-gray text-brand-gray-dark cursor-not-allowed'
              }`}
            >
              <FiSend size={20} />
            </button>
          </div>
          <p className="text-xs text-brand-gray mt-2 text-center">
            Press Enter to send • AI responses are simulated for demonstration
          </p>
        </div>
      </div>
    </div>
  )
}