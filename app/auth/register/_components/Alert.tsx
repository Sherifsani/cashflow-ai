"use client"

import React from 'react';

type Props = {
  type?: 'error' | 'info' | 'success';
  children: React.ReactNode;
};

export default function Alert({ type = 'info', children }: Props) {
  const styles = {
    error: 'bg-red-50 border border-red-200 text-red-700',
    success: 'bg-green-50 border border-green-200 text-green-700',
    info: 'bg-[#00A878]/10 border border-[#00A878]/30 text-[#00A878]',
  } as const;

  return (
    <div className={`${styles[type]} px-4 py-3 rounded-lg text-sm`}>
      {children}
    </div>
  );
}
