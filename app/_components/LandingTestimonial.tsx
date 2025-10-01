"use client"

import React from 'react'
import { FiStar } from 'react-icons/fi'

export default function LandingTestimonial() {
  return (
    <section id="testimonials" className="py-16 bg-background-light">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8 text-center">
          What Nigerian business owners say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow p-6 border border-primary/10">
            <div className="flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => <FiStar key={i} className="text-primary" />)}
              <span className="font-semibold text-text-primary ml-2">5.0</span>
            </div>
            <p className="text-text-secondary mb-4">“CashFlow Co-Pilot helped me finally understand my business cashflow. The AI insights are spot on!”</p>
            <div className="flex items-center gap-2">
              <img src="/2.jpg" alt="Ada" className="h-8 w-8 rounded-full" />
              <span className="font-medium text-text-primary">Ada, Lagos</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border border-primary/10">
            <div className="flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => <FiStar key={i} className="text-primary" />)}
              <span className="font-semibold text-text-primary ml-2">5.0</span>
            </div>
            <p className="text-text-secondary mb-4">“I love how easy it is to use. No more spreadsheets, just simple dashboards and alerts.”</p>
            <div className="flex items-center gap-2">
              <img src="/one.jpg" alt="Chinedu" className="h-8 w-8 rounded-full" />
              <span className="font-medium text-text-primary">Chinedu, Abuja</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
