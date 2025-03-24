import React, { useState } from 'react';
import { ArrowRight, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../pulse-theme.css';

const LoginPage = () => {
  // Access auth context
  const { login, register, requestPasswordReset, error: authError, loading: authLoading } = useAuth();
  
  // State for login/signup mode toggle
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  // Form input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // Error and loading states
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Basic validation
      if (!email || !password) {
        setError('Please fill in all required fields');
        setIsLoading(false);
        return;
      }
      
      if (!isLoginMode && password !== confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }
      
      if (isLoginMode) {
        // Login
        await login({ email, password }, rememberMe);
      } else {
        // Register
        await register({ 
          name, 
          email, 
          password
        });
        
        // After successful registration, automatically log in
        await login({ email, password }, rememberMe);
      }
    } catch (err) {
      setError(authError || err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle forgot password submission
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (!email) {
        setError('Please enter your email address');
        setIsLoading(false);
        return;
      }
      
      await requestPasswordReset(email);
      setResetEmailSent(true);
    } catch (err) {
      setError(authError || err.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Reset all form fields when switching modes
  const switchMode = (mode) => {
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setIsLoginMode(mode);
    setShowForgotPassword(false);
    setResetEmailSent(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-blue-500 text-white">
          <h1 className="text-3xl font-bold">Pulse</h1>
          <p className="mt-1 text-blue-100">Universal Energy Management System</p>
        </div>
        
        {/* Form */}
        <div className="p-6">
          {/* Title based on current mode */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {showForgotPassword 
              ? "Reset Your Password" 
              : isLoginMode 
                ? "Welcome Back" 
                : "Create an Account"}
          </h2>
          
          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span>{error}</span>
            </div>
          )}
          
          {/* Success message for password reset */}
          {resetEmailSent && (
            <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg">
              <p>Password reset instructions have been sent to your email.</p>
              <button 
                onClick={() => setShowForgotPassword(false)}
                className="text-blue-500 hover:underline mt-2"
              >
                Back to login
              </button>
            </div>
          )}
          
          {!resetEmailSent && (
            <form onSubmit={showForgotPassword ? handleForgotPassword : handleSubmit}>
              {/* Name field - only for signup */}
              {!isLoginMode && !showForgotPassword && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}
              
              {/* Email field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              
              {/* Password fields - not for forgot password */}
              {!showForgotPassword && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Confirm Password - only for signup */}
                  {!isLoginMode && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirmPassword">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-10 w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
              
              {/* Remember me - only for login */}
              {isLoginMode && !showForgotPassword && (
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Stay signed in
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-blue-500 hover:text-blue-600"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
              
              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading || authLoading}
                className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                  (isLoading || authLoading) ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {(isLoading || authLoading) ? (
                  <div className="loader w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    {showForgotPassword
                      ? "Send Reset Link"
                      : isLoginMode
                        ? "Sign In"
                        : "Create Account"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          )}
          
          {/* Mode toggle buttons */}
          {!resetEmailSent && !showForgotPassword && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => switchMode(!isLoginMode)}
                  className="ml-1 text-blue-500 hover:text-blue-600 font-medium"
                >
                  {isLoginMode ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          )}
          
          {/* Back to login button - only for forgot password */}
          {showForgotPassword && !resetEmailSent && (
            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="mt-4 text-sm text-blue-500 hover:text-blue-600 block mx-auto"
            >
              Back to login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 