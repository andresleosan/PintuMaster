import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

interface NavItem {
  label: string
  path: string
  icon?: React.ReactNode
}

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
  items?: NavItem[]
}

const defaultItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Trabajos', path: '/trabajos' },
  { label: 'Finanzas', path: '/finanzas' },
  { label: 'Inventario', path: '/inventario' },
  { label: 'Empleados', path: '/empleados' },
  { label: 'Reportes', path: '/reportes' },
]

const Sidebar: React.FC<SidebarProps> = ({
  isOpen = true,
  onClose,
  items = defaultItems,
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuthStore()
  const isActive = (path: string) => location.pathname === path

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky md:top-16 left-0 top-0 bottom-0 w-56 bg-dark text-white relative
          transform transition-transform duration-300 z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:block md:min-h-[calc(100vh-60px)]
          overflow-y-auto
        `}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-700 md:hidden">
          <button
            onClick={onClose}
            className="text-white hover:bg-gray-700 p-2 rounded ml-auto block"
          >
            ✕
          </button>
        </div>

        <div className="p-4 border-b border-gray-700">
          <div className="hidden md:flex flex-col items-start">
            <div className="inline-block bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
              PM
            </div>
            <p className="text-primary font-bold mt-2 text-sm">PintuMaster</p>
          </div>

        
        </div>

        {/* Navigation */}
        <nav className="py-4">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`
                px-6 py-3 flex items-center gap-3 transition-all border-l-4
                ${
                  isActive(item.path)
                    ? 'bg-primary bg-opacity-20 border-primary text-primary font-semibold'
                    : 'border-transparent text-gray-300 hover:bg-gray-800 hover:text-white'
                }
              `}
            >
              {item.icon && <span className="w-5 h-5">{item.icon}</span>}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Desktop logout button (anchored to aside bottom) */}
        <div className="hidden md:block">
          <button
            onClick={handleLogout}
            title="Cerrar Sesión"
            aria-label="Cerrar sesión"
            className="absolute bottom-[160px] left-4 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path fillRule="evenodd" d="M3 4.5A1.5 1.5 0 014.5 3h7A1.5 1.5 0 0113 4.5V7a.75.75 0 01-1.5 0V4.5a.5.5 0 00-.5-.5h-7a.5.5 0 00-.5.5v11a.5.5 0 00.5.5h7a.5.5 0 00.5-.5V12a.75.75 0 011.5 0v2.5A1.5 1.5 0 0111.5 16h-7A1.5 1.5 0 013 14.5v-10z" clipRule="evenodd" />
            </svg>
            <span>Cerrar</span>
          </button>
        </div>

        {/* Footer (mobile only) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 md:hidden">
          <button 
            onClick={handleLogout}
            className="w-full bg-primary hover:bg-red-700 text-white py-2 rounded transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
