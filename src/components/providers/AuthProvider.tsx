import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/stores/authStore'

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false)
  const { initializeAuth, isInitialized } = useAuthStore()

  useEffect(() => {
    // Initialize Firebase auth listener
    initializeAuth()
    
    // Wait for auth to initialize
    const timer = setTimeout(() => {
      setMounted(true)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [initializeAuth])

  if (!mounted || !isInitialized) {
    return null
  }

  return <>{children}</>
}
