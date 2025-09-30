"use client"

import React from 'react';
import { FiTrendingUp } from 'react-icons/fi';
import ProgressSteps from './ProgressSteps';
import BenefitList from './BenefitList';
import Testimonial from './Testimonial';

export const BrandingPanel: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  return (
    <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-12 flex-col justify-between text-white relative overflow-y-scro">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center mb-12">
          <div className="bg-white/20 p-3 rounded-xl mr-4">
            <FiTrendingUp className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">CashFlow Co-Pilot</h1>
            <p className="text-blue-200">Join 500+ Nigerian SMEs</p>
          </div>
        </div>

        <ProgressSteps currentStep={currentStep} />

        <BenefitList />
      </div>

      <Testimonial />
    </div>
  );
};

export default BrandingPanel;
