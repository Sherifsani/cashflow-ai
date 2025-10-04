"use client"

import React from 'react';
import { FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi';

type Props = {
  currentStep: number;
  loading: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function FormNavigation({ currentStep, loading, onPrev, onNext, onSubmit }: Props) {
  return (
    <div className="flex justify-between pt-6">
      {currentStep > 1 && (
        <button type="button" onClick={onPrev} className="w-full flex justify-center items-center px-6 py-3 text-app-text-secondary hover:text-app-text-primary font-medium">
          <FiArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </button>
      )}

      {currentStep < 3 ? (
        <button type="button" onClick={onNext} className="bg-primary w-full flex justify-center items-center ml-auto text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-hover hover:shadow-lg transform hover:scale-105 transition-all">
          Continue
          <FiArrowRight className="h-4 w-4 ml-2" />
        </button>
      ) : (
        <button type="button" onClick={onSubmit} disabled={loading} className="bg-primary w-full flex justify-center items-center ml-auto text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-hover hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none">
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
