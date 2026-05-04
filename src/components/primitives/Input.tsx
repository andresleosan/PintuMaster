import React, { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: ReactNode
  required?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, required, className = '', ...props }, ref) => {
    return (
      <div className="form-group">
        {label && (
          <label className="form-label">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && <div className="absolute left-3 top-3 text-gray-500">{icon}</div>}
          <input
            ref={ref}
            className={`
              input
              ${icon ? 'pl-10' : ''}
              ${error ? 'input-error' : ''}
              ${className}
            `.trim().replace(/\s+/g, ' ')}
            {...props}
          />
        </div>
        {error && <p className="form-error">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
