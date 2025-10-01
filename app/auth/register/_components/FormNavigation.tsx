"use client"

import React from 'react';
import { FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi';

type Props = {
  currentStep: number;
  loading: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export default function FormNavigation({ currentStep, loading, onPrev, onNext }: Props) {
  return (
    <div className="flex justify-between pt-6">
      {currentStep > 1 && (
        <button type="button" onClick={onPrev} className="w-full flex justify-center items-center px-6 py-3 text-[#6B7280] hover:text-[#1F2937] font-medium">
          <FiArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </button>
      )}

      {currentStep < 3 ? (
        <button type="button" onClick={onNext} className="bg-[#00A878] w-full flex justify-center items-center ml-auto text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#008f68] hover:shadow-lg transform hover:scale-105 transition-all">
          Continue
          <FiArrowRight className="h-4 w-4 ml-2" />
        </button>
      ) : (
        <button type="submit" disabled={loading} className="bg-[#00A878] w-full flex justify-center items-center ml-auto text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#008f68] hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none">
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Creating Account...
            </>
          ) : (
            <>
              Start Free Trial
              <FiCheck className="h-4 w-4 ml-2" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
