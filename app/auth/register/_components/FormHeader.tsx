"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiTrendingUp } from 'react-icons/fi';

type Props = {
  currentStep: number;
};

/**
 * FormHeader
 * Small reusable header used by the registration steps.
 * Shows a mobile back button, a compact logo and the step title/description.
 */
export default function FormHeader({ currentStep }: Props) {
  const router = useRouter();

  return (
    <div className="text-center mb-8">
      <button onClick={() => router.push('/')} className="flex items-center text-gray-600 hover:text-gray-900 mb-6 mx-auto lg:hidden">
        <FiArrowLeft className="h-4 w-4 mr-2" />
        Back to home
      </button>

      <div className="lg:hidden flex items-center justify-center mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg mr-3">
          <FiTrendingUp className="h-6 w-6 text-white" />
        </div>
        <span className="text-xl font-bold text-gray-900">CashFlow Co-Pilot</span>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        {currentStep === 1 && "Create Your Account"}
        {currentStep === 2 && "About Your Business"}
        {currentStep === 3 && "Final Setup"}
      </h2>
      <p className="text-gray-600">
        {currentStep === 1 && "Let's start with your personal details"}
        {currentStep === 2 && "Help us understand your business better"}
        {currentStep === 3 && "Choose how you'd like to be notified"}
      </p>
    </div>
  );
}
