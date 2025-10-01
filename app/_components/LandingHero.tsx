"use client"

import React from 'react'
import { FiTrendingUp, FiCheck, FiArrowRight } from 'react-icons/fi'

export default function LandingHero() {
    return (
        <section className="relative bg-background-light py-16 md:py-24 overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 animate-fadeIn">
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
                <div className="flex-1 flex justify-center items-center relative">
                    <div className="relative w-full max-w-md">
                        {/* Animated floating elements */}
                        <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse" />
                        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary-dark/10 rounded-full blur-2xl animate-pulse animation-delay-1000" />
                        <div className="absolute top-1/2 -left-12 w-16 h-16 bg-primary/5 rounded-full blur-xl animate-bounce animation-delay-2000" />
                        <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                            {/* <img src="/Logo.png" alt="CashFlow Co-Pilot Logo" className="w-full rounded-xl shadow-2xl border border-primary/20" /> */}
                            <div className="bg-gradient-to-r from-primary to-primary-dark p-2 rounded-lg size-full">
                                <FiTrendingUp className="size-full text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
