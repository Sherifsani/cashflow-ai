"use client"

import React from 'react'
import { FiBarChart, FiShield, FiZap, FiUpload, FiMessageCircle, FiTarget } from 'react-icons/fi'
import ScrollAnimation from './ScrollAnimation'

const features = [
  {
    icon: <FiBarChart className="h-6 w-6 text-primary" />,
    title: 'Smart Forecasting',
    desc: 'AI predicts your cashflow and helps you plan ahead.'
  },
  {
    icon: <FiShield className="h-6 w-6 text-primary" />,
    title: 'Bank-level Security',
    desc: 'Your data is encrypted and never shared.'
  },
  {
    icon: <FiZap className="h-6 w-6 text-primary" />,
    title: 'Instant Insights',
    desc: 'Get actionable tips to grow your business.'
  },
  {
    icon: <FiUpload className="h-6 w-6 text-primary" />,
    title: 'Easy Data Import',
    desc: 'Upload bank statements or connect accounts.'
  },
  {
    icon: <FiMessageCircle className="h-6 w-6 text-primary" />,
    title: 'Personalized Support',
    desc: 'Chat with our AI agent for help anytime.'
  },
  {
    icon: <FiTarget className="h-6 w-6 text-primary" />,
    title: 'Goal Tracking',
    desc: 'Set business goals and track your progress.'
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <ScrollAnimation key={i} delay={i * 100}>
              <div className="group bg-background-light rounded-xl p-6 shadow hover:shadow-xl border border-primary/10 transition-all duration-300 transform hover:scale-105 flex flex-col items-start">
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                <h3 className="font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors duration-300">{f.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
