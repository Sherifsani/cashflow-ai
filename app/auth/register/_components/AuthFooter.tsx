"use client"

import React from 'react';

export default function AuthFooter() {
  return (
    <div className="mt-8 text-center">
      <p className="text-gray-600">
        Already have an account?{' '}
        <a href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">Sign in here</a>
      </p>
    </div>
  );
}
