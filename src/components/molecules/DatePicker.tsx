import React, { useState, useRef, useEffect } from 'react'

interface DatePickerProps {
  value?: string
  onChange: (date: string) => void
  label?: string
  placeholder?: string
  minDate?: string
  maxDate?: string
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  placeholder = 'Seleccionar fecha...',
  minDate,
  maxDate,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(
    value ? new Date(value) : new Date()
  )
  const dropdownRef = useRef<HTMLDivElement>(null)

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const days = []
  const firstDay = getFirstDayOfMonth(currentMonth)
  const daysInMonth = getDaysInMonth(currentMonth)

  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i))
  }

  const handleDateClick = (day: Date) => {
    const dateStr = formatDate(day)
    onChange(dateStr)
    setIsOpen(false)
  }

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    )
  }

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    )
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const displayDate = value
    ? new Date(value).toLocaleDateString('es-CO')
    : placeholder

  return (
    <div ref={dropdownRef} className="relative w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
      >
        <span className={value ? 'text-gray-900' : 'text-gray-500'}>
          {displayDate}
        </span>
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevMonth}
              className="p-1 hover:bg-gray-100 rounded"
            >
              ← Anterior
            </button>
            <h3 className="text-sm font-semibold">
              {currentMonth.toLocaleDateString('es-CO', {
                month: 'long',
                year: 'numeric',
              })}
            </h3>
            <button
              onClick={handleNextMonth}
              className="p-1 hover:bg-gray-100 rounded"
            >
              Siguiente →
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-semibold text-gray-600 p-2"
              >
                {day}
              </div>
            ))}
            {days.map((day, idx) => (
              <button
                key={idx}
                onClick={() => day && handleDateClick(day)}
                disabled={
                  !day ||
                  Boolean(minDate && formatDate(day!) < minDate) ||
                  Boolean(maxDate && formatDate(day!) > maxDate)
                }
                className={`p-2 text-sm rounded transition-all ${
                  !day
                    ? 'text-gray-200'
                    : value === formatDate(day!)
                    ? 'bg-primary text-white font-semibold'
                    : 'hover:bg-gray-100 text-gray-900'
                } ${
                  day &&
                  minDate &&
                  formatDate(day!) < minDate
                    ? 'text-gray-300 cursor-not-allowed'
                    : ''
                }`}
              >
                {day?.getDate()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DatePicker
