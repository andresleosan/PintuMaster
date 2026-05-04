import React, { useEffect, useState } from 'react'

export interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

interface ToastProps {
  toast: ToastMessage | null
  onClose: () => void
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (toast) {
      setIsVisible(true)
      const timer = setTimeout(
        () => {
          setIsVisible(false)
          setTimeout(onClose, 300)
        },
        toast.duration || 3000
      )
      return () => clearTimeout(timer)
    }
  }, [toast, onClose])

  if (!toast || !isVisible) return null

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  }[toast.type]

  const icon = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  }[toast.type]

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3 max-w-md animate-in fade-in slide-in-from-top-2 duration-300">
      <div
        className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 transform transition-all`}
      >
        <span className="text-xl font-bold">{icon}</span>
        <span className="text-sm font-medium">{toast.message}</span>
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(onClose, 300)
          }}
          className="ml-2 hover:opacity-80 transition"
        >
          ×
        </button>
      </div>
    </div>
  )
}

// Hook para usar Toast
export const useToast = () => {
  const [toast, setToast] = useState<ToastMessage | null>(null)

  const showToast = (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info',
    duration = 3000
  ) => {
    setToast({
      id: Date.now().toString(),
      message,
      type,
      duration,
    })
  }

  const closeToast = () => setToast(null)

  return {
    toast,
    showToast,
    closeToast,
    success: (msg: string) => showToast(msg, 'success'),
    error: (msg: string) => showToast(msg, 'error'),
    info: (msg: string) => showToast(msg, 'info'),
    warning: (msg: string) => showToast(msg, 'warning'),
  }
}

export default Toast
