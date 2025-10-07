"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiMail, FiArrowLeft, FiRefreshCw, FiCheck } from 'react-icons/fi';

function VerificationForm() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  useEffect(() => {
    if (!email) {
      router.push('/auth/register');
    }
  }, [email, router]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) return;
    
    setLoading(true);
    setError('');
    
    try {
      const { confirmSignUp } = await import('../../../lib/cognito');
      
      await confirmSignUp(email, code);

      // Get pending user data
      const pendingUser = sessionStorage.getItem('pendingUser');
      
      if (pendingUser) {
        const userData = JSON.parse(pendingUser);
        
        // Store verified user data for profile creation
        localStorage.setItem("userEmail", userData.email);
        localStorage.setItem("businessName", userData.businessName);
        localStorage.setItem("isNewUser", "true");
        localStorage.setItem("pendingProfileCreation", "true");
        localStorage.setItem("pendingUser", pendingUser); // Keep the full data
        
        // Clear session storage
        sessionStorage.removeItem('pendingUser');
      }
      
      setSuccess('Email verified successfully!');
      setTimeout(() => {
        router.push('/auth/login?verified=true');
      }, 1500);
    } catch (err: any) {
      console.error('Verification error:', err);
      setError(err.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    setSuccess('');
    
    try {
      const { resendConfirmationCode } = await import('../../../lib/cognito');
      
      await resendConfirmationCode(email);
      
      console.log('Verification code resent to:', email);
      setSuccess('Verification code sent! Check your email.');
    } catch (err: any) {
      console.error('Resend error:', err);
      setError(err.message || 'Failed to resend code. Please try again.');
    } finally {
      setResending(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(value);
    setError('');
  };

  if (!email) {
    return null;
  }

  return (
    <div className="min-h-screen bg-brand-gray-light flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <button 
              onClick={() => router.push('/auth/register')}
              className="flex items-center text-brand-text-medium hover:text-brand-text-dark mb-6 mx-auto"
            >
              <FiArrowLeft className="h-4 w-4 mr-2" />
              Back to registration
            </button>
            
            <div className="bg-brand-teal/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FiMail className="h-8 w-8 text-brand-teal" />
            </div>
            
            <h2 className="text-3xl font-bold text-brand-text-dark mb-2">Check Your Email</h2>
            <p className="text-brand-text-medium">
              We sent a 6-digit verification code to
            </p>
            <p className="font-semibold text-brand-text-dark">{email}</p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center">
              <FiCheck className="h-5 w-5 mr-2" />
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Verification Form */}
          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label htmlFor="code" className="block text-sm font-semibold text-brand-text-dark mb-2">
                Verification Code
              </label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={handleCodeChange}
                placeholder="000000"
                className="block w-full px-4 py-3 text-center text-2xl font-mono border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent tracking-widest"
                maxLength={6}
                autoComplete="one-time-code"
              />
              <p className="mt-1 text-sm text-brand-text-medium">
                Enter the 6-digit code from your email
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Verifying...
                </div>
              ) : (
                "Verify Email"
              )}
            </button>
          </form>

          {/* Resend Code */}
          <div className="mt-6 text-center">
            <p className="text-brand-text-medium mb-2">Didn't receive the code?</p>
            <button
              onClick={handleResend}
              disabled={resending}
              className="text-brand-teal hover:text-brand-teal-dark font-medium flex items-center justify-center mx-auto disabled:opacity-70"
            >
              {resending ? (
                <>
                  <FiRefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <FiRefreshCw className="h-4 w-4 mr-2" />
                  Resend Code
                </>
              )}
            </button>
          </div>

          {/* Demo Notice */}
          <div className="mt-6 bg-brand-teal/10 border border-brand-teal/30 rounded-lg p-4 text-center">
            <p className="text-sm text-brand-teal">
              <strong>Demo Mode:</strong> Use any 6-digit code (e.g., 123456) to verify
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerificationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerificationForm />
    </Suspense>
  );
}
