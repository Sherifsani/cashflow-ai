"use client"

import React from 'react';
import { FormData, Errors } from '../types';
import TextInput from './FormControls/TextInput';
import PasswordInput from './FormControls/PasswordInput';
import { FiUser, FiMail, FiPhone, FiLock } from 'react-icons/fi';

type Props = {
  form: FormData;
  errors: Errors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
  showConfirmPassword: boolean;
  toggleShowConfirmPassword: () => void;
};

export default function Step1Personal({ form, errors, onChange, showPassword, toggleShowPassword, showConfirmPassword, toggleShowConfirmPassword }: Props) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
          <TextInput
            name="firstName"
            value={form.firstName}
            onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
            placeholder="John"
            error={errors.firstName}
            icon={<FiUser className="h-5 w-5 text-gray-400" />}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
          <TextInput
            name="lastName"
            value={form.lastName}
            onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
            placeholder="Doe"
            error={errors.lastName}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
        <TextInput
          name="email"
          type="email"
          value={form.email}
          onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
          placeholder="john@businessname.com"
          error={errors.email}
          icon={<FiMail className="h-5 w-5 text-gray-400" />}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
        <TextInput
          name="phone"
          type="tel"
          value={form.phone}
          onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
          placeholder="+234 801 234 5678"
          error={errors.phone}
          icon={<FiPhone className="h-5 w-5 text-gray-400" />}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
        <PasswordInput
          name="password"
          value={form.password}
          onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
          placeholder="Create a strong password"
          error={errors.password}
          show={showPassword}
          toggleShow={toggleShowPassword}
          icon={<FiLock className="h-5 w-5 text-gray-400" />}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
        <PasswordInput
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
          placeholder="Confirm your password"
          error={errors.confirmPassword}
          show={showConfirmPassword}
          toggleShow={toggleShowConfirmPassword}
          icon={<FiLock className="h-5 w-5 text-gray-400" />}
        />
      </div>
    </div>
  );
}
