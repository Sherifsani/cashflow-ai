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
    <input type="checkbox" name={name} checked={checked} onChange={onChange} className="mt-1 h-4 w-4 text-primary border-app-border rounded focus:ring-primary" />
    <div className="ml-3 text-sm text-app-text-primary">{label}</div>
  </label>
);

export default Checkbox;
