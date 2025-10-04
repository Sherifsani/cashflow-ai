"use client"

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { BusinessData, BusinessType, Goal, SetupFormHook } from '../types'

export default function useSetupForm(): SetupFormHook {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [businessData, setBusinessData] = useState<BusinessData>({
    // Step 1: Business Info
    businessName: '',
    businessType: '',
    location: '',
    
    // Step 2: Financial Info  
    startingBalance: '',
    monthlyRevenue: '',
    monthlyExpenses: '',
    
    // Step 3: Goals
    goal: '',
    customGoal: '',
    
    // Step 4: Contact
    phone: '',
    whatsappAlerts: true,
    emailReports: true
  })

  const businessTypes: BusinessType[] = [
    { id: 'restaurant', name: 'Restaurant/Food Service', icon: '🍽️' },
    { id: 'retail', name: 'Retail/Shop', icon: '🏪' },
    { id: 'services', name: 'Professional Services', icon: '💼' },
    { id: 'beauty', name: 'Beauty/Salon', icon: '💇‍♀️' },
    { id: 'tech', name: 'Technology/IT', icon: '💻' },
    { id: 'construction', name: 'Construction', icon: '🏗️' },
    { id: 'transport', name: 'Transportation', icon: '🚛' },
    { id: 'other', name: 'Other', icon: '📋' }
  ]

  const goals: Goal[] = [
    { 
      id: 'supplement_income', 
      title: 'Supplement my current income', 
      description: 'Create an additional income stream alongside my current job',
      priority: 'low'
    },
    { 
      id: 'replace_income', 
      title: 'Replace my current income', 
      description: 'Build a business that can fully replace my salary',
      priority: 'medium'
    },
    { 
      id: 'build_wealth', 
      title: 'Build long-term wealth', 
      description: 'Create a business that generates significant wealth over time',
      priority: 'high'
    },
    { 
      id: 'financial_independence', 
      title: 'Achieve financial independence', 
      description: 'Build multiple income streams for complete financial freedom',
      priority: 'high'
    },
    { 
      id: 'other', 
      title: 'Other', 
      description: 'I have a different primary goal for my business',
      priority: 'medium'
    }
  ]

  const handleInputChange = useCallback((field: keyof BusinessData, value: string | boolean): void => {
    setBusinessData(prev => ({
      ...prev,
      [field]: value
    }))
  }, [])

  const nextStep = useCallback((): void => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }, [currentStep])

  const prevStep = useCallback((): void => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }, [currentStep])

  const completeSetup = useCallback(async (): Promise<void> => {
    try {
      const { createUserProfile } = await import('../../../lib/api');
      
      // Get user info from localStorage
      const userEmail = localStorage.getItem('userEmail');
      
      if (!userEmail) {
        throw new Error('User email not found');
      }

      // Create user profile via API
      const profileData = {
        userId: crypto.randomUUID(), // Generate UUID for user
        email: userEmail,
        firstName: '', // Will be updated later
        lastName: '',
        phoneNumber: businessData.phone,
        businessName: businessData.businessName,
        businessType: businessData.businessType,
        businessLocation: businessData.location,
        monthlyRevenue: parseFloat(businessData.monthlyRevenue || '0'),
        teamSize: 1, // Default
        startingBalance: parseFloat(businessData.startingBalance || '0'),
        expectedMonthlyExpense: parseFloat(businessData.monthlyExpenses || '0'),
        expectedMonthlyIncome: parseFloat(businessData.monthlyRevenue || '0'),
        financialGoals: [businessData.goal],
        notificationPreference: businessData.emailReports ? 'email' : 'none'
      };

      await createUserProfile(profileData);
      
      // Store setup completion
      localStorage.setItem('businessSetup', JSON.stringify(businessData));
      localStorage.setItem('setupCompleted', 'true');
      
      router.push('/dashboard');
    } catch (error) {
      console.error('Setup completion error:', error);
      // Fallback - save locally and continue
      localStorage.setItem('businessSetup', JSON.stringify(businessData));
      localStorage.setItem('setupCompleted', 'true');
      router.push('/dashboard');
    }
  }, [businessData, router]);

  const getStepTitle = useCallback((): string => {
    switch (currentStep) {
      case 1: return 'Tell us about your business'
      case 2: return 'Your current financial situation'
      case 3: return 'What are your goals?'
      case 4: return 'Stay connected'
      default: return 'Business Setup'
    }
  }, [currentStep])

  const isStepValid = useCallback((): boolean => {
    switch (currentStep) {
      case 1: 
        return !!(businessData.businessName && businessData.businessType && businessData.location)
      case 2: 
        return !!(businessData.startingBalance && businessData.monthlyExpenses)
      case 3: 
        return !!businessData.goal
      case 4: 
        return !!businessData.phone
      default: 
        return false
    }
  }, [currentStep, businessData])

  const formatCurrency = useCallback((amount: string): string => {
    if (!amount) return "X"
    return parseFloat(amount).toLocaleString()
  }, [])

  const calculateRunwayMonths = useCallback((): number => {
    if (!businessData.startingBalance || !businessData.monthlyExpenses) return 0
    return Math.floor(parseFloat(businessData.startingBalance) / parseFloat(businessData.monthlyExpenses))
  }, [businessData.startingBalance, businessData.monthlyExpenses])

  const calculateProfitMargin = useCallback((): number => {
    if (!businessData.monthlyRevenue || !businessData.monthlyExpenses) return 0
    const revenue = parseFloat(businessData.monthlyRevenue)
    const expenses = parseFloat(businessData.monthlyExpenses)
    return ((revenue - expenses) / revenue * 100)
  }, [businessData.monthlyRevenue, businessData.monthlyExpenses])

  const calculateMonthlyProfit = useCallback((): number => {
    if (!businessData.monthlyRevenue || !businessData.monthlyExpenses) return 0
    return parseFloat(businessData.monthlyRevenue) - parseFloat(businessData.monthlyExpenses)
  }, [businessData.monthlyRevenue, businessData.monthlyExpenses])

  return {
    // State
    currentStep,
    businessData,
    
    // Data
    businessTypes,
    goals,
    
    // Actions
    handleInputChange,
    nextStep,
    prevStep,
    completeSetup,
    
    // Validation & Helpers
    isStepValid,
    getStepTitle,
    formatCurrency,
    calculateRunwayMonths,
    calculateProfitMargin,
    calculateMonthlyProfit
  }
}