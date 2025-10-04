"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiTrendingUp, FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft, FiCheck, FiShield } from "react-icons/fi";

interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
  submit?: string;
}

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<Errors>({});

  // Check for verification success
  const isVerified = searchParams.get('verified') === 'true';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof Errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const { signIn } = await import('../../../lib/cognito');
      
      const response = await signIn(formData.email, formData.password);
      
      if (response.AuthenticationResult?.AccessToken) {
        // Store tokens
        localStorage.setItem("accessToken", response.AuthenticationResult.AccessToken);
        localStorage.setItem("idToken", response.AuthenticationResult.IdToken || "");
        localStorage.setItem("refreshToken", response.AuthenticationResult.RefreshToken || "");
        localStorage.setItem("userEmail", formData.email);
        
        // Check if user needs profile creation
        const needsProfileCreation = localStorage.getItem("pendingProfileCreation");
        
        if (needsProfileCreation) {
          try {
            const { createUserProfile } = await import('../../../lib/api');
            
            // Get stored registration data
            const pendingUser = localStorage.getItem("pendingUser") || sessionStorage.getItem("pendingUser");
            
            if (pendingUser) {
              const userData = JSON.parse(pendingUser);
              
              await createUserProfile({
                userId: crypto.randomUUID(),
                email: formData.email,
                firstName: userData.firstName || "",
                lastName: userData.lastName || "",
                phoneNumber: userData.phone || "",
                businessName: userData.businessName || "",
                businessType: userData.businessType || "General",
                businessLocation: userData.businessLocation || "",
                monthlyRevenue: parseFloat(userData.monthlyRevenue || "0"),
                teamSize: userData.employeeCount === "Just me" ? 1 : 
                         userData.employeeCount === "2-5 employees" ? 3 :
                         userData.employeeCount === "6-10 employees" ? 8 :
                         userData.employeeCount === "11-25 employees" ? 18 :
                         userData.employeeCount === "26-50 employees" ? 38 : 50,
                startingBalance: parseFloat(userData.startingBalance || "0"),
                expectedMonthlyExpense: parseFloat(userData.expectedMonthlyExpense || "0"),
                expectedMonthlyIncome: parseFloat(userData.monthlyRevenue || "0"),
                financialGoals: userData.financialGoals ? [userData.financialGoals] : [],
                notificationPreference: userData.alertPreference === "whatsapp" ? "both" : "email"
              });
              
              // Clean up stored data
              localStorage.removeItem("pendingUser");
              sessionStorage.removeItem("pendingUser");
            }
            
            localStorage.removeItem("pendingProfileCreation");
            localStorage.setItem("profileCreated", "true");
          } catch (error) {
            console.error('Profile creation error:', error);
          }
        }
        
        router.push("/dashboard");
      } else {
        throw new Error("Authentication failed");
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setErrors({ submit: err.message || "Invalid credentials. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-gray-light flex">
      {/* Left Side - Branding & Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-gray-dark p-12 flex-col justify-between text-white relative overflow-hidden">
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
              <p className="text-brand-teal/80">AI-Powered Financial Forecasting</p>
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
                <p className="text-brand-text-medium/90 text-sm">Get 2-6 weeks advance warning before running out of cash</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 p-2 rounded-lg mt-1">
                <FiShield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Secure & Trusted</h3>
                <p className="text-brand-text-medium/90 text-sm">Bank-level security protecting 500+ Nigerian SMEs</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 p-2 rounded-lg mt-1">
                <FiTrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Smart Insights</h3>
                <p className="text-brand-text-medium/90 text-sm">AI-powered recommendations to improve your cash flow</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-brand-teal">500+</div>
            <div className="text-brand-text-medium text-sm">SMEs Trust Us</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-brand-teal">₦2.1M</div>
            <div className="text-brand-text-medium text-sm">Avg. Cash Saved</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-brand-teal">94%</div>
            <div className="text-brand-text-medium text-sm">Accuracy Rate</div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 bg-brand-gray-light">
        <div className="max-w-md w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <button 
              onClick={() => router.push('/')}
              className="flex items-center text-brand-text-medium hover:text-brand-text-dark mb-6 mx-auto lg:hidden"
            >
              <FiArrowLeft className="h-4 w-4 mr-2" />
              Back to home
            </button>
            
            <div className="lg:hidden flex items-center justify-center mb-6">
              <div className="bg-brand-teal p-2 rounded-lg mr-3">
                <FiTrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-brand-text-dark">CashFlow Co-Pilot</span>
            </div>

            <h2 className="text-3xl font-bold text-brand-text-dark mb-2">Welcome back!</h2>
            <p className="text-brand-text-medium">Sign in to access your cash flow dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Verification Success Message */}
            {isVerified && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-center">
                <FiCheck className="h-5 w-5 mr-2" />
                Email verified successfully! You can now sign in.
              </div>
            )}

            {errors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {errors.submit}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-brand-text-dark mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-brand-text-medium" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-brand-border bg-white'
                  }`}
                  placeholder="Enter your business email"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-brand-text-dark mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-brand-text-medium" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent ${
                    errors.password ? 'border-red-300 bg-red-50' : 'border-brand-border bg-white'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-brand-text-medium hover:text-brand-text-dark" />
                  ) : (
                    <FiEye className="h-5 w-5 text-brand-text-medium hover:text-brand-text-dark" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-brand-teal border-brand-border rounded focus:ring-brand-teal" />
                <span className="ml-2 text-sm text-brand-text-dark">Remember me</span>
              </label>
              <a href="/auth/forgot-password" className="text-sm font-medium text-brand-teal hover:text-brand-teal-dark">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
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
            <p className="text-brand-text-medium">
              Don't have an account?{" "}
              <a href="/auth/register" className="font-medium text-brand-teal hover:text-brand-teal-dark">
                Start your free trial
              </a>
            </p>
          </div>

          {/* Demo Notice */}
          <div className="mt-6 bg-brand-teal/10 border border-brand-teal/30 rounded-lg p-4 text-center">
            <p className="text-sm text-brand-teal">
              <strong>Demo Mode:</strong> Use any valid email and password (6+ chars) to try the dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
