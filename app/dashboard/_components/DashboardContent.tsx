"use client"

import RecentTransactions from './RecentTransactions'
import AIInsights from './AIInsights'
import UpcomingPayments from './UpcomingPayments'
import type { DashboardData } from '../_types'

interface DashboardContentProps {
  data: DashboardData
}

export default function DashboardContent({ data }: DashboardContentProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Recent Transactions */}
      <div className="lg:col-span-2">
        <RecentTransactions transactions={data.recentTransactions} />
      </div>

      {/* Right Column: AI Insights & Upcoming Payments */}
      <div className="space-y-6">
        <AIInsights insights={data.aiInsights} />
        <UpcomingPayments payments={data.upcomingPayments} />
      </div>
    </div>
  )
}