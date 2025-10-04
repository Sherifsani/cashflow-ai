"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiTrendingUp, FiTrendingDown, FiDollarSign, FiCalendar } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { getAnalytics } from '../../../lib/api';

type Period = '7d' | '30d' | '90d' | '1y';

interface AnalyticsData {
  period: string;
  dateRange: {
    from: string;
    to: string;
  };
  summary: {
    totalIncome: number;
    totalExpenses: number;
    netAmount: number;
    transactionCount: number;
  };
  chartData: Array<{
    date: string;
    income: number;
    expense: number;
    net: number;
    cumulativeBalance: number;
  }>;
  categoryBreakdown: {
    income: Array<{
      category: string;
      amount: number;
      percentage: number;
    }>;
    expense: Array<{
      category: string;
      amount: number;
      percentage: number;
    }>;
  };
}

export default function InsightsPage() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('30d');
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const periods = [
    { value: '7d' as Period, label: '7 Days' },
    { value: '30d' as Period, label: '30 Days' },
    { value: '90d' as Period, label: '90 Days' },
    { value: '1y' as Period, label: '1 Year' }
  ];

  const fetchData = async (period: Period) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAnalytics(period);
      setData(response);
    } catch (err: any) {
      console.error('Failed to fetch insights:', err);
      setError(err.message || 'Failed to load insights');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedPeriod);
  }, [selectedPeriod]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Chart data is now directly available from the API
  const chartData = data?.chartData || [];

  return (
    <div className="min-h-screen bg-brand-gray-light">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-brand-text-medium hover:text-brand-text-dark mr-4"
          >
            <FiArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-brand-text-dark">Financial Insights</h1>
        </div>

        {/* Period Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-brand-text-dark">Time Period</h2>
            <FiCalendar className="h-5 w-5 text-brand-text-medium" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {periods.map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedPeriod === period.value
                    ? 'border-brand-teal bg-brand-teal text-white'
                    : 'border-gray-200 hover:border-brand-teal text-brand-text-dark'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-teal mx-auto mb-4"></div>
            <p className="text-brand-text-medium">Loading insights...</p>
          </div>
        )}

        {error && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => fetchData(selectedPeriod)}
              className="bg-brand-teal text-white px-4 py-2 rounded-lg hover:bg-brand-teal-dark"
            >
              Try Again
            </button>
          </div>
        )}

        {data && !loading && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-brand-text-medium text-sm font-medium">Total Income</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(data.summary.totalIncome)}
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <FiTrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-brand-text-medium text-sm font-medium">Total Expenses</p>
                    <p className="text-2xl font-bold text-red-600">
                      {formatCurrency(data.summary.totalExpenses)}
                    </p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-lg">
                    <FiTrendingDown className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-brand-text-medium text-sm font-medium">Net Amount</p>
                    <p className={`text-2xl font-bold ${
                      data.summary.netAmount >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatCurrency(data.summary.netAmount)}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FiDollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-brand-text-medium text-sm font-medium">Transactions</p>
                    <p className="text-2xl font-bold text-brand-text-dark">
                      {data.summary.transactionCount}
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <FiCalendar className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Line Chart - Income vs Expenses */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-brand-text-dark mb-4">Income vs Expenses Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} />
                    <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="net" stroke="#3B82F6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart - Cumulative Balance */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-brand-text-dark mb-4">Cumulative Balance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Bar dataKey="cumulativeBalance" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Income Categories */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-brand-text-dark mb-4">Income by Category</h3>
                {data.categoryBreakdown.income.length === 0 ? (
                  <p className="text-brand-text-medium text-center py-8">No income categories found</p>
                ) : (
                  <div className="space-y-4">
                    {data.categoryBreakdown.income.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                          <span className="text-brand-text-dark">{category.category}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-brand-text-dark">{formatCurrency(category.amount)}</p>
                          <p className="text-sm text-brand-text-medium">{category.percentage}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Expense Categories */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-brand-text-dark mb-4">Expenses by Category</h3>
                {data.categoryBreakdown.expense.length === 0 ? (
                  <p className="text-brand-text-medium text-center py-8">No expense categories found</p>
                ) : (
                  <div className="space-y-4">
                    {data.categoryBreakdown.expense.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
                          <span className="text-brand-text-dark">{category.category}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-brand-text-dark">{formatCurrency(category.amount)}</p>
                          <p className="text-sm text-brand-text-medium">{category.percentage}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Period Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-brand-text-dark mb-4">
                Period Summary ({data.period})
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-brand-text-medium">Date Range:</span>
                    <span className="font-medium text-brand-text-dark">
                      {new Date(data.dateRange.from).toLocaleDateString()} - {new Date(data.dateRange.to).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-brand-text-medium">Total Income:</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(data.summary.totalIncome)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-brand-text-medium">Total Expenses:</span>
                    <span className="font-semibold text-red-600">
                      {formatCurrency(data.summary.totalExpenses)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className={`flex justify-between items-center p-3 rounded-lg ${
                    data.summary.netAmount >= 0 ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    <span className="text-brand-text-medium">Net Amount:</span>
                    <span className={`font-semibold ${
                      data.summary.netAmount >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatCurrency(data.summary.netAmount)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-brand-text-medium">Total Transactions:</span>
                    <span className="font-semibold text-blue-600">
                      {data.summary.transactionCount}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-brand-text-medium">Average per Transaction:</span>
                    <span className="font-semibold text-purple-600">
                      {formatCurrency(data.summary.transactionCount > 0 ? 
                        Math.abs(data.summary.totalIncome + data.summary.totalExpenses) / data.summary.transactionCount : 0
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
