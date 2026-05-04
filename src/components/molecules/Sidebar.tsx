import React from 'react'
import { Link, useLocation } from 'react-router-dom'

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
  const isActive = (path: string) => location.pathname === path

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
          fixed md:sticky md:top-16 left-0 top-0 bottom-0 w-56 bg-dark text-white
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

        <div className="p-6 border-b border-gray-700 hidden md:block">
          <div className="text-center">
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

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <button className="w-full bg-primary hover:bg-red-700 text-white py-2 rounded transition">
            Cerrar Sesión
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
