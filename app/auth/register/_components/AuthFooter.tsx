"use client"

import React from 'react';

export default function AuthFooter() {
  return (
    <div className="mt-8">
      <p className="text-[#6B7280] flex justify-between">
        Already have an account?{' '}
        <a href="/auth/login" className="font-medium text-[#00A878] hover:text-[#008f68] underline">Sign in here</a>
      </p>
    </div>
  );
}
