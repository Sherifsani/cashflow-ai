"use client"

import React from 'react';
import { FormData, Errors } from '../types';
import RadioGroup from './FormControls/RadioGroup';
import Select from './FormControls/Select';
import { FiDollarSign } from 'react-icons/fi';

type Props = {
  form: FormData;
  errors: Errors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

export default function Step3Preferences({ form, errors, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="startingBalance" className="block text-sm font-semibold text-gray-700 mb-2">
          Current Cash Balance (₦)
        </label>
        <div className="relative">
          <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            id="startingBalance"
            name="startingBalance"
            value={form.startingBalance}
            onChange={onChange}
            placeholder="Enter current cash balance"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        {errors.startingBalance && <p className="mt-1 text-sm text-red-600">{errors.startingBalance}</p>}
      </div>

      <div>
        <label htmlFor="expectedMonthlyExpense" className="block text-sm font-semibold text-gray-700 mb-2">
          Expected Monthly Expenses (₦) - Optional
        </label>
        <div className="relative">
          <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            id="expectedMonthlyExpense"
            name="expectedMonthlyExpense"
            value={form.expectedMonthlyExpense}
            onChange={onChange}
            placeholder="Enter monthly expenses (optional)"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        {errors.expectedMonthlyExpense && <p className="mt-1 text-sm text-red-600">{errors.expectedMonthlyExpense}</p>}
      </div>

      <div>
        <Select
          name="financialGoals"
          value={form.financialGoals}
          onChange={(e) => onChange(e as React.ChangeEvent<HTMLSelectElement>)}
          options={[
            { value: '', label: 'Select your primary financial goal' },
            { value: 'Increase revenue by 20%', label: 'Increase revenue by 20%' },
            { value: 'Reduce expenses by 15%', label: 'Reduce expenses by 15%' },
            { value: 'Improve cash flow', label: 'Improve cash flow' },
            { value: 'Build emergency fund', label: 'Build emergency fund' },
            { value: 'Expand business operations', label: 'Expand business operations' },
            { value: 'Pay off business debt', label: 'Pay off business debt' },
            { value: 'Increase profit margins', label: 'Increase profit margins' },
            { value: 'Other', label: 'Other' }
          ]}
        />
        {errors.financialGoals && <p className="mt-1 text-sm text-red-600">{errors.financialGoals}</p>}
      </div>

      <div>
        <div className="mb-4 text-sm font-semibold text-gray-700">How would you like to receive cash flow alerts?</div>
        <RadioGroup
          name="alertPreference"
          value={form.alertPreference}
          onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
          options={[
            { value: 'whatsapp', label: 'WhatsApp (Recommended)', desc: 'Get instant alerts on your phone' },
            { value: 'email', label: 'Email', desc: 'Receive alerts in your inbox' },
            { value: 'both', label: 'Both WhatsApp & Email', desc: 'Maximum coverage' }
          ]}
        />
      </div>

      <div>
        <Select
          name="hearAboutUs"
          value={form.hearAboutUs}
          onChange={(e) => onChange(e as React.ChangeEvent<HTMLSelectElement>)}
          options={[
            { value: '', label: 'How did you hear about us?' },
            { value: 'google', label: 'Google Search' },
            { value: 'social', label: 'Social Media' },
            { value: 'friend', label: 'Friend/Colleague' },
            { value: 'business_event', label: 'Business Event' },
            { value: 'ad', label: 'Advertisement' },
            { value: 'other', label: 'Other' }
          ]}
        />
      </div>
    </div>
  );
}
