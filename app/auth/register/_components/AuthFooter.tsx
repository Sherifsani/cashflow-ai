"use client"

import React from 'react';

export default function AuthFooter() {
  return (
    <div className="mt-8">
      <p className="text-app-text-secondary flex justify-between">
        Already have an account?{' '}
        <a href="/auth/login" className="font-medium text-primary hover:text-primary-hover underline">Sign in here</a>
      </p>
    </div>
  );
}
