"use client";

import { useState } from 'react';
import { createTransaction, deleteTransaction, getTransactionsByPeriod } from '../lib/api';

interface Transaction {
  transactionId: string;
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense';
  date: string;
}

interface CreateTransactionData {
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
}

export const useTransactions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addTransaction = async (transactionData: CreateTransactionData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await createTransaction(transactionData);
      return response;
    } catch (err: any) {
      console.error('Add transaction error:', err);
      setError(err.message || 'Failed to add transaction');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeTransaction = async (transactionId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await deleteTransaction(transactionId);
      return response;
    } catch (err: any) {
      console.error('Delete transaction error:', err);
      setError(err.message || 'Failed to delete transaction');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getTransactionsByTimePeriod = async (period: '7d' | '30d' | '90d' | '1y') => {
    try {
      setLoading(true);
      setError(null);

      const response = await getTransactionsByPeriod(period);
      return response;
    } catch (err: any) {
      console.error('Get transactions error:', err);
      setError(err.message || 'Failed to fetch transactions');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    addTransaction,
    removeTransaction,
    getTransactionsByTimePeriod,
    loading,
    error
  };
};
