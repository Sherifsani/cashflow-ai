"use client"

import React from 'react'
import { FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi'

interface Props {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onComplete: () => void;
  canProceed: boolean;
  isLoading?: boolean;
}

export default function SetupNavigation({ 
  currentStep, 
  totalSteps, 
  onPrevious, 
  onNext, 
  onComplete, 
  canProceed,
  isLoading = false 
}: Props) {
  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === totalSteps

  return (
    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
      <div>
        {!isFirstStep && (
          <button
            type="button"
            onClick={onPrevious}
            disabled={isLoading}
            className="flex items-center px-4 py-2 text-sm font-medium text-text-secondary bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-text-secondary font-medium">
          Step {currentStep} of {totalSteps}
        </span>
      </div>

      <div>
        {isLastStep ? (
          <button
            type="button"
            onClick={onComplete}
            disabled={!canProceed || isLoading}
            className="flex items-center px-6 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Setting up...
              </>
            ) : (
              <>
                <FiCheck className="h-4 w-4 mr-2" />
                Complete Setup
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            disabled={!canProceed || isLoading}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <FiArrowRight className="h-4 w-4 ml-2" />
          </button>
        )}
      </div>
    </div>
  )
}