"use client"

import React from 'react'
import { FiCheck } from 'react-icons/fi'
import ScrollAnimation from './ScrollAnimation'

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    features: [
      'Unlimited cashflow tracking',
      'AI-powered insights',
      'Email & WhatsApp alerts',
      'Upload bank statements',
      'Basic support'
    ],
    cta: 'Get Started',
    link: '/auth/register',
    highlight: false
  },
  {
    name: 'Pro',
    price: '₦2,500/mo',
    features: [
      'All Starter features',
      'Advanced forecasting',
      'Priority support',
      'Goal tracking',
      'Export to Excel'
    ],
    cta: 'Upgrade',
    link: '/auth/register',
    highlight: true
  }
]

export default function LandingPricing() {
  return (
    <section id="pricing" className="py-16 bg-background-light">
      <div className="max-w-4xl mx-auto px-4">
        <ScrollAnimation delay={200}>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8 text-center">
            Simple, transparent pricing
          </h2>
        </ScrollAnimation>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, i) => (
            <ScrollAnimation key={i} delay={400 + (i * 200)}>
              <div className={`rounded-xl shadow border border-primary/10 bg-white p-8 flex flex-col items-start transition-all duration-300 hover:shadow-xl hover:scale-105 ${plan.highlight ? 'ring-2 ring-primary' : ''}`}>
              <h3 className="text-xl font-bold text-text-primary mb-2">{plan.name}</h3>
              <div className="text-3xl font-extrabold text-primary mb-4">{plan.price}</div>
              <ul className="mb-6 space-y-2">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-text-secondary">
                    <FiCheck className="text-primary" /> {f}
                  </li>
                ))}
              </ul>
              <a href={plan.link} className={`w-full text-center py-3 rounded-lg font-semibold transition-colors shadow ${plan.highlight ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-background-light text-primary hover:bg-primary/20'}`}>{plan.cta}</a>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
