"use client"

import React from 'react'

export default function FinancialIllustration() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Main illustration container */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-primary/20">
        {/* Dashboard mockup */}
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded"></div>
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-primary/30 rounded-full"></div>
              <div className="w-2 h-2 bg-primary/60 rounded-full"></div>
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            </div>
          </div>

          {/* Chart area */}
          <div className="bg-background-light rounded-lg p-4 h-32 relative overflow-hidden">
            {/* Animated chart line */}
            <svg className="w-full h-full" viewBox="0 0 200 100">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--brand-teal)" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="var(--brand-teal)" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path 
                d="M 0 80 Q 50 60 100 40 T 200 20" 
                stroke="var(--brand-teal)" 
                strokeWidth="3" 
                fill="none"
                className="animate-draw-line"
              />
              <path 
                d="M 0 80 Q 50 60 100 40 T 200 20 L 200 100 L 0 100 Z" 
                fill="url(#chartGradient)"
                className="animate-fill-chart"
              />
              {/* Data points */}
              <circle cx="50" cy="60" r="4" fill="var(--brand-teal)" className="animate-bounce-point delay-500"/>
              <circle cx="100" cy="40" r="4" fill="var(--brand-teal)" className="animate-bounce-point delay-700"/>
              <circle cx="150" cy="30" r="4" fill="var(--brand-teal)" className="animate-bounce-point delay-900"/>
            </svg>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-primary/10 rounded-lg p-3 animate-slide-up delay-300">
              <div className="text-xs text-text-secondary mb-1">Cash Flow</div>
              <div className="text-lg font-bold text-primary">₦2.4M</div>
              <div className="text-xs text-green-600">↑ 12%</div>
            </div>
            <div className="bg-background-light rounded-lg p-3 animate-slide-up delay-500">
              <div className="text-xs text-text-secondary mb-1">Runway</div>
              <div className="text-lg font-bold text-text-primary">8 months</div>
              <div className="text-xs text-primary">Safe zone</div>
            </div>
          </div>

          {/* AI insight bubble */}
          <div className="bg-primary rounded-lg p-3 text-white text-sm animate-fade-in delay-1000">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-white rounded-full mt-2 animate-pulse"></div>
              <div>
                <div className="font-medium mb-1">AI Insight</div>
                <div className="text-xs opacity-90">Great time to invest in inventory. Cash flow is strong!</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-float delay-200"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary-dark/20 rounded-full animate-float delay-700"></div>
        <div className="absolute top-1/2 -right-6 w-4 h-4 bg-primary/30 rounded-full animate-float delay-1200"></div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary-dark/5 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
      <div className="absolute top-1/2 -left-12 w-16 h-16 bg-primary/3 rounded-full blur-xl animate-bounce animation-delay-2000"></div>
    </div>
  )
}