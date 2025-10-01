"use client"

import React from 'react'
import { FiBarChart, FiShield, FiZap, FiUpload, FiMessageCircle, FiTarget } from 'react-icons/fi'
import ScrollAnimation from './ScrollAnimation'

const features = [
  {
    icon: <FiBarChart className="h-6 w-6 text-primary" />,
    title: 'Smart Forecasting',
    desc: 'AI predicts your cashflow and helps you plan ahead with 94% accuracy.',
    highlight: true
  },
  {
    icon: <FiMessageCircle className="h-6 w-6 text-primary" />,
    title: 'WhatsApp Alerts',
    desc: 'Get instant notifications when cash is running low.',
    highlight: true
  },
  {
    icon: <FiShield className="h-6 w-6 text-primary" />,
    title: 'Bank-level Security',
    desc: 'Your data is encrypted and never shared with anyone.'
  },
  {
    icon: <FiZap className="h-6 w-6 text-primary" />,
    title: 'Instant Insights',
    desc: 'Get actionable tips to grow your business faster.'
  },
  {
    icon: <FiUpload className="h-6 w-6 text-primary" />,
    title: 'Easy Data Import',
    desc: 'Upload bank statements or connect accounts easily.'
  },
  {
    icon: <FiTarget className="h-6 w-6 text-primary" />,
    title: 'Goal Tracking',
    desc: 'Set business goals and track your progress daily.'
  }
]

export default function LandingFeatures() {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <ScrollAnimation delay={200}>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8 text-center">
            Features built for Nigerian SMEs
          </h2>
        </ScrollAnimation>
        
        {/* Clean Equal Height Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <ScrollAnimation key={i} delay={i * 100}>
              <div className={`
                group rounded-xl p-6 shadow-lg hover:shadow-xl border
                transition-all duration-300 transform hover:scale-105 
                flex flex-col h-full
                ${f.highlight ? 
                  'bg-gradient-to-br from-primary/5 to-primary/10 border-primary/30 shadow-primary/10' : 
                  'bg-background-light border-primary/10'
                }
              `}>
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-text-primary mb-3 group-hover:text-primary transition-colors duration-300">
                  {f.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed flex-grow">
                  {f.desc}
                </p>
                {f.highlight && (
                  <div className="mt-4 flex items-center text-xs text-primary font-medium">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    Key Feature
                  </div>
                )}
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
