import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import LoadingFallback from '@/components/ui/LoadingFallback'

const LoginPage = lazy(() => import('@/components/pages/LoginPage'))
const SignupPage = lazy(() => import('@/components/pages/SignupPage'))
const DashboardPage = lazy(() => import('@/components/pages/DashboardPage'))
const WorkListPage = lazy(() => import('@/components/pages/WorkListPage'))
const WorkCreatePage = lazy(() => import('@/components/pages/WorkCreatePage'))
const WorkDetailPage = lazy(() => import('@/components/pages/WorkDetailPage'))
const FinancesPage = lazy(() => import('@/components/pages/FinancesPage'))
const IncomeCreatePage = lazy(() => import('@/components/pages/IncomeCreatePage'))
const ExpenseCreatePage = lazy(() => import('@/components/pages/ExpenseCreatePage'))
const InventoryPage = lazy(() => import('@/components/pages/InventoryPage'))
const InventoryCreatePage = lazy(() => import('@/components/pages/InventoryCreatePage'))
const EmployeesPage = lazy(() => import('@/components/pages/EmployeesPage'))
const ReportsPage = lazy(() => import('@/components/pages/ReportsPage'))

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />
            <Route path="/trabajos" element={<ProtectedRoute element={<WorkListPage />} />} />
            <Route path="/trabajos/crear" element={<ProtectedRoute element={<WorkCreatePage />} />} />
            <Route path="/trabajos/:id" element={<ProtectedRoute element={<WorkDetailPage />} />} />
            <Route path="/finanzas" element={<ProtectedRoute element={<FinancesPage />} />} />
            <Route path="/finanzas/ingreso/crear" element={<ProtectedRoute element={<IncomeCreatePage />} />} />
            <Route path="/finanzas/gasto/crear" element={<ProtectedRoute element={<ExpenseCreatePage />} />} />
            <Route path="/inventario" element={<ProtectedRoute element={<InventoryPage />} />} />
            <Route path="/inventario/crear" element={<ProtectedRoute element={<InventoryCreatePage />} />} />
            <Route path="/empleados" element={<ProtectedRoute element={<EmployeesPage />} />} />
            <Route path="/reportes" element={<ProtectedRoute element={<ReportsPage />} />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  )
}

export default App
