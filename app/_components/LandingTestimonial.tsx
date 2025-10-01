"use client"

import React from 'react'
import { FiStar } from 'react-icons/fi'
import ScrollAnimation from './ScrollAnimation'

export default function LandingTestimonial() {
  const testimonials = [
    {
      name: "Adaora Okeke",
      role: "Restaurant Owner, Lagos",
      company: "Mama's Kitchen",
      avatar: "A",
      rating: 5,
      quote: "CashFlow Co-Pilot saved my restaurant. I finally know when I can afford to buy ingredients without running out of cash for salaries. My stress levels dropped 80%!",
      metric: "Increased profit margin by 15%"
    },
    {
      name: "Emeka Okafor", 
      role: "Electronics Retailer, Abuja",
      company: "TechHub Electronics",
      avatar: "E",
      rating: 5,
      quote: "The WhatsApp alerts are perfect! I get warned about cash shortages 2 weeks before they happen. No more emergency loans or sleepless nights.",
      metric: "Avoided ₦500K in emergency loans"
    }
  ]

  return (
    <section className="py-20 bg-background-light">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Trusted by <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">Nigerian SMEs</span>
            </h2>
            <p className="text-xl text-text-secondary">Real stories from real business owners who transformed their cash flow</p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <ScrollAnimation key={index} delay={300 * (index + 1)}>
              <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-t-4 border-primary">
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-text-secondary text-lg leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>

                <div className="bg-primary/10 p-3 rounded-lg mb-6 border border-primary/20">
                  <div className="text-primary font-semibold text-sm">🎯 Result: {testimonial.metric}</div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-text-primary">{testimonial.name}</div>
                    <div className="text-text-secondary text-sm">{testimonial.role}</div>
                    <div className="text-primary text-xs font-semibold">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}