"use client"

import React from 'react'
import { FiArrowRight, FiCheck, FiShield, FiZap } from 'react-icons/fi'
import ScrollAnimation from './ScrollAnimation'

export default function LandingCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary via-primary-dark to-primary text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <ScrollAnimation>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Take Control of Your Cash Flow?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join 500+ Nigerian SMEs who never worry about running out of cash again. Start your free trial today.
          </p>
        </ScrollAnimation>

        <ScrollAnimation delay={300}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <a 
              href="/auth/register"
              className="group bg-white text-primary px-8 py-4 rounded-lg text-lg font-bold hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center"
            >
              Start Your Free Trial
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <button className="group border-2 border-white/50 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-primary transition-all backdrop-blur-sm">
              Schedule Demo
            </button>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={600}>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <FiCheck className="h-6 w-6 text-white mb-2" />
              <span className="text-white/80">No credit card required</span>
            </div>
            <div className="flex flex-col items-center">
              <FiShield className="h-6 w-6 text-white mb-2" />
              <span className="text-white/80">Bank-level security</span>
            </div>
            <div className="flex flex-col items-center">
              <FiZap className="h-6 w-6 text-white mb-2" />
              <span className="text-white/80">Setup in 5 minutes</span>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}