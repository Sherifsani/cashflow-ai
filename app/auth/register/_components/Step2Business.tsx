"use client"

import React from 'react';
import { FormData, Errors } from '../types';
import TextInput from './FormControls/TextInput';
import Select from './FormControls/Select';
import { FiBriefcase, FiMapPin } from 'react-icons/fi';

type Props = {
  form: FormData;
  errors: Errors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  businessTypes: string[];
  revenueRanges: string[];
  employeeCounts: string[];
};

export default function Step2Business({ form, errors, onChange, businessTypes, revenueRanges, employeeCounts }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <TextInput
          name="businessName"
          value={form.businessName}
          onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
          placeholder="Business Name"
          error={errors.businessName}
          icon={<FiBriefcase className="h-5 w-5 text-gray-400" />}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Business Type</label>
        <Select
          name="businessType"
          value={form.businessType}
          onChange={(e) => onChange(e as React.ChangeEvent<HTMLSelectElement>)}
          options={[{ value: '', label: 'Select your business type' }, ...businessTypes.map(t => ({ value: t, label: t }))]}
          error={errors.businessType}
        />
      </div>

      <div>
        <TextInput
          name="businessLocation"
          value={form.businessLocation}
          onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
          placeholder="Business Location"
          error={errors.businessLocation}
          icon={<FiMapPin className="h-5 w-5 text-gray-400" />}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Revenue</label>
        <Select
          name="monthlyRevenue"
          value={form.monthlyRevenue}
          onChange={(e) => onChange(e as React.ChangeEvent<HTMLSelectElement>)}
          options={[{ value: '', label: 'Select monthly revenue range' }, ...revenueRanges.map(r => ({ value: r, label: r }))]}
          error={errors.monthlyRevenue}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Team Size</label>
        <Select
          name="employeeCount"
          value={form.employeeCount}
          onChange={(e) => onChange(e as React.ChangeEvent<HTMLSelectElement>)}
          options={[{ value: '', label: 'Select team size' }, ...employeeCounts.map(r => ({ value: r, label: r }))]}
          error={errors.employeeCount}
        />
      </div>
    </div>
  );
}
