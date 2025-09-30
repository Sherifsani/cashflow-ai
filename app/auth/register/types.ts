export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  businessName: string;
  businessType: string;
  businessLocation: string;
  monthlyRevenue: string;
  employeeCount: string;
  alertPreference: string;
  hearAboutUs: string;
};

export type Errors = Partial<Record<keyof FormData | 'submit', string>>;
