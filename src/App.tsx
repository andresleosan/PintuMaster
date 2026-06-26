import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import LoadingFallback from '@/components/ui/LoadingFallback'
import { isConfigValid } from '@/services/firebase'

function FirebaseConfigError() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center text-5xl">⚠️</div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Error de Configuración
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Firebase no se ha inicializado correctamente porque faltan las variables de entorno.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-red-100">
          <h3 className="text-lg font-medium text-red-800 mb-4">¿Cómo solucionar este error?</h3>
          
          <div className="space-y-6 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">1. En Producción (Cloudflare Pages):</h4>
              <p className="mb-2">Debes configurar las variables de entorno en el panel de Cloudflare para que estén disponibles durante la compilación (build):</p>
              <ol className="list-decimal list-inside space-y-1 pl-2 text-gray-600">
                <li>Ve al panel de tu proyecto en <strong>Cloudflare Pages</strong>.</li>
                <li>Navega a <strong>Settings</strong> (Configuración) &gt; <strong>Environment variables</strong> (Variables de entorno).</li>
                <li>Haz clic en <strong>Add variables</strong> (Agregar variables) y añade las siguientes claves (tanto para <strong>Production</strong> como para <strong>Preview</strong>):</li>
              </ol>
              
              <div className="bg-gray-100 p-3 rounded mt-3 font-mono text-xs overflow-x-auto space-y-1">
                <div>VITE_FIREBASE_API_KEY</div>
                <div>VITE_FIREBASE_AUTH_DOMAIN</div>
                <div>VITE_FIREBASE_PROJECT_ID</div>
                <div>VITE_FIREBASE_STORAGE_BUCKET</div>
                <div>VITE_FIREBASE_MESSAGING_SENDER_ID</div>
                <div>VITE_FIREBASE_APP_ID</div>
              </div>
              
              <p className="mt-3 text-xs text-amber-700 font-medium bg-amber-50 p-2 rounded border border-amber-200">
                ⚠️ Importante: Después de guardar las variables en Cloudflare, debes realizar un nuevo despliegue (redeploy) o hacer un commit para que el build de Vite aplique los cambios.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-semibold text-gray-900 mb-1">2. En Desarrollo Local:</h4>
              <p>
                Asegúrate de tener un archivo <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-xs">.env</code> en la raíz del proyecto.
                Puedes copiar el archivo <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-xs">.env.example</code>, renombrarlo a <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-xs">.env</code> y rellenar las credenciales correspondientes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

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
  if (!isConfigValid) {
    return <FirebaseConfigError />
  }

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
