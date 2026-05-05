import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import LoginPage from '@/components/pages/LoginPage'
import SignupPage from '@/components/pages/SignupPage'
import DashboardPage from '@/components/pages/DashboardPage'
import WorkListPage from '@/components/pages/WorkListPage'
import WorkCreatePage from '@/components/pages/WorkCreatePage'
import WorkDetailPage from '@/components/pages/WorkDetailPage'
import FinancesPage from '@/components/pages/FinancesPage'
import IncomeCreatePage from '@/components/pages/IncomeCreatePage'
import ExpenseCreatePage from '@/components/pages/ExpenseCreatePage'
import InventoryPage from '@/components/pages/InventoryPage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Protected Routes (Semana 2+) */}
          <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />
          
          {/* Trabajos Routes */}
          <Route path="/trabajos" element={<ProtectedRoute element={<WorkListPage />} />} />
          <Route path="/trabajos/crear" element={<ProtectedRoute element={<WorkCreatePage />} />} />
          <Route path="/trabajos/:id" element={<ProtectedRoute element={<WorkDetailPage />} />} />
          
          {/* Finanzas Routes */}
          <Route path="/finanzas" element={<ProtectedRoute element={<FinancesPage />} />} />
          <Route path="/finanzas/ingreso/crear" element={<ProtectedRoute element={<IncomeCreatePage />} />} />
          <Route path="/finanzas/gasto/crear" element={<ProtectedRoute element={<ExpenseCreatePage />} />} />
          
          {/* Inventario Routes */}
          <Route path="/inventario" element={<ProtectedRoute element={<InventoryPage />} />} />
          
          {/* Other Routes */}
          <Route path="/empleados" element={<ProtectedRoute element={<DashboardPage />} />} />
          <Route path="/reportes" element={<ProtectedRoute element={<DashboardPage />} />} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
