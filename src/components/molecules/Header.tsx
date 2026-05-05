import React from 'react'

interface HeaderProps {
  title?: string
  onMenuToggle?: () => void
  showMenuToggle?: boolean
}

const Header: React.FC<HeaderProps> = ({
  title = 'PintuMaster',
  onMenuToggle,
  showMenuToggle = false,
}) => {
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (e) {
      // ignore errors for browsers that block fullscreen
    }
  }

  return (
    <header className="header">
      <div className="flex items-center gap-4">
        {showMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="md:hidden text-white hover:bg-gray-700 p-2 rounded"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}
        <h1 className="text-xl font-bold">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          title="Alternar pantalla completa"
          onClick={toggleFullscreen}
          className="hover:bg-gray-700 p-2 rounded transition"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v16.5A2.25 2.25 0 003.75 22.5h16.5a2.25 2.25 0 002.25-2.25V13.5m-18-5h5m-5 5l5-5m5 5h5m-5 5l5-5"
            />
          </svg>
        </button>

        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
          AD
        </div>
      </div>
    </header>
  )
}

export default Header
