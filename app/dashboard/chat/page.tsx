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
import { sendChatMessage } from '../../../lib/api'

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
    const token = localStorage.getItem('idToken') || localStorage.getItem('accessToken')
    
    if (token) {
      // Set a basic user object since we have a valid token
      setUser({ email: 'authenticated-user' })
    } else {
      router.push('/auth/login')
      return
    }

    setLoading(false)
  }

  const getUserId = (): string => {
    return localStorage.getItem('userEmail') || 'anonymous';
  };

  const getChatHistoryKey = (): string => {
    return `chatHistory_${getUserId()}`;
  };

  const loadChatHistory = (): void => {
    const savedMessages = localStorage.getItem(getChatHistoryKey())
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
        content: "👋 Hello! I'm your AI Financial Assistant powered by advanced AI. I can analyze your actual financial data to provide personalized insights about your cash flow, spending patterns, and growth opportunities. What would you like to know?",
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
    }
  }

  const saveChatHistory = (newMessages: Message[]): void => {
    localStorage.setItem(getChatHistoryKey(), JSON.stringify(newMessages))
  }

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const simulateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      console.log('Sending message to API:', userMessage);
      const response = await sendChatMessage(userMessage);
      console.log('API response:', response);
      return response.message || response.data?.message || 'I received your message but had trouble generating a response.';
    } catch (error) {
      console.error('Chat API error:', error);
      throw new Error('Failed to get AI response. Please try again.');
    }
  };

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
        content: "I'm sorry, I'm having trouble connecting to my AI brain right now. Please try again in a moment, or check your internet connection.",
        sender: 'ai',
        timestamp: new Date()
      }
      
      const finalMessages = [...updatedMessages, errorMessage]
      setMessages(finalMessages)
      setIsConnected(false)
      
      // Try to reconnect after a delay
      setTimeout(() => setIsConnected(true), 5000)
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
    localStorage.removeItem(getChatHistoryKey())
    loadChatHistory()
  }

  const copyMessage = (content: string): void => {
    navigator.clipboard.writeText(content)
    // Could add a toast notification here
  }

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    if (!content) return <div></div>;
    
    const formatted = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />')

    return <div dangerouslySetInnerHTML={{ __html: formatted }} />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <FiRefreshCw className="animate-spin text-white w-6 h-6" />
          </div>
          <span className="text-gray-600 text-sm">Loading chat...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-3">
              <Link 
                href="/dashboard" 
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FiArrowLeft size={18} />
                <span className="text-sm font-medium">Dashboard</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Online</span>
              </div>
              
              <button
                onClick={clearChat}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-50"
                title="Clear chat"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6">
          {messages.filter(msg => !msg.typing).length === 0 ? (
            /* Welcome Screen */
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <FiZap className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-3">
                AI Financial Assistant
              </h1>
              <p className="text-gray-600 mb-8 max-w-md">
                Get personalized insights about your cash flow, expenses, and growth opportunities powered by AI that analyzes your actual financial data.
              </p>
              
              {/* Suggested Questions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                {suggestedQuestions.slice(0, 4).map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(item.question)}
                    className="flex items-center p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group border border-gray-100"
                  >
                    <div className="text-gray-400 group-hover:text-gray-600 mr-3">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{item.question}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Messages */
            <div className="py-8 space-y-6">
              {messages.filter(msg => !msg.typing).map((message) => (
                <div key={message.id} className="group">
                  <div className={`flex items-start space-x-4 ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gradient-to-br from-purple-500 to-blue-600 text-white'
                    }`}>
                      {message.sender === 'user' ? 'You' : 'AI'}
                    </div>

                    {/* Message */}
                    <div className={`flex-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
                      <div className={`inline-block max-w-3xl ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-2xl rounded-tr-md px-4 py-3'
                          : 'text-gray-900'
                      }`}>
                        <div className="text-sm leading-relaxed">
                          {formatMessage(message.content)}
                        </div>
                      </div>
                      
                      <div className={`flex items-center mt-2 space-x-2 ${
                        message.sender === 'user' ? 'justify-end' : ''
                      }`}>
                        <span className="text-xs text-gray-400">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                        
                        {message.sender === 'ai' && (
                          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => copyMessage(message.content)}
                              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                              title="Copy"
                            >
                              <FiCopy size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-white flex items-center justify-center text-sm font-medium">
                    AI
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-100 bg-white px-4 sm:px-6 py-4">
          <div className="relative max-w-3xl mx-auto">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your finances..."
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm placeholder-gray-500 bg-gray-50 focus:bg-white transition-colors"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-xl transition-all ${
                    inputMessage.trim() && !isTyping
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <FiSend size={16} />
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">
              Press Enter to send • Powered by AI analyzing your financial data
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}