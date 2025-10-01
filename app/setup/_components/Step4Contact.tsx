"use client"

import React from 'react'
import { FiPhone, FiMail, FiMessageSquare } from 'react-icons/fi'
import { BusinessData } from '../types'

interface Props {
  businessData: BusinessData;
  handleInputChange: (field: keyof BusinessData, value: string | boolean) => void;
}

export default function Step4Contact({ businessData, handleInputChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
        <div className="flex items-start">
          <FiPhone className="h-5 w-5 text-primary mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium text-text-primary">Stay connected to your business</h3>
            <p className="text-sm text-text-secondary mt-1">
              Choose how you'd like to receive updates about your cash flow and business insights.
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Phone Number *
        </label>
        <p className="text-xs text-text-secondary mb-2">We'll use this for important account notifications</p>
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-500">+234</span>
          <input
            type="tel"
            value={businessData.phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('phone', e.target.value)}
            placeholder="8012345678"
            className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Notification Preferences</h3>
        
        <div className="bg-background-light p-4 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <FiMessageSquare className="h-5 w-5 text-primary mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-text-primary">WhatsApp Alerts</h4>
                <p className="text-sm text-text-secondary mt-1">
                  Get instant notifications for low cash alerts, payment reminders, and weekly summaries
                </p>
                <p className="text-xs text-primary mt-1 font-medium">
                  Recommended for Nigerian businesses
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={businessData.whatsappAlerts}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('whatsappAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        <div className="bg-background-light p-4 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <FiMail className="h-5 w-5 text-primary mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-text-primary">Email Reports</h4>
                <p className="text-sm text-text-secondary mt-1">
                  Receive detailed weekly and monthly financial reports with insights and recommendations
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={businessData.emailReports}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('emailReports', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-start">
          <FiPhone className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900">Privacy & Security</h3>
            <p className="text-sm text-blue-700 mt-1">
              Your contact information is encrypted and never shared with third parties. 
              You can update these preferences anytime in your account settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}