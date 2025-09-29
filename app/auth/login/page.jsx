"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiTrendingUp, FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft, FiCheck, FiShield } from "react-icons/fi";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, accept any valid email/password
      if (formData.email && formData.password.length >= 6) {
        // Store demo token
        localStorage.setItem("token", "demo_token_" + Date.now());
        localStorage.setItem("userEmail", formData.email);
        
        // Success - redirect to dashboard
        router.push("/dashboard");
      } else {
        throw new Error("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
      {/* Left Side - Branding & Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-12 flex-col justify-between text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
        </div>

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center mb-12">
            <div className="bg-white/20 p-3 rounded-xl mr-4">
              <FiTrendingUp className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">CashFlow Co-Pilot</h1>
              <p className="text-blue-200">AI-Powered Financial Forecasting</p>
            </div>
          </div>

          {/* Value Props */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 p-2 rounded-lg mt-1">
                <FiCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Predict Cash Shortages</h3>
                <p className="text-blue-100 text-sm">Get 2-6 weeks advance warning before running out of cash</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 p-2 rounded-lg mt-1">
                <FiShield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Secure & Trusted</h3>
                <p className="text-blue-100 text-sm">Bank-level security protecting 500+ Nigerian SMEs</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 p-2 rounded-lg mt-1">
                <FiTrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Smart Insights</h3>
                <p className="text-blue-100 text-sm">AI-powered recommendations to improve your cash flow</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-yellow-300">500+</div>
            <div className="text-blue-200 text-sm">SMEs Trust Us</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-300">₦2.1M</div>
            <div className="text-blue-200 text-sm">Avg. Cash Saved</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-300">94%</div>
            <div className="text-blue-200 text-sm">Accuracy Rate</div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20">
        <div className="max-w-md w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <button 
              onClick={() => router.push('/')}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-6 mx-auto lg:hidden"
            >
              <FiArrowLeft className="h-4 w-4 mr-2" />
              Back to home
            </button>
            
            <div className="lg:hidden flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg mr-3">
                <FiTrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">CashFlow Co-Pilot</span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h2>
            <p className="text-gray-600">Sign in to access your cash flow dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {errors.submit}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                  }`}
                  placeholder="Enter your business email"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              <a href="/auth/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign in to Dashboard"
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
                Start your free trial
              </a>
            </p>
          </div>

          {/* Demo Notice */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-sm text-blue-700">
              <strong>Demo Mode:</strong> Use any valid email and password (6+ chars) to try the dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
