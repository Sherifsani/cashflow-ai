"use client"

import type { DashboardData } from '../_types'

interface AIInsightsProps {
  insights: DashboardData['aiInsights']
}

export default function AIInsights({ insights }: AIInsightsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">AI Insights</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className={`p-4 rounded-lg ${
              insight.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
              insight.type === 'success' ? 'bg-green-50 border border-green-200' :
              'bg-blue-50 border border-blue-200'
            }`}>
              <p className="text-sm text-gray-700">{insight.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}