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
        <div className="bg-white p-3 rounded-full w-16 h-16 mx-auto mb-4 shadow-lg">
          <FiTrendingUp className="h-10 w-10 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to CashFlow Co-Pilot</h1>
        <p className="text-gray-600">Let's set up your business profile to get personalized insights</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">Step {currentStep} of 4</span>
          <span className="text-sm text-gray-500">{Math.round((currentStep / 4) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Title */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">{getStepTitle()}</h2>
      </div>
    </div>
  )
}