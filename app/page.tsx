"use client"

import React, { useState, useEffect } from 'react'
import LandingNavbar from './_components/LandingNavbar'
import LandingHero from './_components/LandingHero'
import LandingFeatures from './_components/LandingFeatures'
import LandingPricing from './_components/LandingPricing'
import LandingTestimonial from './_components/LandingTestimonial'
import LandingFAQ from './_components/LandingFAQ'
import LandingCTA from './_components/LandingCTA'
import LandingFooter from './_components/LandingFooter'

export default function CashFlowLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [userEmail, setUserEmail] = useState<string>('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      const email = localStorage.getItem('userEmail')
      if (token && email) {
        setIsLoggedIn(true)
        setUserEmail(email)
      }
    }

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light to-white">
      <LandingNavbar 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        isLoggedIn={isLoggedIn} 
        userEmail={userEmail} 
      />
      <LandingHero />
      <LandingFeatures />
      <LandingPricing />
      <LandingTestimonial />
      <LandingFAQ />
      <LandingCTA />
      <LandingFooter />
    </div>
  )
}