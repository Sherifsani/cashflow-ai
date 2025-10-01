"use client"

import React, { useEffect, useRef, useState } from 'react'
import { FiTrendingUp, FiCheck, FiArrowRight } from 'react-icons/fi'
import FinancialIllustration from './FinancialIllustration'
import ScrollAnimation from './ScrollAnimation'

export default function LandingHero() {
  const heroRef = useRef<HTMLElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={heroRef} className="relative bg-background-light py-16 md:py-24 overflow-hidden">
      {/* Parallax background elements */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-dark/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <ScrollAnimation className="flex-1" delay={200}>
          <div style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-6 leading-tight">
              AI-powered <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">cashflow forecasting</span> for Nigerian SMEs
            </h1>
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              CashFlow Co-Pilot helps you predict, plan, and grow your business with smart financial insights. No spreadsheets, no stress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href="/auth/register" className="group bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center transform hover:scale-105 hover:shadow-xl">
                Get Started Free 
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#features" className="bg-white border-2 border-primary text-primary font-semibold px-8 py-4 rounded-lg shadow hover:bg-background-light transition-all duration-300 flex items-center justify-center hover:shadow-lg">
                See Features
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <FiCheck className="text-primary" /> No card required
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <FiCheck className="text-primary" /> 100% secure & private
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <FiCheck className="text-primary" /> Built for Nigerian businesses
              </div>
            </div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation className="flex-1 flex justify-center items-center" delay={600}>
          <div style={{ transform: `translateY(${scrollY * -0.1}px)` }}>
            <FinancialIllustration />
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
