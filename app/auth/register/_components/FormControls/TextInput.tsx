"use client"

import React, { useEffect, useRef } from 'react';

type Props = {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string; // used as the floating label text
    error?: string | undefined;
    type?: string;
    icon?: React.ReactNode;
    className?: string;
    autoFocus?: boolean
};

export default function TextInput({ name, value, onChange, placeholder = '', error, type = 'text', icon, className = '', autoFocus = false }: Props) {
    const leftOffset = icon ? 'left-10' : 'left-3';
    const inputPadding = icon ? 'pl-10' : 'pl-3';

    return (
        <div>
            <div className="relative">

                {/* input uses a single space placeholder so peer-placeholder-shown works for empty state */}
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder=" "
                    aria-label={placeholder || name}
                    className={`peer block w-full ${inputPadding} pr-3 pb-1 pt-4 border rounded-lg bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A878] ${error ? 'border-red-300 bg-red-50' : 'border-[#D1D5DB]'} ${className}`}
                    autoFocus={autoFocus}
                />

                <label
                    htmlFor={name}
                    className={`absolute ${leftOffset} top-0 -translate-y-0 px-1 text-[#6B7280] text-sm transition-all duration-150 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#6B7280] peer-focus:top-0 peer-focus:-translate-y-0 peer-focus:text-[#00A878] peer-focus-visible:text-[#00A878] peer-focus:peer-placeholder-shown:text-sm`}
                >
                    {placeholder}
                </label>

                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#D1D5DB] peer-focus:text-[#00A878]" aria-hidden>
                        {/* icon color: active when field has value or on focus */}
                        <span className="transition-colors duration-150 text-inherit">
                            {icon}
                        </span>
                    </div>
                )}
            </div>

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}
