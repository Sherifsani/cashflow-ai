"use client"

import React, {         <ScrollAnimation delay={300}>
          <div className="space-y-6">seState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

const faqs = [
  {
    q: 'Is my data safe?',
    a: 'Yes! Your data is encrypted and never shared. You control your privacy.'
  },
  {
    q: 'Do I need to connect my bank account?',
    a: 'No, you can upload statements or enter data manually. Connecting is optional.'
  },
  {
    q: 'Is it really free?',
    a: 'Yes, you can start for free. Premium features are optional.'
  },
  {
    q: 'Does it work for any business?',
    a: 'CashFlow Co-Pilot is built for Nigerian SMEs, but works for most small businesses.'
  }
]

export default function LandingFAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-primary/10 rounded-xl bg-background-light">
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-medium text-text-primary">{faq.q}</span>
                <FiChevronDown className={`h-5 w-5 text-primary transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-6 pb-4 text-text-secondary text-sm animate-fadeIn">
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
