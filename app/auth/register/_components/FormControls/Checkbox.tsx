"use client"

import React from 'react';

type Props = {
  name?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: React.ReactNode;
};

const Checkbox: React.FC<Props> = ({ name, checked, onChange, label }) => (
  <label className="flex items-start cursor-pointer">
    <input type="checkbox" name={name} checked={checked} onChange={onChange} className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
    <div className="ml-3 text-sm text-gray-700">{label}</div>
  </label>
);

export default Checkbox;
