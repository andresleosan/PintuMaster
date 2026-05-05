import React, { useState, ReactNode } from 'react'
import Header from '@/components/molecules/Header'
import Sidebar from '@/components/molecules/Sidebar'
import NavBar from '@/components/molecules/NavBar'

interface LayoutProps {
  children: ReactNode
  title?: string
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'PintuMaster' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header title={title} onMenuToggle={() => setSidebarOpen(!sidebarOpen)} showMenuToggle />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto pb-20 md:pb-4 w-0">
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
      <NavBar />
    </div>
  )
}

export default Layout