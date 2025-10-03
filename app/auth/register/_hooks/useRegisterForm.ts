"use client"

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormDataType, Errors } from '../types';
import authService from '../../../../services/authService';

export default function useRegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    businessType: "",
    businessLocation: "",
    monthlyRevenue: "",
    employeeCount: "",
    alertPreference: "whatsapp",
    hearAboutUs: ""
  });
  const [errors, setErrors] = useState<Errors>({});

  const businessTypes = [
    "Restaurant/Food Service", "Retail/Shop", "Electronics/Tech", "Fashion/Clothing",
    "Construction/Building", "Agriculture/Farming", "Transportation/Logistics", "Beauty/Personal Care",
    "Professional Services", "Manufacturing", "Other"
  ];

  const revenueRanges = [
    "Under ₦100K", "₦100K - ₦500K", "₦500K - ₦1M", "₦1M - ₦5M", "₦5M - ₦10M", "Above ₦10M"
  ];

  const employeeCounts = [
    "Just me", "2-5 employees", "6-10 employees", "11-25 employees", "26-50 employees", "50+ employees"
  ];

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const name = target.name as keyof FormDataType;
    const value = target.type === 'checkbox' ? String((target as HTMLInputElement).checked) : target.value;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    } as Pick<FormDataType, keyof FormDataType>));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  }, [errors]);

  const validateStep = useCallback((step: number) => {
    const newErrors: Errors = {};
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email";
      if (!formData.phone) newErrors.phone = "Phone number is required";
      else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) newErrors.phone = "Please enter a valid phone number";
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
      else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) newErrors.password = "Password must contain uppercase, lowercase, and number";
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    }

    if (step === 2) {
      if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";
      if (!formData.businessType) newErrors.businessType = "Please select business type";
      if (!formData.businessLocation.trim()) newErrors.businessLocation = "Business location is required";
      if (!formData.monthlyRevenue) newErrors.monthlyRevenue = "Please select monthly revenue range";
      if (!formData.employeeCount) newErrors.employeeCount = "Please select employee count";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleNextStep = useCallback(() => {
    if (validateStep(currentStep)) setCurrentStep(prev => prev + 1);
  }, [currentStep, validateStep]);

  const handlePrevStep = useCallback(() => setCurrentStep(prev => prev - 1), []);

  const toggleShowPassword = useCallback(() => setShowPassword(prev => !prev), []);
  const toggleShowConfirmPassword = useCallback(() => setShowConfirmPassword(prev => !prev), []);

  // const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (!validateStep(3)) return;
  //   setLoading(true);
  //   try {
  //     await new Promise(resolve => setTimeout(resolve, 2000));
  //     localStorage.setItem("token", "demo_token_" + Date.now());
  //     localStorage.setItem("userEmail", formData.email);
  //     localStorage.setItem("businessName", formData.businessName);
  //     localStorage.setItem("isNewUser", "true");
  //     router.push("/setup");
  //   } catch (err) {
  //     setErrors({ submit: "Registration failed. Please try again." });
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [formData, router, validateStep]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submitted')
    const formData = new FormData(e.target as HTMLFormElement);
    const { email, password, firstName, lastName } = Object.fromEntries(formData) as { email: string, password: string, firstName: string, lastName: string };
    console.log(email, password, firstName, lastName);
    // return;
    setLoading(true);

    const SignUpData = {
      // email: 'john@doe.com',
      // password: 'johnDoePass',
      // firstName: 'john',
      // lastName: 'doe',
      email: 'olani@gmail.com',
      password: 'Enny@CC.Secret001',
      firstName: 'Eniolaaaa',
      lastName: 'Olaniyannnntooo',
    }
    try {
      await authService.signUp(SignUpData);
      // Redirect to dashboard
      // window.location.href = '/dashboard';
    } catch (err) {
      console.error(err)
      throw new Error
    } finally {
      setLoading(false);
    }
  }

  return {
    formData,
    setFormData,
    errors,
    loading,
    currentStep,
    showPassword,
    showConfirmPassword,
    handleInputChange,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
    toggleShowPassword,
    toggleShowConfirmPassword,
    businessTypes,
    revenueRanges,
    employeeCounts,
  } as const;
}
