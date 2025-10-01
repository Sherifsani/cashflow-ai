
"use client"

import React, { useState, useEffect } from 'react'
import LandingNavbar from './_components/LandingNavbar'
import LandingHero from './_components/LandingHero'
import LandingFeatures from './_components/LandingFeatures'
import LandingPricing from './_components/LandingPricing'
import LandingTestimonial from './_components/LandingTestimonial'
import LandingFAQ from './_components/LandingFAQ'
import LandingFooter from './_components/LandingFooter'

export default function CashFlowLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      const email = localStorage.getItem('userEmail')
      if (token && email) {
        setIsLoggedIn(true)
        setUserEmail(email)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light to-white">
      <LandingNavbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isLoggedIn={isLoggedIn} userEmail={userEmail} />
      <LandingHero />
      <LandingFeatures />
      <LandingPricing />
      <LandingTestimonial />
      <LandingFAQ />
      <LandingFooter />
    </div>
  )
}
          <div className="max-w-4xl mx-auto">
            {/* Announcement Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full px-6 py-2 mb-8">
              <FiZap className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-blue-700 font-medium">New: WhatsApp AI Assistant Now Available!</span>
            </div>

            <h1 className={`text-6xl md:text-7xl font-black mb-6 transition-all duration-1000 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Never Run Out of 
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"> Cash </span>
              Again
            </h1>

            <p className={`text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed transition-all duration-1000 delay-300 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              AI-powered cashflow forecasting for Nigerian SMEs. Get early warnings about cash shortages 
              and make <span className="font-semibold text-blue-600">smarter financial decisions</span> before it's too late.
            </p>
            
            {/* Enhanced Problem Statement */}
            <div className={`bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-6 mb-12 text-left rounded-lg shadow-lg transition-all duration-1000 delay-500 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex items-center mb-3">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <FiAlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-red-800">⚠️ The Critical Problem</h3>
              </div>
              <p className="text-red-700 text-lg leading-relaxed">
                <span className="font-semibold">78% of Nigerian SMEs</span> don't use accounting software and can't predict if they'll have enough money 
                for salaries, rent, or suppliers until it's too late. This leads to <span className="font-semibold">poor decisions and business collapse</span>.
              </p>
              <div className="mt-4 flex items-center text-red-600">
                <span className="text-2xl font-bold mr-2">₦2.1B</span>
                <span className="text-sm">lost annually due to poor cash flow management</span>
              </div>
            </div>

            <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-1000 delay-700 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {isLoggedIn ? (
                <a 
                  href="/dashboard"
                  className="group bg-gradient-to-r from-green-600 to-blue-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center"
                >
                  Go to Your Dashboard
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              ) : (
                <a 
                  href="/auth/register"
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center"
                >
                  Start Free Trial
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              )}
              <button className="group border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center">
                <FiPlay className="mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className={`transition-all duration-1000 delay-1000 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-gray-500 mb-6">Trusted by over 500+ Nigerian businesses</p>
              <div className="flex justify-center items-center space-x-8 text-gray-400">
                <div className="flex items-center">
                  <FiUsers className="h-5 w-5 mr-2" />
                  <span className="font-semibold text-blue-600">500+</span> Users
                </div>
                <div className="flex items-center">
                  <FiShield className="h-5 w-5 mr-2" />
                  <span className="font-semibold text-green-600">Bank-Level</span> Security
                </div>
                <div className="flex items-center">
                  <FiZap className="h-5 w-5 mr-2" />
                  <span className="font-semibold text-purple-600">99.9%</span> Uptime
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Solution Overview */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ✅ Like a <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Financial Weather Forecast</span> for Your Business
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              CashFlow Co-Pilot predicts cash shortages, sales dips, and growth opportunities before they happen
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Enhanced Feature Cards */}
            {[
              {
                icon: FiUpload,
                title: "Smart Data Entry",
                description: "Manual input or upload bank/POS/Excel data automatically with AI validation",
                color: "blue",
                gradient: "from-blue-500 to-blue-600"
              },
              {
                icon: FiBarChart,
                title: "AI Analysis",
                description: "Amazon Bedrock analyzes patterns to predict cash flow issues with 94% accuracy",
                color: "green",
                gradient: "from-green-500 to-emerald-600"
              },
              {
                icon: FiMessageCircle,
                title: "Plain English Q&A",
                description: "Ask questions like 'Can I pay rent and still restock?' Get instant answers",
                color: "purple",
                gradient: "from-purple-500 to-purple-600"
              },
              {
                icon: FiZap,
                title: "Smart Alerts",
                description: "WhatsApp/email alerts with actionable recommendations 2 weeks in advance",
                color: "orange",
                gradient: "from-orange-500 to-red-500"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`group bg-gradient-to-br from-${feature.color}-50 to-${feature.color}-100 p-8 rounded-2xl border border-${feature.color}-200 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer`}
              >
                <div className={`bg-gradient-to-r ${feature.gradient} p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                
                {/* Progress indicator */}
                <div className="mt-4 flex items-center text-sm text-gray-600">
                  <div className={`w-2 h-2 bg-${feature.color}-500 rounded-full mr-2`}></div>
                  <span>Ready to use</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced How It Works */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible['how-it-works'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              🌐 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Web-First Architecture</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four simple steps to gain complete control over your business cashflow
            </p>
          </div>

          <div className="relative">
            {/* Connection Lines */}
            <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-gradient-to-r from-blue-300 via-purple-300 to-orange-300"></div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: FiShield, title: "Secure Login", desc: "Bank-level security for your financial data", color: "blue" },
                { icon: FiDollarSign, title: "Easy Input", desc: "Upload or manually enter income/expense data", color: "green" },
                { icon: FiBarChart, title: "AI Dashboard", desc: "Beautiful charts showing cash flow patterns", color: "purple" },
                { icon: FiTarget, title: "Smart Predictions", desc: "AI forecasts with actionable insights", color: "orange" }
              ].map((step, index) => (
                <div key={index} className="text-center relative">
                  {/* Step Number */}
                  <div className={`bg-gradient-to-r from-${step.color}-500 to-${step.color}-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold shadow-lg relative z-10`}>
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className={`bg-gradient-to-br from-${step.color}-50 to-${step.color}-100 p-4 rounded-xl w-fit mx-auto mb-6 border border-${step.color}-200`}>
                    <step.icon className={`h-8 w-8 text-${step.color}-600`} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                  
                  {/* Time indicator */}
                  <div className="mt-4 text-sm text-gray-500">
                    <FiClock className="inline h-4 w-4 mr-1" />
                    {index === 0 ? '2 min' : index === 1 ? '5 min' : index === 2 ? 'Instant' : 'Real-time'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Sample Questions */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ask Your <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Financial Questions</span> in Plain English
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No complex accounting jargon. Just ask what you need to know and get instant, actionable answers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                question: "If I pay rent this week, can I still restock inventory?", 
                color: "blue",
                answer: "Yes, you'll have ₦45K remaining after rent. Safe to restock ₦30K worth."
              },
              { 
                question: "How long before I run out of cash if sales drop 20%?", 
                color: "red",
                answer: "At 20% sales drop, you have 6 weeks of runway. Time to act now."
              },
              { 
                question: "Should I hire a new employee next month?", 
                color: "green",
                answer: "Based on growth trends, yes! You can afford ₦80K/month salary."
              },
              { 
                question: "When is the best time to make that equipment purchase?", 
                color: "purple",
                answer: "Wait 3 weeks for optimal cash position. You'll save ₦15K in interest."
              }
            ].map((item, index) => (
              <div key={index} className={`group bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 p-8 rounded-2xl border-l-4 border-${item.color}-500 hover:shadow-xl transition-all duration-300 transform hover:scale-102`}>
                <div className="flex items-start mb-4">
                  <div className={`bg-${item.color}-500 p-2 rounded-lg mr-4 mt-1`}>
                    <FiMessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-800 mb-3">"{item.question}"</p>
                    <div className={`bg-white p-4 rounded-lg border border-${item.color}-200`}>
                      <p className="text-gray-700 font-medium">{item.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      {/* Enhanced Value Proposition */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              💥 Why CashFlow Co-Pilot is a <span className="text-yellow-300">Game Changer</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Stop playing financial roulette with your business. Get the clarity and control you need to thrive.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: FiCheck,
                title: "Clarity & Control",
                description: "No complex accounting software needed. Get clear insights instantly with visual dashboards.",
                stat: "95% easier than traditional accounting software"
              },
              {
                icon: FiClock,
                title: "Early Warnings",
                description: "Plan instead of panic with advance cash flow predictions up to 6 months ahead.",
                stat: "2 weeks advance warning on cash shortages"
              },
              {
                icon: FiZap,
                title: "Works Anywhere",
                description: "Forecasting tool, not a bank. No money deposits required. Works on any device.",
                stat: "99.9% uptime guaranteed"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="bg-white/20 p-4 rounded-full w-fit mx-auto mb-6">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-blue-100 mb-4 leading-relaxed">{item.description}</p>
                <div className="text-yellow-300 font-semibold text-sm">{item.stat}</div>
              </div>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold mb-6">🚀 Join the Success Stories</h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-yellow-300 mb-2">₦2.1M</div>
                <div className="text-blue-100">Average cash saved per business</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-yellow-300 mb-2">94%</div>
                <div className="text-blue-100">Prediction accuracy rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-yellow-300 mb-2">500+</div>
                <div className="text-blue-100">Nigerian businesses trust us</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/auth/register"
              className="group bg-white text-blue-600 px-10 py-4 rounded-lg text-lg font-bold hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Start Your Free Trial Today
              <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <button className="group border-2 border-white text-white px-10 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-blue-600 transition-all">
              <FiPhone className="inline mr-2" />
              Schedule Demo Call
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Nigerian SMEs</span>
            </h2>
            <p className="text-xl text-gray-600">Real stories from real business owners who transformed their cash flow</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: "Adaora Okeke",
                role: "Restaurant Owner, Lagos",
                company: "Mama's Kitchen",
                avatar: "A",
                color: "blue",
                rating: 5,
                quote: "CashFlow Co-Pilot saved my restaurant. I finally know when I can afford to buy ingredients without running out of cash for salaries. My stress levels dropped 80%!",
                metric: "Increased profit margin by 15%"
              },
              {
                name: "Emeka Okafor",
                role: "Electronics Retailer, Abuja",
                company: "TechHub Electronics",
                avatar: "E",
                color: "green",
                rating: 5,
                quote: "The WhatsApp alerts are perfect! I get warned about cash shortages 2 weeks before they happen. No more emergency loans or sleepless nights.",
                metric: "Avoided ₦500K in emergency loans"
              },
              {
                name: "Fatima Mohammed",
                role: "Fashion Designer, Kano",
                company: "Elegance Designs",
                avatar: "F",
                color: "purple",
                rating: 5,
                quote: "Simple and powerful. I can ask questions in plain English and get answers that help me make better business decisions. It's like having a CFO!",
                metric: "Grew revenue by 40% in 6 months"
              }
            ].map((testimonial, index) => (
              <div key={index} className={`bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-t-4 border-${testimonial.color}-500`}>
                {/* Stars */}
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>

                {/* Metric */}
                <div className={`bg-${testimonial.color}-50 p-3 rounded-lg mb-6 border border-${testimonial.color}-200`}>
                  <div className={`text-${testimonial.color}-800 font-semibold text-sm`}>🎯 Result: {testimonial.metric}</div>
                </div>

                {/* Profile */}
                <div className="flex items-center">
                  <div className={`w-12 h-12 bg-gradient-to-r from-${testimonial.color}-500 to-${testimonial.color}-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                    <div className={`text-${testimonial.color}-600 text-xs font-semibold`}>{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Video Testimonial CTA */}
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">See More Success Stories</h3>
            <p className="text-gray-600 mb-6">Watch how Nigerian business owners transformed their financial management</p>
            <button className="group bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
              <FiPlay className="inline mr-2 group-hover:scale-110 transition-transform" />
              Watch Video Stories
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple, <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Transparent Pricing</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your business size. No hidden fees, no surprises. Cancel anytime.
            </p>
            
            {/* Pricing Toggle */}
            <div className="flex items-center justify-center mt-8 mb-8">
              <div className="bg-gray-100 p-1 rounded-lg flex">
                <button className="bg-white text-gray-900 px-4 py-2 rounded-md font-semibold shadow-sm">Monthly</button>
                <button className="text-gray-600 px-4 py-2 rounded-md font-semibold">Annual (Save 20%)</button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: "Starter",
                price: "₦5,000",
                period: "/month",
                description: "Perfect for small businesses just getting started",
                features: [
                  "Basic cashflow forecasting",
                  "Manual data entry",
                  "Email alerts",
                  "Basic Q&A support",
                  "3-month history",
                  "Mobile app access"
                ],
                color: "gray",
                popular: false,
                buttonText: "Start Free Trial"
              },
              {
                name: "Professional",
                price: "₦15,000", 
                period: "/month",
                description: "Most popular for growing Nigerian SMEs",
                features: [
                  "Advanced AI forecasting",
                  "Bank/POS data upload",
                  "WhatsApp alerts",
                  "Advanced Q&A with AI",
                  "Custom recommendations",
                  "12-month history",
                  "Priority support",
                  "Financial reports"
                ],
                color: "blue",
                popular: true,
                buttonText: "Start Free Trial"
              },
              {
                name: "Enterprise",
                price: "₦35,000",
                period: "/month", 
                description: "For established businesses with multiple locations",
                features: [
                  "Everything in Professional",
                  "Multiple businesses",
                  "API integrations", 
                  "Custom integrations",
                  "Priority support",
                  "Custom training",
                  "Dedicated account manager",
                  "Advanced analytics"
                ],
                color: "purple",
                popular: false,
                buttonText: "Contact Sales"
              }
            ].map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : 'border border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                    <div className="mb-4">
                      <span className={`text-4xl font-black ${plan.popular ? 'text-blue-600' : 'text-gray-900'}`}>{plan.price}</span>
                      <span className="text-gray-500">{plan.period}</span>
                    </div>
                    {plan.name === "Professional" && (
                      <div className="bg-green-50 text-green-800 px-3 py-1 rounded-full text-xs font-semibold inline-block">
                        Save ₦36,000 annually
                      </div>
                    )}
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className={`${plan.popular ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'} p-1 rounded-full mr-3 mt-0.5`}>
                          <FiCheck className="h-3 w-3" />
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.buttonText === "Contact Sales" ? (
                    <button className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all transform hover:scale-105 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}>
                      {plan.buttonText}
                    </button>
                  ) : (
                    <a 
                      href="/auth/register"
                      className={`block w-full py-4 px-6 rounded-lg font-bold text-lg transition-all transform hover:scale-105 text-center ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {plan.buttonText}
                    </a>
                  )}

                  {plan.name === "Starter" && (
                    <p className="text-center text-xs text-gray-500 mt-3">
                      No credit card required
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  q: "Is there a free trial?",
                  a: "Yes! 14 days completely free, no credit card required."
                },
                {
                  q: "Can I change plans anytime?",
                  a: "Absolutely. Upgrade or downgrade with just one click."
                },
                {
                  q: "Do you support multiple currencies?",
                  a: "Yes, we support Naira, Dollars, and other major currencies."
                },
                {
                  q: "Is my financial data secure?",
                  a: "Bank-level encryption and security. We never store your bank passwords."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                  <p className="text-gray-600 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="animate-pulse absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="animate-pulse absolute top-20 right-20 w-1 h-1 bg-purple-400 rounded-full animation-delay-1000"></div>
            <div className="animate-pulse absolute bottom-20 left-1/3 w-1 h-1 bg-cyan-400 rounded-full animation-delay-2000"></div>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Take <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Complete Control</span> of Your Cash Flow?
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Join <span className="font-bold text-white">500+ Nigerian SMEs</span> who never worry about running out of cash again. 
            Start your transformation today.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <a 
              href="/auth/register"
              className="group bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-12 py-5 rounded-xl text-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Start Your 14-Day Free Trial
              <FiArrowRight className="inline ml-3 group-hover:translate-x-1 transition-transform" />
            </a>
            <button className="group border-2 border-white/50 text-white px-12 py-5 rounded-xl text-xl font-bold hover:bg-white hover:text-gray-900 transition-all backdrop-blur-sm">
              <FiPhone className="inline mr-3" />
              Schedule a Personal Demo
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <FiCheck className="h-8 w-8 text-green-400 mb-2" />
              <span className="text-gray-300">No credit card required</span>
            </div>
            <div className="flex flex-col items-center">
              <FiShield className="h-8 w-8 text-blue-400 mb-2" />
              <span className="text-gray-300">Bank-level security</span>
            </div>
            <div className="flex flex-col items-center">
              <FiZap className="h-8 w-8 text-purple-400 mb-2" />
              <span className="text-gray-300">Setup in under 5 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-lg mr-3">
                  <FiTrendingUp className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">CashFlow Co-Pilot</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                AI-powered cashflow forecasting for Nigerian SMEs. Never run out of cash again. 
                Join the financial revolution and take control of your business future.
              </p>
              <div className="flex space-x-4">
                <div className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                  <FiMail className="h-5 w-5 text-gray-300" />
                </div>
                <div className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                  <FiPhone className="h-5 w-5 text-gray-300" />
                </div>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-bold mb-6 text-white">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold mb-6 text-white">Resources</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Video Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cash Flow Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold mb-6 text-white">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div id="contact" className="border-t border-gray-800 pt-8 mb-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-blue-600 p-3 rounded-full mb-3">
                  <FiMail className="h-5 w-5 text-white" />
                </div>
                <div className="text-gray-400">
                  <div className="font-semibold text-white mb-1">Email Support</div>
                  <div>support@cashflowcopilot.ng</div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-green-600 p-3 rounded-full mb-3">
                  <FiPhone className="h-5 w-5 text-white" />
                </div>
                <div className="text-gray-400">
                  <div className="font-semibold text-white mb-1">Phone Support</div>
                  <div>+234 (0) 800 CASHFLOW</div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-purple-600 p-3 rounded-full mb-3">
                  <FiMapPin className="h-5 w-5 text-white" />
                </div>
                <div className="text-gray-400">
                  <div className="font-semibold text-white mb-1">Headquarters</div>
                  <div>Lagos, Nigeria</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                &copy; 2025 CashFlow Co-Pilot. All rights reserved. Built with ❤️ for Nigerian SMEs.
              </p>
              <div className="flex items-center space-x-6 text-gray-400 text-sm">
                <span>🇳🇬 Made in Nigeria</span>
                <span>•</span>
                <span>🔒 SOC2 Compliant</span>
                <span>•</span>
                <span>⚡ 99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}