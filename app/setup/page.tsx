"use client"

import React from 'react'
import useSetupForm from './_hooks/useSetupForm'
import SetupHeader from './_components/SetupHeader'
import Step1Business from './_components/Step1Business'
import Step2Financial from './_components/Step2Financial'
import Step3Goals from './_components/Step3Goals'
import Step4Contact from './_components/Step4Contact'
import SetupNavigation from './_components/SetupNavigation'

export default function BusinessSetupPage() {
  const {
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
  } = useSetupForm()

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Business
            businessData={businessData}
            businessTypes={businessTypes}
            handleInputChange={handleInputChange}
          />
        )
      case 2:
        return (
          <Step2Financial
            businessData={businessData}
            handleInputChange={handleInputChange}
            formatCurrency={formatCurrency}
            calculateRunwayMonths={calculateRunwayMonths}
            calculateMonthlyProfit={calculateMonthlyProfit}
            calculateProfitMargin={calculateProfitMargin}
          />
        )
      case 3:
        return (
          <Step3Goals
            businessData={businessData}
            handleInputChange={handleInputChange}
          />
        )
      case 4:
        return (
          <Step4Contact
            businessData={businessData}
            handleInputChange={handleInputChange}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <SetupHeader 
          currentStep={currentStep}
          getStepTitle={getStepTitle}
        />
        
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          {renderStepContent()}
          
          <SetupNavigation
            currentStep={currentStep}
            totalSteps={4}
            onPrevious={prevStep}
            onNext={nextStep}
            onComplete={completeSetup}
            canProceed={isStepValid()}
          />
        </div>
      </div>
    </div>
  )
}