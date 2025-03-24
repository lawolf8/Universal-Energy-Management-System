import React, { createContext, useState, useContext, useEffect } from 'react';
import userApi from '../services/userApi';

// Create the authentication context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize user state from localStorage if available (for "stay signed in" functionality)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('pulseUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check localStorage on mount to restore session
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Validate token with backend by fetching user profile
          const userData = await userApi.getProfile();
          setUser(userData);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('pulseUser');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (credentials, rememberMe = false) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await userApi.login(credentials);
      
      // Save token and user data
      const { token, user: userData } = response;
      
      if (token) {
        localStorage.setItem('token', token);
        
        // If "rememberMe" is true, save user to localStorage
        if (rememberMe) {
          localStorage.setItem('pulseUser', JSON.stringify(userData));
        }
        
        setUser(userData);
      } else {
        throw new Error('No token received from server');
      }
      
      return userData;
    } catch (error) {
      setError(error.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('pulseUser');
  };

  // Register function
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await userApi.register(userData);
      return response;
    } catch (error) {
      setError(error.message || 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedUser = await userApi.updateProfile(profileData);
      setUser(prev => ({ ...prev, ...updatedUser }));
      return updatedUser;
    } catch (error) {
      setError(error.message || 'Failed to update profile');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Request password reset
  const requestPasswordReset = async (email) => {
    setLoading(true);
    setError(null);
    
    try {
      return await userApi.requestPasswordReset(email);
    } catch (error) {
      setError(error.message || 'Failed to request password reset');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Authentication value that will be provided to components
  const authValue = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    updateProfile,
    requestPasswordReset,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 