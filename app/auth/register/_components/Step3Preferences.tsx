"use client"

import React from 'react';
import { FormData, Errors } from '../types';
import RadioGroup from './FormControls/RadioGroup';
import Select from './FormControls/Select';
import Checkbox from './FormControls/Checkbox';

type Props = {
  form: FormData;
  errors: Errors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

export default function Step3Preferences({ form, errors, onChange }: Props) {
  return (
    <div className="space-y-6">
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
            { value: '', label: 'Select an option' },
            { value: 'google', label: 'Google Search' },
            { value: 'social', label: 'Social Media' },
            { value: 'friend', label: 'Friend/Colleague' },
            { value: 'business_event', label: 'Business Event' },
            { value: 'ad', label: 'Advertisement' },
            { value: 'other', label: 'Other' }
          ]}
        />
      </div>

      <div className="bg-app-bg-light p-4 rounded-lg border border-app-border">
        <Checkbox
          label={<span>I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a></span>}
          checked={false}
          onChange={() => {}}
        />
      </div>
    </div>
  );
}
