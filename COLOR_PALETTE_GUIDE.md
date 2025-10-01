# CashFlow Co-Pilot - Color Palette Guide

## New Color Palette (Updated October 2025)

This document outlines the new color palette implemented across the entire CashFlow Co-Pilot application.

### Primary Colors

| Usage | Color Name | Hex Code | CSS Class |
|-------|-----------|----------|-----------|
| **Primary Accent / CTA Button** | Vibrant Teal | `#00A878` | `bg-[#00A878]` `text-[#00A878]` |
| **Primary Hover State** | Darker Teal | `#008f68` | `bg-[#008f68]` `hover:bg-[#008f68]` |
| **Background (Left Panel)** | Charcoal Gray | `#2D3540` | `bg-[#2D3540]` |
| **Background (Right Form)** | Off-White | `#F4F6F9` | `bg-[#F4F6F9]` |
| **Primary Text** | Dark Gray | `#1F2937` | `text-[#1F2937]` |
| **Secondary Text** | Medium Gray | `#6B7280` | `text-[#6B7280]` |
| **Input Borders** | Light Gray | `#D1D5DB` | `border-[#D1D5DB]` |
| **Testimonial Background** | Subtle Darker Block | `#374151` | `bg-[#374151]` |

### Semantic Colors

| Usage | Color | Hex Code |
|-------|-------|----------|
| **Success** | Green | `#10B981` |
| **Success Light** | Light Green | `#D1FAE5` |
| **Warning** | Orange | `#F59E0B` |
| **Warning Light** | Light Orange | `#FEF3C7` |
| **Error** | Red | `#EF4444` |
| **Error Light** | Light Red | `#FEE2E2` |

## Usage Guidelines

### Buttons

- **Primary CTA Buttons**: Use `#00A878` (Vibrant Teal)
  - Hover state: `#008f68`
  - Example: Continue buttons, Submit buttons, Sign up buttons
  
```jsx
className="bg-[#00A878] hover:bg-[#008f68] text-white px-8 py-3 rounded-lg"
```

### Text Hierarchy

1. **Headings/Primary Text**: `#1F2937` (Dark Gray)
2. **Body Text/Secondary**: `#6B7280` (Medium Gray)
3. **Disabled/Placeholder**: `#6B7280` with opacity

### Form Elements

- **Input Borders**: `#D1D5DB` (Light Gray)
- **Focus Ring**: `#00A878` (Vibrant Teal)
- **Input Labels**: `#6B7280` (Medium Gray)
- **Focus Labels**: `#00A878` (Vibrant Teal)

```jsx
className="border border-[#D1D5DB] focus:ring-2 focus:ring-[#00A878]"
```

### Backgrounds

- **Left Panel (Branding)**: `#2D3540` (Charcoal Gray)
- **Right Panel (Forms)**: `#F4F6F9` (Off-White)
- **Testimonial Cards**: `#374151` (Subtle Darker)
- **Info Alerts**: `#00A878` with 10% opacity

### Links

- **Default**: `#00A878` (Vibrant Teal)
- **Hover**: `#008f68` (Darker Teal)

```jsx
className="text-[#00A878] hover:text-[#008f68] underline"
```

## Files Updated

### Authentication Pages
- ✅ `/app/auth/register/page.tsx`
- ✅ `/app/auth/register/_components/BrandingPanel.tsx`
- ✅ `/app/auth/register/_components/FormNavigation.tsx`
- ✅ `/app/auth/register/_components/ProgressSteps.tsx`
- ✅ `/app/auth/register/_components/AuthFooter.tsx`
- ✅ `/app/auth/register/_components/FormHeader.tsx`
- ✅ `/app/auth/register/_components/Alert.tsx`
- ✅ `/app/auth/register/_components/Testimonial.tsx`
- ✅ `/app/auth/register/_components/FormControls/TextInput.tsx`
- ✅ `/app/auth/register/_components/FormControls/PasswordInput.tsx`
- ✅ `/app/auth/register/_components/FormControls/Select.tsx`
- ✅ `/app/auth/register/_components/FormControls/RadioGroup.tsx`
- ✅ `/app/auth/register/_components/FormControls/Checkbox.tsx`
- ✅ `/app/auth/register/_components/Step3Preferences.tsx`
- ✅ `/app/auth/login/page.jsx`

### Other Pages (To Be Updated)
- ⏳ `/app/page.jsx` (Landing Page)
- ⏳ `/app/dashboard/page.jsx`
- ⏳ `/app/dashboard/chat/page.jsx`
- ⏳ `/app/dashboard/add-transaction/page.jsx`
- ⏳ `/app/setup/page.jsx`

## Tailwind Config

A new `tailwind.config.ts` file has been created with custom color definitions:

```typescript
colors: {
  primary: {
    DEFAULT: '#00A878',
    hover: '#008f68',
    light: '#00BCD4',
  },
  background: {
    dark: '#2D3540',
    light: '#F4F6F9',
    testimonial: '#374151',
  },
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
    light: '#9CA3AF',
  },
  border: {
    DEFAULT: '#D1D5DB',
    light: '#E5E7EB',
  },
  // ... semantic colors
}
```

## Next Steps

To complete the color palette update across the entire project:

1. Update Landing Page (`/app/page.jsx`)
   - Replace blue/purple gradients with teal
   - Update CTA buttons to use `#00A878`
   - Update navigation links hover states

2. Update Dashboard Pages
   - Replace purple accents with teal
   - Update chart colors to incorporate teal
   - Update action buttons

3. Update remaining auth pages
   - Forgot password page
   - Verification page

## Notes

- The old color palette used blue (`#3B82F6`) and purple (`#9333EA`) gradients
- The new palette is more professional and uses teal as the primary accent
- All interactive elements (buttons, links, form focus states) now use the teal color
- Gray tones provide better contrast and readability
