"use client"

import React from 'react'
import { FiTrendingUp, FiMenu, FiX } from 'react-icons/fi'

interface Props {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isLoggedIn: boolean;
  userEmail: string;
}

export default function LandingNavbar({ isMenuOpen, setIsMenuOpen, isLoggedIn, userEmail }: Props) {
  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-primary to-primary-dark p-2 rounded-lg">
              <FiTrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-text-primary">
              CashFlow Co-Pilot
            </span>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-text-secondary hover:text-primary font-medium transition-colors duration-200">Features</a>
            <a href="#pricing" className="text-text-secondary hover:text-primary font-medium transition-colors duration-200">Pricing</a>
            <a href="#testimonials" className="text-text-secondary hover:text-primary font-medium transition-colors duration-200">Testimonials</a>
            <a href="#faq" className="text-text-secondary hover:text-primary font-medium transition-colors duration-200">FAQ</a>
            {isLoggedIn ? (
              <a href="/dashboard" className="bg-primary text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-primary-dark transition-colors">Dashboard</a>
            ) : (
              <a href="/auth/login" className="bg-primary text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-primary-dark transition-colors">Sign In</a>
            )}
          </div>
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              {isMenuOpen ? <FiX className="h-6 w-6 text-primary" /> : <FiMenu className="h-6 w-6 text-primary" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            <a href="#features" className="block text-text-secondary hover:text-primary font-medium transition-colors">Features</a>
            <a href="#pricing" className="block text-text-secondary hover:text-primary font-medium transition-colors">Pricing</a>
            <a href="#testimonials" className="block text-text-secondary hover:text-primary font-medium transition-colors">Testimonials</a>
            <a href="#faq" className="block text-text-secondary hover:text-primary font-medium transition-colors">FAQ</a>
            {isLoggedIn ? (
              <a href="/dashboard" className="block bg-primary text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-primary-dark transition-colors">Dashboard</a>
            ) : (
              <a href="/auth/login" className="block bg-primary text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-primary-dark transition-colors">Sign In</a>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
