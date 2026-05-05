import React, { useState } from 'react'
import { Layout } from '@/components/organisms'
import { Tabs, DataTable } from '@/components/molecules'
import { Badge, Button } from '@/components/primitives'
import { Trabajo } from '@/types/models'

const MOCK_TRABAJOS: Trabajo[] = [
  {
    id: '1',
    userId: 'user1',
    placa: 'ABC-123',
    cliente: 'Juan Pérez',
    tipo: 'Pintura',
    estado: 'En proceso',
    precio: 150000,
    fecha: '2026-05-01',
    descripcion: 'Repintado completo del vehículo',
  },
  {
    id: '2',
    userId: 'user1',
    placa: 'DEF-456',
    cliente: 'María González',
    tipo: 'Restauración',
    estado: 'Pintura',
    precio: 450000,
    fecha: '2026-05-02',
    descripcion: 'Restauración de carrocería y pintura',
  },
  {
    id: '3',
    userId: 'user1',
    placa: 'GHI-789',
    cliente: 'Carlos López',
    tipo: 'Mantenimiento',
    estado: 'Terminado',
    precio: 85000,
    fecha: '2026-04-28',
    descripcion: 'Servicio de mantenimiento general',
  },
  {
    id: '4',
    userId: 'user1',
    placa: 'JKL-012',
    cliente: 'Ana Rodríguez',
    tipo: 'Pintura',
    estado: 'Pendiente',
    precio: 200000,
    fecha: '2026-05-05',
    descripcion: 'Pintura de capó y parachoques',
  },
  {
    id: '5',
    userId: 'user1',
    placa: 'MNO-345',
    cliente: 'Roberto Silva',
    tipo: 'Restauración',
    estado: 'En proceso',
    precio: 520000,
    fecha: '2026-05-03',
    descripcion: 'Trabajo completo de restauración',
  },
  {
    id: '6',
    userId: 'user1',
    placa: 'PQR-678',
    cliente: 'Laura García',
    tipo: 'Pintura',
    estado: 'Terminado',
    precio: 120000,
    fecha: '2026-04-25',
    descripcion: 'Pintura de puertas y techo',
  },
]

export const WorkListPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const tabs = [
    { id: 'all', label: 'Todos', count: MOCK_TRABAJOS.length },
    {
      id: 'Pendiente',
      label: 'Pendientes',
      count: MOCK_TRABAJOS.filter((t) => t.estado === 'Pendiente').length,
    },
    {
      id: 'En proceso',
      label: 'En Proceso',
      count: MOCK_TRABAJOS.filter((t) => t.estado === 'En proceso').length,
    },
    {
      id: 'Pintura',
      label: 'Pintando',
      count: MOCK_TRABAJOS.filter((t) => t.estado === 'Pintura').length,
    },
    {
      id: 'Terminado',
      label: 'Completados',
      count: MOCK_TRABAJOS.filter((t) => t.estado === 'Terminado').length,
    },
  ]

  const filteredData = MOCK_TRABAJOS.filter((trabajo) => {
    const matchesTab = activeTab === 'all' || trabajo.estado === activeTab
    const matchesSearch =
      trabajo.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trabajo.cliente.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesSearch
  })

  const columns = [
    {
      key: 'placa' as const,
      label: 'Placa',
      sortable: true,
      width: '100px',
    },
    {
      key: 'cliente' as const,
      label: 'Cliente',
      sortable: true,
    },
    {
      key: 'tipo' as const,
      label: 'Tipo',
      sortable: true,
      width: '120px',
    },
    {
      key: 'precio' as const,
      label: 'Precio',
      sortable: true,
      width: '120px',
      render: (value: number) => `$${value.toLocaleString('es-CO')}`,
    },
    {
      key: 'estado' as const,
      label: 'Estado',
      sortable: true,
      width: '120px',
      render: (value: string) => {
        const statusMap: Record<string, string> = {
          'Pendiente': 'Pendiente',
          'En proceso': 'En Proceso',
          'Pintura': 'Pintando',
          'Terminado': 'Completado',
        }
        const variantMap: Record<string, any> = {
          'Pendiente': 'pending',
          'En proceso': 'process',
          'Pintura': 'painting',
          'Terminado': 'done',
        }
        return (
          <Badge 
            label={statusMap[value]} 
            variant={variantMap[value] || 'pending'}
          />
        )
      },
    },
    {
      key: 'fecha' as const,
      label: 'Fecha',
      sortable: true,
      width: '100px',
      render: (value: string) => new Date(value).toLocaleDateString('es-CO'),
    },
  ]

  return (
    <Layout title="Trabajos">
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <input
            type="text"
            placeholder="Buscar por placa o cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button variant="primary" size="md">
            + Nuevo Trabajo
          </Button>
        </div>

        {/* Tabs */}
        <Tabs items={tabs} defaultActive="all" onTabChange={setActiveTab} />

        {/* DataTable */}
        <DataTable
          columns={columns}
          data={filteredData}
          emptyMessage="No hay trabajos que coincidan con tu búsqueda"
          itemsPerPage={8}
          showPagination={true}
        />
      </div>
    </Layout>
  )
}

export default WorkListPage
