// Dashboard types
export interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface BusinessData {
  businessName: string;
  businessType: string;
  businessLocation?: string;
  startingBalance: string;
  monthlyRevenue: string;
  monthlyExpenses: string;
  employeeCount?: string;
  phone?: string;
}

export interface UserData {
  user: User;
  businessData: BusinessData;
  token: string;
  createdAt: string;
  lastLogin: string;
}

export interface Payment {
  name: string;
  amount: number;
  dueDate: string;
  type: 'expense' | 'income';
  status?: 'pending' | 'paid' | 'overdue';
}

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  category?: string;
}

export interface AIInsight {
  type: 'warning' | 'success' | 'info';
  message: string;
  priority?: 'high' | 'medium' | 'low';
}

export interface DashboardData {
  currentBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  businessName: string;
  businessType: string;
  healthScore: number;
  upcomingPayments: Payment[];
  recentTransactions: Transaction[];
  aiInsights: AIInsight[];
  cashRunway: CashRunwayData;
}

export interface CashRunwayData {
  days: number | '∞';
  status: 'positive' | 'good' | 'warning' | 'critical';
  message: string;
  monthlyBurn?: number;
}

export type TimeRange = '7days' | '30days' | '90days' | '1year';

// Chart data types
export interface ChartDataPoint {
  date: string;
  amount: number;
  prediction?: boolean;
}

export interface CashFlowChartData {
  historical: ChartDataPoint[];
  projected: ChartDataPoint[];
}