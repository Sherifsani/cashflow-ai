'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiTrendingUp, FiMail, FiArrowLeft, FiCheck, FiSend, FiRefreshCw } from "react-icons/fi";

const ForgotPassword = () => {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: email, 2: verification, 3: success
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    verificationCode: ["", "", "", "", "", ""]
  });
  const [errors, setErrors] = useState({});
  const [resendTimer, setResendTimer] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleCodeChange = (index, value) => {
    if (!/^\d*$/.test(value) || value.length > 1) return;
    
    const newCode = [...formData.verificationCode];
    newCode[index] = value;
    
    setFormData(prev => ({
      ...prev,
      verificationCode: newCode
    }));

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !formData.verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const validateEmail = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStep(2);
      startResendTimer();
    } catch (err) {
      setErrors({ email: "Failed to send code. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    const code = formData.verificationCode.join('');
    
    if (code.length !== 6) {
      setErrors({ code: "Please enter the complete verification code" });
      return;
    }
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep(3);
    } catch (err) {
      setErrors({ code: "Invalid verification code. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const startResendTimer = () => {
    setResendTimer(60);
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendCode = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      startResendTimer();
      setErrors({});
    } catch (err) {
      setErrors({ code: "Failed to resend code. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-12 flex-col justify-center text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
        </div>

        <div className="relative z-10 text-center">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-white/20 p-3 rounded-xl mr-4">
              <FiTrendingUp className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">CashFlow Co-Pilot</h1>
              <p className="text-blue-200">Secure Account Recovery</p>
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-4">Account Security</h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Your business data is protected with bank-level security. We'll help you regain access safely and quickly.
            </p>
            
            <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="font-semibold mb-4">🔒 Security Features</h3>
              <div className="space-y-3 text-sm text-blue-100">
                <div className="flex items-center">
                  <FiCheck className="h-4 w-4 mr-2 text-green-400" />
                  <span>Two-factor authentication</span>
                </div>
                <div className="flex items-center">
                  <FiCheck className="h-4 w-4 mr-2 text-green-400" />
                  <span>Encrypted data transmission</span>
                </div>
                <div className="flex items-center">
                  <FiCheck className="h-4 w-4 mr-2 text-green-400" />
                  <span>Secure password reset process</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Reset Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20">
        <div className="max-w-md w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <button 
              onClick={() => router.push('/auth/login')}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-6 mx-auto"
            >
              <FiArrowLeft className="h-4 w-4 mr-2" />
              Back to login
            </button>
            
            <div className="lg:hidden flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg mr-3">
                <FiTrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">CashFlow Co-Pilot</span>
            </div>

            {step === 1 && (
              <>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
                <p className="text-gray-600">Enter your email address and we'll send you a verification code</p>
              </>
            )}
            
            {step === 2 && (
              <>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Check Your Email</h2>
                <p className="text-gray-600">We sent a 6-digit verification code to <strong>{formData.email}</strong></p>
              </>
            )}
            
            {step === 3 && (
              <>
                <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <FiCheck className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Check Your Email!</h2>
                <p className="text-gray-600">We've sent password reset instructions to your email address</p>
              </>
            )}
          </div>

          {/* Step 1: Email Input */}
          {step === 1 && (
            <form onSubmit={handleSendCode} className="space-y-6">
              {errors.email && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {errors.email}
                </div>
              )}

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
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending Code...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <FiSend className="h-5 w-5 mr-2" />
                    Send Verification Code
                  </div>
                )}
              </button>
            </form>
          )}

          {/* Step 2: Code Verification */}
          {step === 2 && (
            <form onSubmit={handleVerifyCode} className="space-y-6">
              {errors.code && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {errors.code}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Verification Code
                </label>
                <div className="flex justify-center space-x-3">
                  {formData.verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-lg font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      maxLength="1"
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  "Verify Code"
                )}
              </button>

              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Didn't receive the code?</p>
                {resendTimer > 0 ? (
                  <p className="text-gray-500 text-sm">
                    Resend code in {resendTimer}s
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={loading}
                    className="text-blue-600 hover:text-blue-500 font-medium text-sm disabled:opacity-50"
                  >
                    <FiRefreshCw className="inline h-4 w-4 mr-1" />
                    Resend Code
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700 text-sm">
                  <strong>Next Steps:</strong><br />
                  1. Check your email inbox (and spam folder)<br />
                  2. Click the reset link in the email<br />
                  3. Create your new password<br />
                  4. Sign in to your dashboard
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => router.push('/auth/login')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all"
                >
                  Return to Login
                </button>
                
                <button
                  onClick={() => {
                    setStep(1);
                    setFormData({ email: "", verificationCode: ["", "", "", "", "", ""] });
                    setErrors({});
                  }}
                  className="w-full text-gray-600 hover:text-gray-900 py-2 font-medium"
                >
                  Try Different Email
                </button>
              </div>
            </div>
          )}

          {/* Help */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Need help? Contact our support team at{" "}
              <a href="mailto:support@cashflowcopilot.ng" className="text-blue-600 hover:underline">
                support@cashflowcopilot.ng
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;