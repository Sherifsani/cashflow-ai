"use client"

import React from 'react';
import { FiCheck } from 'react-icons/fi';

type Step = { step: number; title: string; desc: string };

const steps: Step[] = [
  { step: 1, title: 'Personal Details', desc: 'Your account information' },
  { step: 2, title: 'Business Profile', desc: 'Tell us about your business' },
  { step: 3, title: 'Preferences', desc: "Customize your experience" },
];

export const ProgressSteps: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  return (
    <div className="mb-12">
      <h3 className="text-lg font-semibold mb-6">Quick Setup Process</h3>
      <div className="space-y-4">
        {steps.map((item) => (
          <div key={item.step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
              currentStep > item.step ? 'bg-green-500' : currentStep === item.step ? 'bg-white text-blue-600' : 'bg-white/20'
            }`}>
              {currentStep > item.step ? <FiCheck className="h-4 w-4" /> : item.step}
            </div>
            <div>
              <div className={`font-medium ${currentStep >= item.step ? 'text-white' : 'text-blue-200'}`}>
                {item.title}
              </div>
              <div className="text-blue-200 text-sm">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;
