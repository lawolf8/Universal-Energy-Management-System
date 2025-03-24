import axios from 'axios';

// Create an axios instance with base URL for API requests
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token for protected routes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// User API service
const userApi = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await api.post('/users/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to register user' };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/users/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user profile' };
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/users/profile', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update user profile' };
    }
  },

  // Update user password
  updatePassword: async (passwordData) => {
    try {
      const response = await api.put('/users/password', passwordData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update password' };
    }
  },

  // Request password reset
  requestPasswordReset: async (email) => {
    try {
      const response = await api.post('/users/reset-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to request password reset' };
    }
  },

  // Verify account 
  verifyAccount: async (token) => {
    try {
      const response = await api.get(`/users/verify/${token}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to verify account' };
    }
  },

  // Submit support request
  submitSupport: async (supportData) => {
    try {
      const response = await api.post('/support', supportData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to submit support request' };
    }
  },

  // Get user devices
  getUserDevices: async () => {
    try {
      const response = await api.get('/users/devices');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user devices' };
    }
  },

  // Add new device
  addDevice: async (deviceData) => {
    try {
      const response = await api.post('/users/devices', deviceData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to add device' };
    }
  },

  // Update device
  updateDevice: async (deviceId, deviceData) => {
    try {
      const response = await api.put(`/users/devices/${deviceId}`, deviceData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update device' };
    }
  },

  // Delete device
  deleteDevice: async (deviceId) => {
    try {
      const response = await api.delete(`/users/devices/${deviceId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete device' };
    }
  },

  // Get user settings
  getUserSettings: async () => {
    try {
      const response = await api.get('/users/settings');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user settings' };
    }
  },

  // Update user settings
  updateUserSettings: async (settingsData) => {
    try {
      const response = await api.put('/users/settings', settingsData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update user settings' };
    }
  }
};

export default userApi; 