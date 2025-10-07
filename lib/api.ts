const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

// Get auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('idToken') || localStorage.getItem('accessToken');
  }
  return null;
};

// API request wrapper with auth
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const url = `${BASE_URL}${endpoint}`;
  
  console.log('Making API request to:', url);
  console.log('With token:', token ? 'Present' : 'Missing');
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    console.log('API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`Failed ${endpoint}: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response data:', data);
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Health & Status
export const healthCheck = () => apiRequest('/health');
export const dbStatus = () => apiRequest('/api/db-status');

// Auth & User Profile
export const createUserProfile = (userData: any) => 
  apiRequest('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });

export const getUserProfile = () => apiRequest('/api/auth/user/profile');

export const updateUserProfile = (userData: any) =>
  apiRequest('/api/auth/user/profile', {
    method: 'PUT',
    body: JSON.stringify(userData),
  });

// Transactions
export const createTransaction = (transaction: any) =>
  apiRequest('/api/transactions', {
    method: 'POST',
    body: JSON.stringify(transaction),
  });

export const getAllTransactions = () => apiRequest('/api/transactions');

export const getTransactionsByPeriod = (period: '7d' | '30d' | '90d' | '1y') =>
  apiRequest(`/api/transactions/period/${period}`);

// Analytics
export const getAnalytics = (period: '7d' | '30d' | '90d' | '1y') =>
  apiRequest(`/api/analytics/${period}`);

// AI Insights
export const getAIInsights = () => apiRequest('/api/insights');

// Chat
export const sendChatMessage = (message: string) =>
  apiRequest('/api/chat/message', {
    method: 'POST',
    body: JSON.stringify({ message }),
  });

export const deleteTransaction = (transactionId: string) =>
  apiRequest(`/api/transactions/${transactionId}`, { method: 'DELETE' });

// Dashboard
export const getDashboardData = () => apiRequest('/api/dashboard');

// File Upload
export const getPresignedUploadUrl = (fileName: string) =>
  apiRequest('/api/file-upload/presigned-url', {
    method: 'POST',
    body: JSON.stringify({ fileName }),
  });

export const confirmFileUpload = (fileId: string, fileSize: number) =>
  apiRequest('/api/file-upload/confirm-upload', {
    method: 'POST',
    body: JSON.stringify({ fileId, fileSize }),
  });

export const getUserFiles = () => apiRequest('/api/file-upload/files');

// Test
export const testProtectedEndpoint = () => apiRequest('/api/protected');
