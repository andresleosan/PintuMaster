import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/stores/authStore'

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    // Wait for Zustand to rehydrate from localStorage
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return null
  }
  
  return <>{children}</>
}
