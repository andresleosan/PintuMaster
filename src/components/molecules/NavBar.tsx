import React from 'react'
import { Link, useLocation } from 'react-router-dom'

interface NavBarItem {
  label: string
  path: string
  icon: React.ReactNode
}

interface NavBarProps {
  items?: NavBarItem[]
}

const defaultItems: NavBarItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m2-2l6-6m6 6l2 3m-2 3v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7m14 0V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2z" />
      </svg>
    ),
  },
  {
    label: 'Trabajos',
    path: '/trabajos',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    label: 'Finanzas',
    path: '/finanzas',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Perfil',
    path: '/perfil',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
]

const NavBar: React.FC<NavBarProps> = ({ items = defaultItems }) => {
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 z-40">
      <div className="flex justify-around items-center h-16">
        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex flex-col items-center justify-center w-full h-full py-2
              transition-colors
              ${
                isActive(item.path)
                  ? 'text-primary border-t-2 border-primary'
                  : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            {item.icon}
            <span className="text-xs mt-1 font-semibold">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default NavBar
