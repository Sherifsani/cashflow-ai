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
            <div>
                <TextInput
                    name="firstName"
                    value={form.firstName}
                    onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
                    placeholder="First Name"
                    error={errors.firstName}
                    icon={<FiUser className="size-5 text-inherit" />}
                    autoFocus
                />
            </div>

            <div>
                <TextInput
                    name="lastName"
                    value={form.lastName}
                    onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
                    placeholder="Last Name"
                    error={errors.lastName}
                    icon={<FiUser className="size-5 text-inherit" />}
                />
            </div>

            <div>
                <TextInput
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
                    placeholder="Email Address"
                    error={errors.email}
                    icon={<FiMail className="size-5 text-inherit" />}
                />
            </div>

            {/* <div>
                <TextInput
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
                    placeholder="Phone Number"
                    error={errors.phone}
                    icon={<FiPhone className="size-5 text-inherit" />}
                />
            </div> */}

            <div>
                <PasswordInput
                    name="password"
                    value={form.password}
                    onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
                    placeholder="Password"
                    error={errors.password}
                    show={showPassword}
                    toggleShow={toggleShowPassword}
                    icon={<FiLock className="size-5 text-inherit" />}
                />
            </div>

            <div>
                <PasswordInput
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
                    placeholder="Confirm Password"
                    error={errors.confirmPassword}
                    show={showConfirmPassword}
                    toggleShow={toggleShowConfirmPassword}
                    icon={<FiLock className="size-5 text-inherit" />}
                />
            </div>
        </div>
    );
}
