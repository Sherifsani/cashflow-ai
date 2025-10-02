import { DashboardData, BusinessData, TimeRange, Payment, Transaction, AIInsight, CashRunwayData } from '../_types'

export function generateMockData(businessData: BusinessData, timeRange: TimeRange): DashboardData {
  const baseBalance = parseFloat(businessData.startingBalance?.replace(/[^\d.-]/g, '') || '0')
  const monthlyRevenue = parseFloat(businessData.monthlyRevenue?.replace(/[^\d.-]/g, '') || '0')
  const monthlyExpenses = parseFloat(businessData.monthlyExpenses?.replace(/[^\d.-]/g, '') || '0')

  const currentBalance = baseBalance + (monthlyRevenue - monthlyExpenses) * 2 // Simulate 2 months growth
  const netMonthly = monthlyRevenue - monthlyExpenses
  const healthScore = Math.min(Math.max(Math.round((netMonthly / monthlyRevenue) * 100), 0), 100)

  return {
    currentBalance,
    monthlyIncome: monthlyRevenue,
    monthlyExpenses,
    businessName: businessData.businessName,
    businessType: businessData.businessType,
    healthScore,
    upcomingPayments: generateUpcomingPayments(businessData),
    recentTransactions: generateRecentTransactions(businessData),
    aiInsights: generateAIInsights(businessData, healthScore),
    cashRunway: calculateCashRunway(currentBalance, netMonthly)
  }
}

function generateUpcomingPayments(businessData: BusinessData): Payment[] {
  const baseExpense = parseFloat(businessData.monthlyExpenses?.replace(/[^\d.-]/g, '') || '0') / 4
  
  return [
    {
      name: 'Office Rent',
      amount: Math.round(baseExpense * 0.4),
      dueDate: getDateString(15),
      type: 'expense',
      status: 'pending'
    },
    {
      name: 'Client Payment Expected',
      amount: Math.round(baseExpense * 1.2),
      dueDate: getDateString(18),
      type: 'income',
      status: 'pending'
    },
    {
      name: 'Supplier Payment',
      amount: Math.round(baseExpense * 0.8),
      dueDate: getDateString(20),
      type: 'expense',
      status: 'pending'
    },
    {
      name: 'Service Fee',
      amount: Math.round(baseExpense * 0.3),
      dueDate: getDateString(22),
      type: 'expense',
      status: 'pending'
    }
  ]
}

function generateRecentTransactions(businessData: BusinessData): Transaction[] {
  const baseRevenue = parseFloat(businessData.monthlyRevenue?.replace(/[^\d.-]/g, '') || '0') / 10
  const baseExpense = parseFloat(businessData.monthlyExpenses?.replace(/[^\d.-]/g, '') || '0') / 8

  return [
    {
      id: 1,
      description: 'Sales Revenue',
      amount: Math.round(baseRevenue * 1.2),
      type: 'income',
      date: getDateString(-1),
      category: 'Sales'
    },
    {
      id: 2,
      description: 'Marketing Expense',
      amount: -Math.round(baseExpense * 0.4),
      type: 'expense',
      date: getDateString(-2),
      category: 'Marketing'
    },
    {
      id: 3,
      description: 'Consulting Income',
      amount: Math.round(baseRevenue * 0.8),
      type: 'income',
      date: getDateString(-3),
      category: 'Services'
    },
    {
      id: 4,
      description: 'Office Supplies',
      amount: -Math.round(baseExpense * 0.2),
      type: 'expense',
      date: getDateString(-4),
      category: 'Operations'
    },
    {
      id: 5,
      description: 'Product Sales',
      amount: Math.round(baseRevenue * 1.5),
      type: 'income',
      date: getDateString(-5),
      category: 'Sales'
    }
  ]
}

function generateAIInsights(businessData: BusinessData, healthScore: number): AIInsight[] {
  const insights: AIInsight[] = []
  
  if (healthScore < 30) {
    insights.push({
      type: 'warning',
      message: 'Cash flow is critically low. Consider reducing expenses or increasing revenue urgently.',
      priority: 'high'
    })
  } else if (healthScore < 60) {
    insights.push({
      type: 'warning',
      message: 'Cash flow needs attention. Review upcoming expenses and optimize where possible.',
      priority: 'medium'
    })
  } else {
    insights.push({
      type: 'success',
      message: 'Cash flow is healthy! Consider investing in growth opportunities.',
      priority: 'low'
    })
  }

  const businessType = businessData.businessType.toLowerCase()
  if (businessType.includes('retail') || businessType.includes('restaurant')) {
    insights.push({
      type: 'info',
      message: 'Peak season approaching. Consider stocking up inventory 2 weeks early.',
      priority: 'medium'
    })
  }

  insights.push({
    type: 'info',
    message: 'You have 3 pending payments this week. Follow up to ensure timely collection.',
    priority: 'medium'
  })

  return insights
}

function calculateCashRunway(currentBalance: number, monthlyBurn: number): CashRunwayData {
  if (monthlyBurn >= 0) {
    return {
      days: '∞',
      status: 'positive',
      message: 'Your business is generating positive cash flow!'
    }
  }

  const monthsRemaining = currentBalance / Math.abs(monthlyBurn)
  const daysRemaining = Math.round(monthsRemaining * 30)

  let status: CashRunwayData['status']
  let message: string

  if (daysRemaining > 180) {
    status = 'good'
    message = 'You have a healthy cash runway'
  } else if (daysRemaining > 90) {
    status = 'warning'
    message = 'Monitor cash flow closely'
  } else {
    status = 'critical'
    message = 'Take immediate action to improve cash flow'
  }

  return {
    days: daysRemaining,
    status,
    message,
    monthlyBurn: Math.abs(monthlyBurn)
  }
}

function getDateString(daysFromNow: number): string {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  return date.toISOString().split('T')[0]
}

// Business type specific recommendations
export function getBusinessTypeInsights(businessType: string): AIInsight[] {
  const type = businessType.toLowerCase()
  
  if (type.includes('restaurant') || type.includes('food')) {
    return [
      {
        type: 'info',
        message: 'Food costs typically account for 28-35% of revenue. Monitor your food cost percentage.',
        priority: 'medium'
      }
    ]
  }
  
  if (type.includes('retail')) {
    return [
      {
        type: 'info',
        message: 'Consider seasonal inventory planning to optimize cash flow during peak periods.',
        priority: 'medium'
      }
    ]
  }
  
  return []
}