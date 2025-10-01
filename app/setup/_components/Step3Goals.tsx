"use client"

import React from 'react'
import { FiTarget, FiCheck } from 'react-icons/fi'
import { BusinessData, Goal } from '../types'

interface Props {
  businessData: BusinessData;
  handleInputChange: (field: keyof BusinessData, value: string | boolean) => void;
}

export default function Step3Goals({ businessData, handleInputChange }: Props) {
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-green-200 bg-green-50'
      case 'medium':
        return 'border-blue-200 bg-blue-50'
      case 'low':
        return 'border-gray-200 bg-gray-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  const getPriorityTextColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-green-800'
      case 'medium':
        return 'text-blue-800'
      case 'low':
        return 'text-gray-800'
      default:
        return 'text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
        <div className="flex items-start">
          <FiTarget className="h-5 w-5 text-primary mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium text-text-primary">Define your financial goals</h3>
            <p className="text-sm text-text-secondary mt-1">
              Understanding your goals helps us tailor recommendations for your business growth.
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-4">
          What's your primary financial goal for this business? *
        </label>
        <div className="space-y-3">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className={`relative border rounded-lg p-4 cursor-pointer transition-colors ${
                businessData.goal === goal.id
                  ? 'border-blue-500 bg-blue-50'
                  : `${getPriorityColor(goal.priority)} hover:border-gray-300`
              }`}
              onClick={() => handleInputChange('goal', goal.id)}
            >
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={goal.id}
                    name="goal"
                    type="radio"
                    checked={businessData.goal === goal.id}
                    onChange={() => handleInputChange('goal', goal.id)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <label
                    htmlFor={goal.id}
                    className={`block text-sm font-medium cursor-pointer ${
                      businessData.goal === goal.id ? 'text-blue-900' : getPriorityTextColor(goal.priority)
                    }`}
                  >
                    {goal.title}
                  </label>
                  <p className={`text-sm mt-1 ${
                    businessData.goal === goal.id ? 'text-blue-700' : 'text-gray-600'
                  }`}>
                    {goal.description}
                  </p>
                </div>
                {businessData.goal === goal.id && (
                  <FiCheck className="h-5 w-5 text-blue-600 ml-2" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {businessData.goal === 'other' && (
        <div className="animate-fadeIn">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Please describe your primary goal *
          </label>
          <textarea
            value={businessData.customGoal || ''}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('customGoal', e.target.value)}
            placeholder="Describe what you want to achieve with your business..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
          />
        </div>
      )}
    </div>
  )
}