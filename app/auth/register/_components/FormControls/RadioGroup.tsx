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
        <input type="radio" name={name} value={opt.value} checked={value === opt.value} onChange={onChange} className="mt-1 h-4 w-4 text-[#00A878] border-[#D1D5DB] focus:ring-[#00A878]" />
        <div className="ml-3">
          <div className="font-medium text-[#1F2937]">{opt.label}</div>
          {opt.desc && <div className="text-sm text-[#6B7280]">{opt.desc}</div>}
        </div>
      </label>
    ))}
  </div>
);

export default RadioGroup;
