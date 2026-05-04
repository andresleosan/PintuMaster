import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '@/components/pages/LoginPage'
import DashboardPage from '@/components/pages/DashboardPage'
import WorkListPage from '@/components/pages/WorkListPage'
import FinancesPage from '@/components/pages/FinancesPage'
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
        <Route path="/trabajos" element={<WorkListPage />} />
        <Route path="/finanzas" element={<FinancesPage />} />
        <Route path="/inventario" element={<InventoryPage />} />
        <Route path="/empleados" element={<DashboardPage />} />
        <Route path="/reportes" element={<DashboardPage />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  )
}

export default App
