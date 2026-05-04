import React from 'react'

export interface TimelineStep {
  id: string
  label: string
  description?: string
  status: 'completed' | 'active' | 'pending'
  date?: string
}

interface TimelineProps {
  steps: TimelineStep[]
}

export const Timeline: React.FC<TimelineProps> = ({ steps }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'active':
        return 'bg-primary'
      case 'pending':
        return 'bg-gray-300'
      default:
        return 'bg-gray-300'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✓'
      case 'active':
        return '→'
      case 'pending':
        return '○'
      default:
        return '○'
    }
  }

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-6 top-12 bottom-0 w-1 bg-gray-200" />

      {/* Steps */}
      <div className="space-y-6">
        {steps.map((step) => (
          <div key={step.id} className="relative pl-20">
            {/* Circle */}
            <div
              className={`absolute -left-2 top-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${getStatusColor(
                step.status
              )}`}
            >
              {getStatusIcon(step.status)}
            </div>

            {/* Content */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">{step.label}</h4>
                  {step.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {step.description}
                    </p>
                  )}
                </div>
                {step.date && (
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                    {new Date(step.date).toLocaleDateString('es-CO')}
                  </span>
                )}
              </div>

              {/* Status badge */}
              <div className="mt-2">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    step.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : step.status === 'active'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {step.status === 'completed'
                    ? 'Completado'
                    : step.status === 'active'
                    ? 'En Progreso'
                    : 'Pendiente'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline
