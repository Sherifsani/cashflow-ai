"use client"

import React from 'react';
import { FiCheck } from 'react-icons/fi';

const benefits = [
//   "14-day free trial (no credit card required)",
  "Instant cash flow forecasting",
  "WhatsApp alerts for cash shortages",
  "AI-powered business insights",
];

export const BenefitList: React.FC = () => (
  <div className="space-y-4">
    <h4 className="font-semibold">What you'll get:</h4>
    {benefits.map((benefit, index) => (
      <div key={index} className="flex items-center text-blue-100 text-sm">
        <FiCheck className="h-4 w-4 mr-2 text-green-400" />
        {benefit}
      </div>
    ))}
  </div>
);

export default BenefitList;
