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
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
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
