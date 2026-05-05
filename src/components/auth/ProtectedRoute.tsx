import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

interface ProtectedRouteProps {
  element: React.ReactElement
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const user = useAuthStore((state) => state.user)
  const loading = useAuthStore((state) => state.loading)
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          </div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  return element
}
