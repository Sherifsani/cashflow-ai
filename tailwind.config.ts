/** @type {import('tailwindcss').Config} */

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // New Brand Color Palette
        primary: {
          DEFAULT: '#00A878', // Vibrant Teal - Primary Accent/CTA
          hover: '#008f68',
          light: '#00BCD4',
        },
        background: {
          dark: '#2D3540',      // Charcoal Gray - Left Panel
          light: '#F4F6F9',     // Off-White - Right Form
          testimonial: '#374151', // Testimonial block
        },
        text: {
          primary: '#1F2937',   // Dark Gray - Primary text
          secondary: '#6B7280', // Medium Gray - Secondary/Inert text
          light: '#9CA3AF',     // Lighter gray for hints
        },
        border: {
          DEFAULT: '#D1D5DB',   // Light Gray - Input borders
          light: '#E5E7EB',     // Even lighter for dividers
        },
        // Keep semantic colors but update to match palette
        success: {
          DEFAULT: '#10B981',
          light: '#D1FAE5',
          dark: '#059669',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FEF3C7',
          dark: '#D97706',
        },
        error: {
          DEFAULT: '#EF4444',
          light: '#FEE2E2',
          dark: '#DC2626',
        },
        info: {
          DEFAULT: '#00A878',  // Use primary teal for info
          light: '#CCFBF1',
          dark: '#008f68',
        },
      },
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
