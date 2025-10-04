"use client";

import { useState, useEffect } from 'react';
import { getDashboardData, getUserProfile, getAllTransactions } from '../lib/api';

interface DashboardData {
  monthlyIncome: { value: number; percentageChange: number; trend: string };
  monthlyExpense: { value: number; percentageChange: number; trend: string };
  currentBalance: { value: number; percentageChange: number; trend: string };
  healthScore: { value: number; percentageChange: number; trend: string };
}

interface UserProfile {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  businessName: string;
  businessType: string;
  startingBalance: number;
}

interface Transaction {
  transactionId: string;
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense';
  date: string;
}

export const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [dashboard, profile, transactionList] = await Promise.all([
        getDashboardData().catch(() => null),
        getUserProfile().catch(() => null),
        getAllTransactions().catch(() => ({ transactions: [] }))
      ]);

      setDashboardData(dashboard?.dashboard || null);
      setUserProfile(profile?.user || null);
      setTransactions(transactionList?.transactions || []);

    } catch (err: any) {
      console.error('Dashboard fetch error:', err);
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchDashboardData();
  };

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('idToken') || localStorage.getItem('accessToken');
    if (token) {
      fetchDashboardData();
    } else {
      setLoading(false);
      setError('Not authenticated');
    }
  }, []);

  return {
    dashboardData,
    userProfile,
    transactions,
    loading,
    error,
    refreshData
  };
};
