"use client"

import React from 'react';

type Option = { value: string; label: string; desc?: string };

type Props = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: Option[];
};

const RadioGroup: React.FC<Props> = ({ name, value, onChange, options }) => (
  <div className="space-y-3">
    {options.map(opt => (
      <label key={opt.value} className="flex items-start cursor-pointer">
        <input type="radio" name={name} value={opt.value} checked={value === opt.value} onChange={onChange} className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
        <div className="ml-3">
          <div className="font-medium text-gray-900">{opt.label}</div>
          {opt.desc && <div className="text-sm text-gray-600">{opt.desc}</div>}
        </div>
      </label>
    ))}
  </div>
);

export default RadioGroup;
