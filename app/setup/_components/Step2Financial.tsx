"use client"

import React from 'react'
import { FiDollarSign, FiCheck } from 'react-icons/fi'
import { BusinessData } from '../types'

interface Props {
  businessData: BusinessData;
  handleInputChange: (field: keyof BusinessData, value: string | boolean) => void;
  formatCurrency: (amount: string) => string;
  calculateRunwayMonths: () => number;
  calculateMonthlyProfit: () => number;
  calculateProfitMargin: () => number;
}

export default function Step2Financial({ 
  businessData, 
  handleInputChange, 
  formatCurrency, 
  calculateRunwayMonths, 
  calculateMonthlyProfit, 
  calculateProfitMargin 
}: Props) {
  return (
    <div className="space-y-6">
      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
        <div className="flex items-start">
          <FiDollarSign className="h-5 w-5 text-primary mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium text-text-primary">Your money stays safe!</h3>
            <p className="text-sm text-text-secondary mt-1">
              We only track your finances - your money remains in your bank account.
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Starting Balance (Current cash in bank) *
        </label>
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-500">₦</span>
          <input
            type="number"
            value={businessData.startingBalance}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('startingBalance', e.target.value)}
            placeholder="100,000"
            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Capital Allocation Section */}
      <div className="bg-background-light p-4 rounded-lg border border-gray-200">
        <h4 className="font-medium text-text-primary mb-2">How will you use your starting capital?</h4>
        <p className="text-sm text-text-secondary mb-3">
          Understanding how you plan to spend your ₦{formatCurrency(businessData.startingBalance)} helps us track your cash runway.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Expected Monthly Expenses *
        </label>
        <p className="text-xs text-gray-500 mb-2">How much do you expect to spend per month on rent, supplies, salaries, etc.?</p>
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-500">₦</span>
          <input
            type="number"
            value={businessData.monthlyExpenses}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('monthlyExpenses', e.target.value)}
            placeholder="50,000"
            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Expected Monthly Revenue (Optional)
        </label>
        <p className="text-xs text-gray-500 mb-2">Once your business is running, how much do you expect to earn monthly? (You can update this later)</p>
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-500">₦</span>
          <input
            type="number"
            value={businessData.monthlyRevenue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('monthlyRevenue', e.target.value)}
            placeholder="100,000"
            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {businessData.startingBalance && businessData.monthlyExpenses && (
        <div className="bg-primary/10 p-4 rounded-lg border border-primary/30">
          <div className="flex items-center">
            <FiCheck className="h-5 w-5 text-primary mr-3" />
            <div>
              <h3 className="font-medium text-text-primary">
                Cash Runway: {calculateRunwayMonths()} months
              </h3>
              <p className="text-sm text-text-secondary">
                Your ₦{formatCurrency(businessData.startingBalance)} can cover expenses for about {calculateRunwayMonths()} months
              </p>
            </div>
          </div>
        </div>
      )}

      {businessData.monthlyRevenue && businessData.monthlyExpenses && parseFloat(businessData.monthlyRevenue) > parseFloat(businessData.monthlyExpenses) && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <FiCheck className="h-5 w-5 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-blue-900">
                Projected Monthly Profit: ₦{calculateMonthlyProfit().toLocaleString()}
              </h3>
              <p className="text-sm text-blue-700">
                {calculateProfitMargin().toFixed(1)}% projected profit margin
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}