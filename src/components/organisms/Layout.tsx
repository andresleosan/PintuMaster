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

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <Header title={title} onMenuToggle={toggleSidebar} showMenuToggle />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-4">
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>

      {/* Mobile Bottom NavBar */}
      <NavBar />
    </div>
  )
}

export default Layout
