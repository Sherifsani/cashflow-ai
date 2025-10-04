# AI Chatbot Integration Guide

Complete guide for integrating the AI financial assistant chatbot into your frontend application.

## Overview

The AI Chatbot is a context-aware financial assistant that analyzes user data and provides personalized advice using AWS Bedrock (Claude 3 Haiku).

## API Endpoint

### Send Chat Message
```http
POST /api/chat/message
Authorization: Bearer <cognito-jwt-token>
Content-Type: application/json

{
  "message": "How is my cash flow looking?"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Based on your current balance of $52,000 and recent income of $5,000 over the last 30 days, your cash flow looks healthy! You're generating positive cash flow with expenses of $3,200. This gives you a net positive of $1,800 monthly. Would you like me to analyze any specific spending categories?",
    "timestamp": "2024-10-04T13:28:55.339Z"
  }
}
```

## Frontend Integration

### 1. Chat Service

```javascript
// services/chatService.js
class ChatService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async sendMessage(message) {
    try {
      const response = await this.apiClient.post('/api/chat/message', {
        message: message.trim()
      });
      return response.data.data;
    } catch (error) {
      console.error('Chat error:', error);
      throw error;
    }
  }
}

export default ChatService;
```

### 2. Chat Hook

```javascript
// hooks/useChat.js
import { useState } from 'react';
import { chatService } from '../services';

export const useChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm your AI financial assistant. I can help you analyze your spending, cash flow, and provide personalized financial advice. What would you like to know?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (content) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    try {
      // Get AI response
      const response = await chatService.sendMessage(content);
      
      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.message,
        timestamp: response.timestamp
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setError(err.message);
      
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: "Sorry, I'm having trouble processing your request right now. Please try again.",
        timestamp: new Date().toISOString(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{
      id: 1,
      type: 'bot',
      content: "Chat cleared! How can I help you with your finances?",
      timestamp: new Date().toISOString()
    }]);
    setError(null);
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearChat
  };
};
```

### 3. Chat Component

```jsx
// components/ChatBot.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../hooks/useChat';

const ChatBot = ({ isOpen, onClose }) => {
  const { messages, loading, sendMessage } = useChat();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const message = inputValue;
    setInputValue('');
    await sendMessage(message);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chatbot-overlay">
      <div className="chatbot-container">
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-title">
            <span className="bot-icon">🤖</span>
            <div>
              <h3>Financial Assistant</h3>
              <p>AI-powered financial advice</p>
            </div>
          </div>
          <button onClick={onClose} className="close-button">×</button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {loading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="chatbot-input-form">
          <div className="input-container">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about your finances..."
              className="chat-input"
              rows="1"
              disabled={loading}
            />
            <button 
              type="submit" 
              disabled={!inputValue.trim() || loading}
              className="send-button"
            >
              <SendIcon />
            </button>
          </div>
          <div className="quick-actions">
            <QuickActionButton 
              text="How's my cash flow?" 
              onClick={() => setInputValue("How's my cash flow?")} 
            />
            <QuickActionButton 
              text="Analyze my spending" 
              onClick={() => setInputValue("Analyze my spending patterns")} 
            />
            <QuickActionButton 
              text="Budget advice" 
              onClick={() => setInputValue("Give me budget advice")} 
            />
          </div>
        </form>
      </div>
    </div>
  );
};

// Individual message component
const ChatMessage = ({ message }) => (
  <div className={`message ${message.type} ${message.isError ? 'error' : ''}`}>
    <div className="message-avatar">
      {message.type === 'bot' ? '🤖' : '👤'}
    </div>
    <div className="message-content">
      <div className="message-text">{message.content}</div>
      <div className="message-time">
        {new Date(message.timestamp).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}
      </div>
    </div>
  </div>
);

// Typing indicator
const TypingIndicator = () => (
  <div className="message bot typing">
    <div className="message-avatar">🤖</div>
    <div className="message-content">
      <div className="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
);

// Quick action buttons
const QuickActionButton = ({ text, onClick }) => (
  <button className="quick-action-btn" onClick={onClick}>
    {text}
  </button>
);

// Send icon component
const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </svg>
);

export default ChatBot;
```

### 4. Chat Toggle Button

```jsx
// components/ChatToggle.jsx
import React, { useState } from 'react';
import ChatBot from './ChatBot';

const ChatToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className="chat-toggle-btn"
        onClick={() => setIsOpen(true)}
        aria-label="Open financial assistant"
      >
        <span className="chat-icon">💬</span>
        <span className="chat-text">Ask AI</span>
      </button>
      
      <ChatBot 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
};

export default ChatToggle;
```

## CSS Styling

```css
/* styles/chatbot.css */

/* Toggle Button */
.chat-toggle-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
}

.chat-toggle-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.5);
}

.chat-icon {
  font-size: 20px;
}

/* Chatbot Overlay */
.chatbot-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 20px;
}

.chatbot-container {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  height: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

/* Header */
.chatbot-header {
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8fafc;
  border-radius: 16px 16px 0 0;
}

.chatbot-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.bot-icon {
  font-size: 24px;
}

.chatbot-title h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.chatbot-title p {
  margin: 0;
  font-size: 12px;
  color: #6b7280;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
}

.close-button:hover {
  background: #e5e7eb;
  color: #374151;
}

/* Messages */
.chatbot-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message {
  display: flex;
  gap: 12px;
  max-width: 85%;
}

.message.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}

.message.bot .message-avatar {
  background: #f3f4f6;
}

.message.user .message-avatar {
  background: #3b82f6;
  color: white;
}

.message-content {
  flex: 1;
}

.message-text {
  background: #f3f4f6;
  padding: 12px 16px;
  border-radius: 18px;
  line-height: 1.5;
  color: #1f2937;
}

.message.user .message-text {
  background: #3b82f6;
  color: white;
}

.message.error .message-text {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.message-time {
  font-size: 11px;
  color: #9ca3af;
  margin-top: 4px;
  text-align: right;
}

.message.user .message-time {
  text-align: left;
}

/* Typing Indicator */
.typing-dots {
  display: flex;
  gap: 4px;
  padding: 12px 16px;
}

.typing-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #9ca3af;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-dots span:nth-child(1) { animation-delay: -0.32s; }
.typing-dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes typing {
  0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}

/* Input Form */
.chatbot-input-form {
  padding: 20px;
  border-top: 1px solid #e5e7eb;
  background: #f8fafc;
  border-radius: 0 0 16px 16px;
}

.input-container {
  display: flex;
  gap: 8px;
  align-items: flex-end;
}

.chat-input {
  flex: 1;
  border: 1px solid #d1d5db;
  border-radius: 20px;
  padding: 12px 16px;
  resize: none;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  max-height: 100px;
  background: white;
}

.chat-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.send-button {
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
}

.send-button:hover:not(:disabled) {
  background: #2563eb;
}

.send-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

/* Quick Actions */
.quick-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.quick-action-btn {
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 16px;
  padding: 6px 12px;
  font-size: 12px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}

.quick-action-btn:hover {
  background: #f3f4f6;
  border-color: #9ca3af;
  color: #374151;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .chatbot-overlay {
    padding: 0;
  }
  
  .chatbot-container {
    width: 100%;
    height: 100%;
    max-height: 100vh;
    border-radius: 0;
  }
  
  .chatbot-header {
    border-radius: 0;
  }
  
  .chatbot-input-form {
    border-radius: 0;
  }
  
  .chat-toggle-btn {
    bottom: 16px;
    right: 16px;
  }
}

/* Scrollbar Styling */
.chatbot-messages::-webkit-scrollbar {
  width: 4px;
}

.chatbot-messages::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.chatbot-messages::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

.chatbot-messages::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
```

## Integration Examples

### 1. Add to Main Layout

```jsx
// layouts/MainLayout.jsx
import ChatToggle from '../components/ChatToggle';

const MainLayout = ({ children }) => (
  <div className="main-layout">
    <Header />
    <Sidebar />
    <main>{children}</main>
    <ChatToggle />  {/* Add here */}
  </div>
);
```

### 2. Dashboard Integration

```jsx
// pages/Dashboard.jsx
import ChatToggle from '../components/ChatToggle';

const Dashboard = () => (
  <div className="dashboard">
    <DashboardHeader />
    <MetricsCards />
    <RecentTransactions />
    <ChatToggle />
  </div>
);
```

### 3. Conditional Display

```jsx
// Show chat only for authenticated users
const App = () => {
  const { user } = useAuth();
  
  return (
    <div className="app">
      <Routes>
        {/* Your routes */}
      </Routes>
      {user && <ChatToggle />}
    </div>
  );
};
```

## Sample Conversations

### Financial Analysis
```
User: "How am I doing financially?"
Bot: "Looking at your recent activity, you're doing well! Your current balance is $52,000 with $5,000 in income and $3,200 in expenses over the last 30 days. This gives you a healthy positive cash flow of $1,800 monthly. Your main expense categories are office supplies and marketing. Would you like me to dive deeper into any specific area?"
```

### Spending Advice
```
User: "I think I'm spending too much on marketing"
Bot: "I can see you've spent on marketing recently. Based on your business type and income level, marketing investment can be valuable for growth. However, it's important to track ROI. Are you seeing returns from your marketing spend? I'd recommend setting a monthly marketing budget of 10-15% of your revenue."
```

### Budget Questions
```
User: "Can I afford a $3000 equipment purchase?"
Bot: "Based on your current balance of $52,000 and positive monthly cash flow of $1,800, a $3,000 equipment purchase is within your means. I'd recommend ensuring you maintain at least 3-6 months of operating expenses as a buffer. This purchase would still leave you with a healthy financial cushion."
```

## Error Handling

### Network Errors
```javascript
const handleNetworkError = (error) => {
  if (error.code === 'NETWORK_ERROR') {
    return "I'm having trouble connecting right now. Please check your internet connection and try again.";
  }
  return "Something went wrong. Please try again in a moment.";
};
```

### Rate Limiting
```javascript
const handleRateLimit = () => {
  return "I'm getting a lot of questions right now! Please wait a moment before sending another message.";
};
```

### No Data
```javascript
const handleNoData = () => {
  return "I don't have enough transaction data to provide specific advice yet. Try adding some transactions first, then ask me about your finances!";
};
```

## Performance Optimization

### Message Caching
```javascript
// Cache recent conversations in sessionStorage
const cacheMessages = (messages) => {
  sessionStorage.setItem('chat_messages', JSON.stringify(messages.slice(-20)));
};

const getCachedMessages = () => {
  const cached = sessionStorage.getItem('chat_messages');
  return cached ? JSON.parse(cached) : [];
};
```

### Debounced Input
```javascript
// Prevent rapid-fire messages
const useDebouncedSend = (sendMessage, delay = 1000) => {
  const [lastSent, setLastSent] = useState(0);
  
  return async (message) => {
    const now = Date.now();
    if (now - lastSent < delay) {
      throw new Error('Please wait before sending another message');
    }
    setLastSent(now);
    return sendMessage(message);
  };
};
```

## Testing

### Unit Tests
```javascript
// __tests__/ChatBot.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import ChatBot from '../components/ChatBot';

test('sends message when form is submitted', async () => {
  render(<ChatBot isOpen={true} />);
  
  const input = screen.getByPlaceholderText('Ask about your finances...');
  const sendButton = screen.getByRole('button', { name: /send/i });
  
  fireEvent.change(input, { target: { value: 'Test message' } });
  fireEvent.click(sendButton);
  
  expect(screen.getByText('Test message')).toBeInTheDocument();
});
```

### Integration Tests
```javascript
// Test API integration
test('receives AI response', async () => {
  const mockResponse = { message: 'AI response', timestamp: '2024-01-01' };
  jest.spyOn(chatService, 'sendMessage').mockResolvedValue(mockResponse);
  
  const { result } = renderHook(() => useChat());
  await act(() => result.current.sendMessage('Test'));
  
  expect(result.current.messages).toHaveLength(3); // Welcome + user + bot
});
```

## Deployment Notes

### Environment Variables
```bash
# Required for chatbot
AWS_REGION=us-east-1
BEDROCK_MODEL_ID=anthropic.claude-3-haiku-20240307-v1:0
```

### Feature Flags
```javascript
// Enable/disable chatbot
const FEATURES = {
  CHATBOT: process.env.REACT_APP_ENABLE_CHATBOT === 'true'
};

// Conditional rendering
{FEATURES.CHATBOT && <ChatToggle />}
```

### Analytics
```javascript
// Track chatbot usage
const trackChatMessage = (message, response) => {
  analytics.track('chat_message_sent', {
    message_length: message.length,
    response_length: response.length,
    timestamp: new Date().toISOString()
  });
};
```

## Cost Management

### Usage Limits
```javascript
// Limit messages per user per day
const MESSAGE_LIMIT = 50;
const checkMessageLimit = (userId) => {
  const today = new Date().toDateString();
  const key = `chat_limit_${userId}_${today}`;
  const count = parseInt(localStorage.getItem(key) || '0');
  
  if (count >= MESSAGE_LIMIT) {
    throw new Error('Daily message limit reached');
  }
  
  localStorage.setItem(key, (count + 1).toString());
};
```

### Estimated Costs
- **Per message**: ~$0.001-0.003
- **1000 users, 10 messages/day**: ~$30-90/month
- **Heavy usage**: ~$100-300/month

Your AI chatbot is now ready for frontend integration! 🤖💬
