'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiTrendingUp, FiMail, FiLock, FiUser, FiPhone, FiBriefcase, FiMapPin, FiEye, FiEyeOff, FiArrowLeft, FiCheck, FiArrowRight } from "react-icons/fi";

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    // Business Details  
    businessName: "",
    businessType: "",
    businessLocation: "",
    monthlyRevenue: "",
    employeeCount: "",
    // Preferences
    alertPreference: "whatsapp",
    hearAboutUs: ""
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

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (!formData.phone) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = "Password must contain uppercase, lowercase, and number";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }
    
    if (step === 2) {
      if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";
      if (!formData.businessType) newErrors.businessType = "Please select business type";
      if (!formData.businessLocation.trim()) newErrors.businessLocation = "Business location is required";
      if (!formData.monthlyRevenue) newErrors.monthlyRevenue = "Please select monthly revenue range";
      if (!formData.employeeCount) newErrors.employeeCount = "Please select employee count";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateStep(3)) return;
    
    setLoading(true);

    try {
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store demo data
      localStorage.setItem("token", "demo_token_" + Date.now());
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("businessName", formData.businessName);
      localStorage.setItem("isNewUser", "true");
      
      // Success - redirect to business setup for new users
      router.push("/setup");
    } catch (err) {
      setErrors({ submit: "Registration failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const businessTypes = [
    "Restaurant/Food Service", "Retail/Shop", "Electronics/Tech", "Fashion/Clothing",
    "Construction/Building", "Agriculture/Farming", "Transportation/Logistics", "Beauty/Personal Care",
    "Professional Services", "Manufacturing", "Other"
  ];

  const revenueRanges = [
    "Under ₦100K", "₦100K - ₦500K", "₦500K - ₦1M", "₦1M - ₦5M", "₦5M - ₦10M", "Above ₦10M"
  ];

  const employeeCounts = [
    "Just me", "2-5 employees", "6-10 employees", "11-25 employees", "26-50 employees", "50+ employees"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
      {/* Left Side - Branding & Progress */}
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-12 flex-col justify-between text-white relative overflow-hidden">
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
              <p className="text-blue-200">Join 500+ Nigerian SMEs</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-6">Quick Setup Process</h3>
            <div className="space-y-4">
              {[
                { step: 1, title: "Personal Details", desc: "Your account information" },
                { step: 2, title: "Business Profile", desc: "Tell us about your business" },
                { step: 3, title: "Preferences", desc: "Customize your experience" }
              ].map((item) => (
                <div key={item.step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                    currentStep > item.step ? 'bg-green-500' : 
                    currentStep === item.step ? 'bg-white text-blue-600' : 'bg-white/20'
                  }`}>
                    {currentStep > item.step ? <FiCheck className="h-4 w-4" /> : item.step}
                  </div>
                  <div>
                    <div className={`font-medium ${currentStep >= item.step ? 'text-white' : 'text-blue-200'}`}>
                      {item.title}
                    </div>
                    <div className="text-blue-200 text-sm">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            <h4 className="font-semibold">What you'll get:</h4>
            {[
              "14-day free trial (no credit card required)",
              "Instant cash flow forecasting",
              "WhatsApp alerts for cash shortages", 
              "AI-powered business insights"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center text-blue-100 text-sm">
                <FiCheck className="h-4 w-4 mr-2 text-green-400" />
                {benefit}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <p className="text-blue-100 italic mb-3">
            "Setup was so easy! Within 5 minutes I could see my cash flow predictions. Game changer for my restaurant!"
          </p>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
              A
            </div>
            <div>
              <div className="font-semibold text-white">Adaora Okeke</div>
              <div className="text-blue-200 text-xs">Restaurant Owner, Lagos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16">
        <div className="max-w-lg w-full mx-auto">
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

            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {currentStep === 1 && "Create Your Account"}
              {currentStep === 2 && "About Your Business"}
              {currentStep === 3 && "Final Setup"}
            </h2>
            <p className="text-gray-600">
              {currentStep === 1 && "Let's start with your personal details"}
              {currentStep === 2 && "Help us understand your business better"}
              {currentStep === 3 && "Choose how you'd like to be notified"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {errors.submit}
              </div>
            )}

            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="John"
                      />
                    </div>
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Doe"
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="john@businessname.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="+234 801 234 5678"
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEyeOff className="h-5 w-5 text-gray-400" /> : <FiEye className="h-5 w-5 text-gray-400" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FiEyeOff className="h-5 w-5 text-gray-400" /> : <FiEye className="h-5 w-5 text-gray-400" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Business Details */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiBriefcase className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.businessName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="e.g. Mama's Kitchen Restaurant"
                    />
                  </div>
                  {errors.businessName && <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Business Type</label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.businessType ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select your business type</option>
                    {businessTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.businessType && <p className="mt-1 text-sm text-red-600">{errors.businessType}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Business Location</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="businessLocation"
                      value={formData.businessLocation}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.businessLocation ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="e.g. Ikeja, Lagos"
                    />
                  </div>
                  {errors.businessLocation && <p className="mt-1 text-sm text-red-600">{errors.businessLocation}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Revenue</label>
                  <select
                    name="monthlyRevenue"
                    value={formData.monthlyRevenue}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.monthlyRevenue ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select monthly revenue range</option>
                    {revenueRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                  {errors.monthlyRevenue && <p className="mt-1 text-sm text-red-600">{errors.monthlyRevenue}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Team Size</label>
                  <select
                    name="employeeCount"
                    value={formData.employeeCount}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.employeeCount ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select team size</option>
                    {employeeCounts.map(count => (
                      <option key={count} value={count}>{count}</option>
                    ))}
                  </select>
                  {errors.employeeCount && <p className="mt-1 text-sm text-red-600">{errors.employeeCount}</p>}
                </div>
              </div>
            )}

            {/* Step 3: Preferences */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">How would you like to receive cash flow alerts?</label>
                  <div className="space-y-3">
                    {[
                      { value: "whatsapp", label: "WhatsApp (Recommended)", desc: "Get instant alerts on your phone" },
                      { value: "email", label: "Email", desc: "Receive alerts in your inbox" },
                      { value: "both", label: "Both WhatsApp & Email", desc: "Maximum coverage" }
                    ].map((option) => (
                      <label key={option.value} className="flex items-start cursor-pointer">
                        <input
                          type="radio"
                          name="alertPreference"
                          value={option.value}
                          checked={formData.alertPreference === option.value}
                          onChange={handleInputChange}
                          className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <div className="ml-3">
                          <div className="font-medium text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-600">{option.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">How did you hear about us?</label>
                  <select
                    name="hearAboutUs"
                    value={formData.hearAboutUs}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select an option</option>
                    <option value="google">Google Search</option>
                    <option value="social">Social Media</option>
                    <option value="friend">Friend/Colleague</option>
                    <option value="business_event">Business Event</option>
                    <option value="ad">Advertisement</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Terms */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="ml-3 text-sm text-gray-700">
                      I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
                >
                  <FiArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex items-center ml-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  Continue
                  <FiArrowRight className="h-4 w-4 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center ml-auto bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Start Free Trial
                      <FiCheck className="h-4 w-4 ml-2" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
