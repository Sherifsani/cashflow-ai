"use client"

import React from 'react'
import { FiBriefcase, FiMapPin } from 'react-icons/fi'
import { BusinessData, BusinessType } from '../types'

interface Props {
  businessData: BusinessData;
  businessTypes: BusinessType[];
  handleInputChange: (field: keyof BusinessData, value: string | boolean) => void;
}

export default function Step1Business({ businessData, businessTypes, handleInputChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business Name *
        </label>
        <div className="relative">
          <FiBriefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={businessData.businessName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('businessName', e.target.value)}
            placeholder="e.g., Ada's Coffee Shop"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Business Type *
        </label>
        <div className="grid grid-cols-2 gap-3">
          {businessTypes.map((type: BusinessType) => (
            <button
              key={type.id}
              onClick={() => handleInputChange('businessType', type.id)}
              className={`flex items-center p-3 rounded-lg border-2 transition-colors ${
                businessData.businessType === type.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="mr-3 text-xl">{type.icon}</span>
              <span className="text-sm font-medium">{type.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location *
        </label>
        <div className="relative">
          <FiMapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={businessData.location}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('location', e.target.value)}
            placeholder="e.g., Lagos, Nigeria"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  )
}