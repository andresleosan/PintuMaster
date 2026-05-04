import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '@/components/pages/LoginPage'
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
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Protected Routes (Semana 2+) */}
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* Trabajos Routes */}
        <Route path="/trabajos" element={<WorkListPage />} />
        <Route path="/trabajos/crear" element={<WorkCreatePage />} />
        <Route path="/trabajos/:id" element={<WorkDetailPage />} />
        
        {/* Finanzas Routes */}
        <Route path="/finanzas" element={<FinancesPage />} />
        <Route path="/finanzas/ingreso/crear" element={<IncomeCreatePage />} />
        <Route path="/finanzas/gasto/crear" element={<ExpenseCreatePage />} />
        
        {/* Inventario Routes */}
        <Route path="/inventario" element={<InventoryPage />} />
        
        {/* Other Routes */}
        <Route path="/empleados" element={<DashboardPage />} />
        <Route path="/reportes" element={<DashboardPage />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  )
}

export default App
