"use client"

import React, { useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import ScrollAnimation from './ScrollAnimation'

const faqs = [
  {
    q: 'Is my data safe?',
    a: 'Yes! Your data is encrypted and never shared. You control your privacy.'
  },
  {
    q: 'Do I need to connect my bank account?',
    a: 'No! You can manually enter data or upload files. Bank connection is optional.'
  },
  {
    q: 'Is it really free?',
    a: '14-day free trial, no credit card required. Cancel anytime.'
  },
  {
    q: 'Does it work for any business?',
    a: 'Perfect for restaurants, retail, services, e-commerce - any SME with cash flow needs.'
  }
]

export default function LandingFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-text-secondary">Everything you need to know about CashFlow Co-Pilot</p>
          </div>
        </ScrollAnimation>
        
        <ScrollAnimation delay={300}>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-background-light transition-colors"
                  onClick={() => setOpen(open === index ? null : index)}
                >
                  <span className="font-semibold text-text-primary">{faq.q}</span>
                  {open === index ? (
                    <FiChevronUp className="text-primary" />
                  ) : (
                    <FiChevronDown className="text-primary" />
                  )}
                </button>
                {open === index && (
                  <div className="px-6 pb-4 text-text-secondary">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}