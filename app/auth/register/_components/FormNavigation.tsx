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
        <button type="button" onClick={onPrev} className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 font-medium">
          <FiArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </button>
      )}

      {currentStep < 3 ? (
        <button type="button" onClick={onNext} className="flex items-center ml-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
          Continue
          <FiArrowRight className="h-4 w-4 ml-2" />
        </button>
      ) : (
        <button type="submit" disabled={loading} className="flex items-center ml-auto bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none">
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
