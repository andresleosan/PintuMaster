import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Timeline, Modal, useToast } from '@/components/organisms'
import { Button, Card, Badge } from '@/components/primitives'
import { Select } from '@/components/molecules'

interface WorkDetail {
  id: string
  placa: string
  cliente: string
  tipo: string
  estado: 'Pendiente' | 'En proceso' | 'Pintura' | 'Terminado'
  precio: number
  descripcion: string
  fecha: string
}

const MOCK_WORK: WorkDetail = {
  id: '1',
  placa: 'ABC-123',
  cliente: 'Juan Pérez',
  tipo: 'Pintura Completa',
  estado: 'En proceso',
  precio: 150000,
  descripcion: 'Repintado completo del vehículo con preparación de superficie',
  fecha: '2026-05-15',
}

export const WorkDetailPage: React.FC = () => {
  const navigate = useNavigate()
  const { showToast } = useToast()

  const [work, setWork] = useState<WorkDetail>(MOCK_WORK)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [newStatus, setNewStatus] = useState(work.estado)

  const timelineSteps = [
    {
      id: '1',
      label: 'Trabajo Recibido',
      description: 'Vehículo ingresado a taller',
      status: 'completed' as const,
      date: '2026-05-01',
    },
    {
      id: '2',
      label: 'En Preparación',
      description: 'Limpieza y preparación de superficie',
      status: 'completed' as const,
      date: '2026-05-05',
    },
    {
      id: '3',
      label: 'Pintando',
      description: 'Aplicación de pintura',
      status: 'active' as const,
      date: '2026-05-10',
    },
    {
      id: '4',
      label: 'Secado y Control',
      description: 'Secado final y control de calidad',
      status: 'pending' as const,
    },
    {
      id: '5',
      label: 'Entrega',
      description: 'Vehículo listo para entrega',
      status: 'pending' as const,
    },
  ]

  const handleStatusUpdate = () => {
    setWork((prev) => ({ ...prev, estado: newStatus }))
    setIsEditModalOpen(false)
    showToast('Estado actualizado exitosamente', 'success')
  }

  return (
    <Layout title="Detalle del Trabajo">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {work.placa}
              </h2>
              <p className="text-gray-600 mb-4">Cliente: {work.cliente}</p>
              <div className="flex gap-2">
                <Badge
                  label={
                    {
                      Pendiente: 'Pendiente',
                      'En proceso': 'En Proceso',
                      Pintura: 'Pintando',
                      Terminado: 'Completado',
                    }[work.estado]
                  }
                  variant={
                    {
                      Pendiente: 'pending',
                      'En proceso': 'process',
                      Pintura: 'painting',
                      Terminado: 'done',
                    }[work.estado] as any
                  }
                />
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary">
                ${work.precio.toLocaleString('es-CO')}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Entrega: {new Date(work.fecha).toLocaleDateString('es-CO')}
              </p>
            </div>
          </div>
        </Card>

        {/* Work Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Información</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Tipo de Trabajo</p>
                <p className="font-medium text-gray-900">{work.tipo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Descripción</p>
                <p className="text-gray-900">{work.descripcion}</p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Acciones</h3>
            <div className="space-y-2">
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => setIsEditModalOpen(true)}
              >
                Actualizar Estado
              </Button>
              <Button
                variant="secondary"
                size="md"
                fullWidth
                onClick={() => navigate('/trabajos')}
              >
                Volver a Lista
              </Button>
            </div>
          </Card>
        </div>

        {/* Timeline */}
        <Card>
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Progreso del Trabajo
          </h3>
          <Timeline steps={timelineSteps} />
        </Card>

        {/* Update Status Modal */}
        <Modal
          isOpen={isEditModalOpen}
          title="Actualizar Estado"
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleStatusUpdate}
          submitLabel="Actualizar"
        >
          <Select
            label="Nuevo Estado"
            options={[
              { value: 'Pendiente', label: 'Pendiente' },
              { value: 'En proceso', label: 'En Proceso' },
              { value: 'Pintura', label: 'Pintando' },
              { value: 'Terminado', label: 'Completado' },
            ]}
            value={newStatus}
            onChange={(val) => setNewStatus(val as 'Pendiente' | 'En proceso' | 'Pintura' | 'Terminado')}
          />
        </Modal>
      </div>
    </Layout>
  )
}

export default WorkDetailPage
