import authService from './authService';

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const token = authService.getIdToken();
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      
      // Handle token expiration
      if (response.status === 401) {
        try {
          await authService.refreshTokens();
          // Retry request with new token
          config.headers.Authorization = `Bearer ${authService.getIdToken()}`;
          return fetch(`${this.baseURL}${endpoint}`, config);
        } catch (refreshError) {
          // Refresh failed, redirect to login
          authService.signOut();
          window.location.href = '/login';
          throw new Error('Session expired');
        }
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  // Convenience methods
  get(endpoint) {
    return this.request(endpoint);
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }
}

export default new ApiClient();