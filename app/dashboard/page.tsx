"use client"

import React, { useEffect } from 'react'

// Components
import DashboardHeader from './_components/DashboardHeader'
import MetricsCards from './_components/MetricsCards'
import QuickActionsGrid from './_components/QuickActionsGrid'
import DashboardContent from './_components/DashboardContent'
import DashboardLoading from './_components/DashboardLoading'

// Hooks
import useAuth from './_hooks/useAuth'
import useDashboardData from './_hooks/useDashboardData'

export default function Dashboard() {
  const { user, businessData, loading: authLoading, requireAuth, logout } = useAuth()
  const { data, loading: dataLoading, refreshData } = useDashboardData(businessData)

  useEffect(() => {
    if (!authLoading) {
      requireAuth()
    }
  }, [authLoading, requireAuth])

  // Show loading while authenticating or if no business data
  if (authLoading || !user) {
    return <DashboardLoading message="Checking authentication..." />
  }

  if (!businessData) {
    return <DashboardLoading message="Setting up your dashboard..." />
  }

  if (dataLoading || !data) {
    return <DashboardLoading message="Loading your financial data..." />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        user={user}
        businessData={businessData}
        onLogout={logout}
        onRefresh={refreshData}
        loading={dataLoading}
      />

      <main className="px-6 py-8">
        {/* Metrics Cards */}
        <MetricsCards data={data} loading={dataLoading} />

        {/* Quick Actions */}
        <QuickActionsGrid />

        {/* Main Content */}
        <DashboardContent data={data} />
      </main>
    </div>
  )
}