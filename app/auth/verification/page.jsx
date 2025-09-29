"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./verify.css";

const Verification = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [loading, setLoading] = useState(false);

  // Handle OTP input
  const handleChange = (index, e) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 1) {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input
      if (value && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  // Handle Backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  // Handle OTP Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const enteredOtp = otp.join("");

    try {
      const response = await fetch("https://your-api-url.com/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: enteredOtp }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("OTP Verified Successfully!", { position: "top-right" });
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        throw new Error(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error(error.message, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP function
  const handleResend = () => {
    toast.info("New OTP sent!", { position: "top-right" });
    // Call API to resend OTP
  };

  return (
    <div className="verify-background">
      <ToastContainer />
      <div className="otp-container">
        <h2 className="text-2xl font-semibold text-gray-800">Verify Your Account</h2>
        <p className="text-gray-600 text-sm mt-2">Enter the 4-digit code sent to your email.</p>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="otp-input"
                value={digit}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={inputRefs[index]}
              />
            ))}
          </div>

          <button type="submit" className="verify-button" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <p className="resend-text">
            Didn't receive the code?{" "}
            <button onClick={handleResend} className="resend-button">
              Resend OTP
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Verification;
