import React, { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  onClick?: () => void
  hoverable?: boolean
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, onClick, hoverable = false, shadow = 'md', className = '' }, ref) => {
    const shadowClasses = {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
    }

    const finalClasses = `
      card
      ${shadowClasses[shadow]}
      ${hoverable ? 'hover:shadow-lg cursor-pointer' : ''}
      ${onClick ? 'cursor-pointer' : ''}
      ${className}
    `.trim().replace(/\s+/g, ' ')

    return (
      <div ref={ref} className={finalClasses} onClick={onClick}>
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card
