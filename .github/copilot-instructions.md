# CashFlow Co-Pilot - AI Agent Instructions

## Project Overview
CashFlow Co-Pilot is a Next.js 15 financial platform for Nigerian SMEs providing AI-powered cashflow forecasting. The app uses Next.js App Router with TypeScript, Tailwind CSS v4, and a component-driven architecture.

## Architecture Patterns

### Client-Side Heavy Architecture
- **ALL interactive components use `"use client"`** - this is a client-heavy React app
- Server components only for static layouts (`app/layout.tsx`)
- Authentication state managed via `localStorage` with `useEffect` hooks
- No server-side session management currently implemented

### Component Organization
- **Underscore-prefixed directories** (`_components/`, `_hooks/`) are outside Next.js routing
- **Presentational vs Logic separation**: Components are prop-driven, business logic lives in custom hooks
- **Form pattern**: Multi-step forms use single hook for state + validation (see `app/auth/register/`)

### State Management Patterns
```typescript
// Standard pattern for client state with localStorage persistence
const [user, setUser] = useState<User | null>(null)
useEffect(() => {
  const userData = localStorage.getItem('user')
  if (userData) setUser(JSON.parse(userData))
}, [])
```

## Styling System

### Brand Colors (Use exact hex values)
- **Primary CTA**: `bg-[#00A878]` or `bg-primary` (vibrant teal)
- **Primary Hover**: `bg-[#008f68]` or `bg-primary-dark` (darker teal) 
- **Dark Background**: `bg-[#2D3540]` or `bg-background-dark` (charcoal gray)
- **Light Background**: `bg-[#F4F6F9]` or `bg-background-light` (off-white)
- **Primary Text**: `text-[#1F2937]` or `text-text-primary`, **Secondary**: `text-[#6B7280]` or `text-text-secondary`

### Color System Architecture
- **CSS Custom Properties**: Defined in `app/globals.css` with `--brand-*` prefix
- **Tailwind v4 Integration**: Uses `@theme` block to map brand colors to Tailwind utilities
- **Legacy Support**: `app-*` prefixed classes for existing components (mapped to brand colors)
- **Utility Classes**: Direct hex values `bg-[#00A878]` still work but prefer semantic names

### Available Color Classes
```css
/* Brand colors */
bg-primary, text-primary, border-primary
bg-background-dark, bg-background-light
text-text-primary, text-text-secondary

/* Legacy app-* classes (automatically mapped) */
bg-app-bg-dark, bg-app-bg-light
text-app-text-primary, text-app-text-secondary
border-app-border
```

## Key Development Workflows

### Running the App
```bash
pnpm dev          # Uses --turbopack for faster builds
pnpm build        # Production build
pnpm lint         # ESLint with TypeScript rules
```

### Form Component Pattern
Follow the register module structure:
1. **Page component** (`page.tsx`) - orchestrates steps and hook
2. **Types file** (`types.ts`) - shared TypeScript interfaces
3. **Custom hook** (`_hooks/useFormName.ts`) - state, validation, submit logic
4. **Step components** (`_components/StepN.tsx`) - presentational only
5. **Form controls** (`_components/FormControls/`) - reusable inputs

### Form Hook Pattern
```typescript
// Standard form hook structure
export default function useRegisterForm() {
  const [formData, setFormData] = useState<FormData>({...})
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)
  
  const handleInputChange = useCallback((e) => {
    // Update formData and clear errors
  }, [errors])
  
  const validateStep = useCallback((step) => {
    // Return boolean, set errors state
  }, [formData])
  
  return { formData, errors, loading, handleInputChange, validateStep }
}
```

## Critical Files to Understand

### Configuration
- `tailwind.config.ts` - Minimal config, uses CSS custom properties
- `app/globals.css` - Brand color variables and utility classes
- `COLOR_PALETTE_GUIDE.md` - Complete color usage reference

### Key Components
- `app/auth/register/` - **Reference implementation** for complex multi-step forms
- `app/dashboard/page.tsx` - Main dashboard with data visualization patterns
- `app/page.jsx` - Landing page with auth-aware navigation

### Component Patterns
- **TextInput with floating labels**: Uses `peer-placeholder-shown` Tailwind patterns
- **Icon integration**: Lucide React (`lucide-react`) + React Icons (`react-icons/fi`)
- **Responsive layouts**: Grid-based layouts with `grid-cols-2` patterns

## Development Conventions

### TypeScript Standards
- **No `React.FC`** - use explicit function declarations
- **Prop types** at top of file after imports for complex components
- **Client components** always start with `"use client"`

### File Naming
- **Pages**: `page.tsx` (App Router convention)
- **Components**: PascalCase (e.g., `BrandingPanel.tsx`)
- **Hooks**: `useHookName.ts` with default export
- **Types**: `types.ts` with named exports

### Commit Practices
- Small, logical commits (referenced in `COPILOT_INSTRUCTIONS.md`)
- No remote pushes unless explicitly requested
- Plan first, implement after user approval

## Integration Points
- **Axios** for API calls (configured but endpoints TBD)
- **Framer Motion** for animations
- **Recharts** for dashboard data visualization
- **React Toastify** for notifications

## Authentication Flow
- Landing page checks `localStorage.getItem('token')` and `userEmail`
- No backend integration yet - forms use setTimeout mock submissions
- Dashboard requires `user` and `businessData` in localStorage

When working on this codebase, prioritize the existing patterns over generic React practices. The app heavily uses client-side state and localStorage for persistence.