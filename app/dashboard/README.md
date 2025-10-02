# Dashboard Module

This folder contains the modular dashboard implementation for CashFlow Co-Pilot, following the same component-driven architecture as the register module.

## Architecture Overview

The dashboard has been broken down into reusable components, hooks, types, and data management to improve maintainability and fix localStorage data consistency issues.

## Structure

```
dashboard/
├── page.tsx                 # Main dashboard page (orchestrates components)
├── _components/            # UI components (outside Next.js routing)
│   ├── DashboardHeader.tsx # Header with user info and actions
│   ├── MetricsCards.tsx    # Key financial metrics display
│   └── DashboardLoading.tsx # Loading states
├── _hooks/                 # Business logic hooks
│   ├── useAuth.ts          # Centralized authentication & data management
│   └── useDashboardData.ts # Dashboard data fetching and state
├── _types/                 # TypeScript definitions
│   └── index.ts            # All dashboard-related types
└── _data/                  # Data utilities
    └── mockData.ts         # Mock data generation for demo
```

## Key Features Fixed

### 🔧 **localStorage Data Management**
- **Unified storage**: New `UserData` interface consolidates user and business data
- **Legacy compatibility**: Maintains backward compatibility with existing localStorage keys
- **Data migration**: Automatically migrates old format to new unified format
- **Consistent access**: Single source of truth for user data across all dashboard pages

### 🏗️ **Component Architecture**
- **Modular design**: Each component has single responsibility
- **Prop-driven**: Components receive data via props, no direct localStorage access
- **Reusable**: Components can be used across different dashboard pages
- **TypeScript**: Full type safety with shared interfaces

### 🎣 **Custom Hooks**
- **useAuth**: Handles authentication, user data, and localStorage management
- **useDashboardData**: Manages dashboard-specific data fetching and state
- **Separation of concerns**: Business logic separated from UI components

## Data Flow

```
localStorage → useAuth → Dashboard → Components
                ↓
        useDashboardData → MetricsCards, etc.
```

1. **useAuth** loads and manages user/business data from localStorage
2. **useDashboardData** generates dashboard metrics based on business data
3. **Components** receive data via props and render UI
4. **Dashboard page** orchestrates everything and handles routing

## Storage Keys

### New Unified Format
- `cashflow_user_data`: Complete UserData object with user, business, and auth info

### Legacy Format (maintained for compatibility)
- `token`: Authentication token
- `userEmail`: User's email address
- `user`: User object (may be incomplete)
- `businessData`: Business information
- `userSettings`: User preferences

## Usage Examples

### Using the Auth Hook
```typescript
const { user, businessData, loading, logout, updateBusinessData } = useAuth()

// Update business data
updateBusinessData({ monthlyRevenue: '500000' })

// Logout and clear all data
logout()
```

### Using Dashboard Data Hook
```typescript
const { data, loading, refreshData, updateTimeRange } = useDashboardData(businessData)

// Refresh dashboard data
refreshData()

// Change time range
updateTimeRange('90days')
```

## Migration Guide

The new dashboard automatically handles data migration from the old format. No manual intervention is required.

### For other dashboard pages:
1. Import `useAuth` instead of manually accessing localStorage
2. Use the provided user and businessData from the hook
3. Update components to receive data via props
4. Use shared types from `_types/index.ts`

## Type Definitions

Key interfaces available in `_types/index.ts`:
- `User`: User profile information
- `BusinessData`: Business details and financial info
- `UserData`: Unified storage format
- `DashboardData`: Complete dashboard metrics
- `Transaction`, `Payment`, `AIInsight`: Data models

## Components

### DashboardHeader
- Displays user welcome message and business info
- Provides refresh, notifications, settings, and logout actions
- Responsive design with mobile considerations

### MetricsCards
- Shows key financial metrics (balance, income, expenses, health score)
- Includes cash runway calculation and status
- Loading states and responsive grid layout

### DashboardLoading
- Consistent loading experience across dashboard
- Customizable loading messages
- Brand-consistent styling

## Future Enhancements

1. **Real API Integration**: Replace mock data with actual API calls
2. **Chart Components**: Add financial charts and visualizations
3. **Error Boundaries**: Implement error handling for better UX
4. **Caching**: Add data caching for better performance
5. **Offline Support**: Consider offline functionality

## Development Notes

- All components use `"use client"` directive (client-heavy architecture)
- Components are prop-driven and testable
- Business logic is contained in hooks
- TypeScript provides full type safety
- Follows established patterns from register module