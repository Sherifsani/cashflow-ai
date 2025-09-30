"use client"

import React from 'react';

type Props = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string | undefined;
  type?: string;
  icon?: React.ReactNode;
  className?: string;
};

const TextInput: React.FC<Props> = ({ name, value, onChange, placeholder, error, type = 'text', icon, className = '' }) => {
  return (
    <div>
      <div className="relative">
        {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`block w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-300 bg-red-50' : 'border-gray-300'} ${className}`}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default TextInput;
