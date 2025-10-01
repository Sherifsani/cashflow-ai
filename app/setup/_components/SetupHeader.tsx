"use client"

import React from 'react'
import { FiTrendingUp } from 'react-icons/fi'

interface Props {
  currentStep: number;
  getStepTitle: () => string;
}

export default function SetupHeader({ currentStep, getStepTitle }: Props) {
  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-primary p-3 rounded-full w-16 h-16 mx-auto mb-4 shadow-lg hover:shadow-xl transition-shadow">
          <FiTrendingUp className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Welcome to CashFlow Co-Pilot</h1>
        <p className="text-text-secondary">Let's set up your business profile to get personalized insights</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-text-secondary">Step {currentStep} of 4</span>
          <span className="text-sm font-medium text-primary">{Math.round((currentStep / 4) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
          <div 
            className="bg-gradient-to-r from-primary to-primary-dark h-3 rounded-full transition-all duration-500 ease-in-out shadow-sm"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Title */}
      {/* <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">{getStepTitle()}</h2>
      </div> */}
    </div>
  )
}