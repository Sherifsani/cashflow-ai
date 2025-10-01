// Setup module types
export interface BusinessType {
  id: string;
  name: string;
  icon: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  priority: string;
}

export interface BusinessData {
  // Step 1: Business Info
  businessName: string;
  businessType: string;
  location: string;
  
  // Step 2: Financial Info  
  startingBalance: string;
  monthlyRevenue: string;
  monthlyExpenses: string;
  
  // Step 3: Goals
  goal: string;
  customGoal?: string;
  
  // Step 4: Contact
  phone: string;
  whatsappAlerts: boolean;
  emailReports: boolean;
}

export interface SetupFormHook {
  // State
  currentStep: number;
  businessData: BusinessData;
  
  // Data
  businessTypes: BusinessType[];
  goals: Goal[];
  
  // Actions
  handleInputChange: (field: keyof BusinessData, value: string | boolean) => void;
  nextStep: () => void;
  prevStep: () => void;
  completeSetup: () => void;
  
  // Validation & Helpers
  isStepValid: () => boolean;
  getStepTitle: () => string;
  formatCurrency: (amount: string) => string;
  calculateRunwayMonths: () => number;
  calculateProfitMargin: () => number;
  calculateMonthlyProfit: () => number;
}