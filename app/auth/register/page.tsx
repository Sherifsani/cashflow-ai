"use client"

import React, { useState } from 'react';
import { FormData, Errors } from './types';
import { useRouter } from 'next/navigation';
import { FiMail, FiLock, FiUser, FiPhone, FiBriefcase, FiMapPin, FiArrowLeft, FiCheck, FiArrowRight, FiTrendingUp } from "react-icons/fi";
import BrandingPanel from './_components/BrandingPanel';
import Step1Personal from './_components/Step1Personal';
import Step2Business from './_components/Step2Business';
import Step3Preferences from './_components/Step3Preferences';
import useRegisterForm from './_hooks/useRegisterForm';
import FormHeader from './_components/FormHeader';
import FormNavigation from './_components/FormNavigation';
import Alert from './_components/Alert';
import AuthFooter from './_components/AuthFooter';

const Register = () => {
  const {
    formData,
    errors,
    loading,
    currentStep,
    showPassword,
    showConfirmPassword,
    handleInputChange,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
    toggleShowPassword,
    toggleShowConfirmPassword,
    businessTypes,
    revenueRanges,
    employeeCounts,
  } = useRegisterForm();

  const router = useRouter();

  return (
    <div className="max-h-scr grid grid-cols-2">
      <BrandingPanel currentStep={currentStep} />

      <div className="bg-brand-gray-light flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 overflow-y-scro">
        <div className="bg-brand-gray-light max-w-lg w-full mx-auto">
          <FormHeader currentStep={currentStep} />

          <form onSubmit={handleSubmit} className="bg-brand-gray-light space-y-6">
            {errors.submit && (
              <Alert type="error">{errors.submit}</Alert>
            )}

            {currentStep === 1 && (
              <Step1Personal
                form={formData}
                errors={errors}
                onChange={handleInputChange}
                showPassword={showPassword}
                toggleShowPassword={toggleShowPassword}
                showConfirmPassword={showConfirmPassword}
                toggleShowConfirmPassword={toggleShowConfirmPassword}
              />
            )}

            {currentStep === 2 && (
              <Step2Business
                form={formData}
                errors={errors}
                onChange={handleInputChange}
                businessTypes={businessTypes}
                revenueRanges={revenueRanges}
                employeeCounts={employeeCounts}
              />
            )}

            {currentStep === 3 && (
              <Step3Preferences
                form={formData}
                errors={errors}
                onChange={handleInputChange}
              />
            )}

            <FormNavigation currentStep={currentStep} loading={loading} onPrev={handlePrevStep} onNext={handleNextStep} />
          </form>

          <AuthFooter />
        </div>
      </div>
    </div>
  );
};

export default Register;
