"use client"

import { Eye, EyeOff } from 'lucide-react';
import React from 'react';

type Props = {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string | undefined;
    show?: boolean;
    toggleShow?: () => void;
    icon?: React.ReactNode;
};

export default function PasswordInput({ name, value, onChange, placeholder = '', error, show = false, toggleShow, icon }: Props) {
    const leftOffset = icon ? 'left-10' : 'left-3';
    const inputPadding = icon ? 'pl-10' : 'pl-3';

    return (
        <div>
            <div className="relative">

                <input
                    type={show ? 'text' : 'password'}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder=" "
                    aria-label={placeholder || name}
                    className={`peer block w-full ${inputPadding} pr-10 pb-1 pt-4 border border-border rounded-lg bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A878] ${error ? 'border-red-300 bg-red-50' : 'border-[#D1D5DB]'}`}
                />

                <label
                    htmlFor={name}
                    className={`absolute ${leftOffset} top-0 -translate-y-0 px-1 text-[#6B7280] text-sm transition-all duration-150 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#6B7280] peer-focus:top-0 peer-focus:-translate-y-0 peer-focus:text-[#00A878] peer-focus-visible:text-[#00A878] peer-focus:peer-placeholder-shown:text-sm`}
                >
                    {placeholder}
                </label>


                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#D1D5DB] peer-focus:text-[#00A878]" aria-hidden>
                        <span className="transition-colors duration-150 text-inherit">
                            {icon}
                        </span>
                    </div>
                )}

                {toggleShow && (
                    <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={toggleShow}>
                        {show ? <EyeOff className="size-5 text-black/35" /> : <Eye className="size-5 text-black/35" />}
                    </button>
                )}
            </div>

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}
