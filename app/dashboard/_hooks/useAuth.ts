import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { User, BusinessData, UserData } from '../_types'

const STORAGE_KEYS = {
  USER_DATA: 'cashflow_user_data',
  TOKEN: 'token',
  USER_EMAIL: 'userEmail', // Legacy support
  BUSINESS_DATA: 'businessData', // Legacy support
  USER: 'user' // Legacy support
} as const

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [businessData, setBusinessData] = useState<BusinessData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  // Initialize auth state from localStorage
  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = useCallback(() => {
    try {
      // Try new unified storage first
      const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA)
      if (userData) {
        const parsedData: UserData = JSON.parse(userData)
        setUser(parsedData.user)
        setBusinessData(parsedData.businessData)
        setIsAuthenticated(true)
        setLoading(false)
        return
      }

      // Fallback to legacy storage format
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
      const userEmail = localStorage.getItem(STORAGE_KEYS.USER_EMAIL)
      const legacyUser = localStorage.getItem(STORAGE_KEYS.USER)
      const legacyBusinessData = localStorage.getItem(STORAGE_KEYS.BUSINESS_DATA)

      if (token && userEmail) {
        // Reconstruct user data from legacy format
        const userObj: User = legacyUser 
          ? JSON.parse(legacyUser) 
          : { email: userEmail }

        const businessObj: BusinessData | null = legacyBusinessData 
          ? JSON.parse(legacyBusinessData)
          : null

        setUser(userObj)
        setBusinessData(businessObj)
        setIsAuthenticated(true)

        // Migrate to new format
        if (businessObj) {
          saveUserData(userObj, businessObj, token)
        }
      } else {
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Error loading user data:', error)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }, [])

  const saveUserData = useCallback((userData: User, businessData: BusinessData, token: string) => {
    const unifiedData: UserData = {
      user: userData,
      businessData,
      token,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    }

    // Save to new unified format
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(unifiedData))
    
    // Keep legacy format for backward compatibility
    localStorage.setItem(STORAGE_KEYS.TOKEN, token)
    localStorage.setItem(STORAGE_KEYS.USER_EMAIL, userData.email)
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData))
    localStorage.setItem(STORAGE_KEYS.BUSINESS_DATA, JSON.stringify(businessData))

    setUser(userData)
    setBusinessData(businessData)
    setIsAuthenticated(true)
  }, [])

  const updateBusinessData = useCallback((newBusinessData: Partial<BusinessData>) => {
    if (!businessData || !user) return

    const updatedBusinessData = { ...businessData, ...newBusinessData }
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN) || ''
    
    saveUserData(user, updatedBusinessData, token)
  }, [businessData, user, saveUserData])

  const updateUser = useCallback((newUserData: Partial<User>) => {
    if (!user || !businessData) return

    const updatedUser = { ...user, ...newUserData }
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN) || ''
    
    saveUserData(updatedUser, businessData, token)
  }, [user, businessData, saveUserData])

  const logout = useCallback(() => {
    // Clear all storage
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
    
    // Clear additional legacy keys
    localStorage.removeItem('userSettings')
    localStorage.removeItem('businessName') // From register
    localStorage.removeItem('isNewUser')
    
    setUser(null)
    setBusinessData(null)
    setIsAuthenticated(false)
    
    router.push('/auth/login')
  }, [router])

  const requireAuth = useCallback(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/login')
      return false
    }
    return true
  }, [loading, isAuthenticated, router])

  return {
    user,
    businessData,
    loading,
    isAuthenticated,
    updateUser,
    updateBusinessData,
    logout,
    requireAuth,
    saveUserData
  }
}