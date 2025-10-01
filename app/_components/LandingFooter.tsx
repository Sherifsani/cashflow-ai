"use client"

import React from 'react'
import { FiTrendingUp } from 'react-icons/fi'

export default function LandingFooter() {
    return (
        <footer className="bg-background-dark text-white py-8 mt-16">
            <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-r from-primary to-primary-dark p-2 rounded-lg">
                        <FiTrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-bold text-lg">CashFlow Co-Pilot</span>
                </div>
                <div className="text-sm text-gray-300">&copy; {new Date().getFullYear()} CashFlow Co-Pilot. All rights reserved.</div>
                <div className="flex gap-4">
                    <a href="/privacy" className="hover:underline text-gray-300">Privacy</a>
                    <a href="/terms" className="hover:underline text-gray-300">Terms</a>
                </div>
            </div>
        </footer>
    )
}
