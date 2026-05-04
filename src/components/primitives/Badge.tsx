import React, { ReactNode } from 'react'

interface BadgeProps {
  label: string
  variant?: 'pending' | 'process' | 'painting' | 'done' | 'alert' | 'success'
  size?: 'sm' | 'md'
  icon?: ReactNode
}

const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'success',
  size = 'md',
  icon,
}) => {
  const variantClasses = {
    pending: 'badge-pending',
    process: 'badge-process',
    painting: 'badge-painting',
    done: 'badge-done',
    alert: 'badge-alert',
    success: 'bg-status-done bg-opacity-20 text-status-done',
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
  }

  return (
    <span className={`badge ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {icon && <span className="mr-1">{icon}</span>}
      {label}
    </span>
  )
}

export default Badge
