import { useState, useEffect, useCallback } from 'react'
import { DashboardData, TimeRange, BusinessData } from '../_types'
import { generateMockData } from '../_data/mockData'

export default function useDashboardData(businessData: BusinessData | null) {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('30days')

  // Load dashboard data
  useEffect(() => {
    if (businessData) {
      loadDashboardData()
    }
  }, [businessData, selectedTimeRange])

  const loadDashboardData = useCallback(async () => {
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Generate mock data based on business data
      const mockData = generateMockData(businessData!, selectedTimeRange)
      setData(mockData)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }, [businessData, selectedTimeRange])

  const refreshData = useCallback(() => {
    loadDashboardData()
  }, [loadDashboardData])

  const updateTimeRange = useCallback((range: TimeRange) => {
    setSelectedTimeRange(range)
  }, [])

  return {
    data,
    loading,
    selectedTimeRange,
    updateTimeRange,
    refreshData
  }
}