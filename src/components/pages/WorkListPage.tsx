import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const [trabajos, setTrabajos] = useState(MOCK_TRABAJOS)
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const navigate = useNavigate()

  const tabs = [
    { id: 'all', label: 'Todos', count: trabajos.length },
    {
      id: 'Pendiente',
      label: 'Pendientes',
      count: trabajos.filter((t) => t.estado === 'Pendiente').length,
    },
    {
      id: 'En proceso',
      label: 'En Proceso',
      count: trabajos.filter((t) => t.estado === 'En proceso').length,
    },
    {
      id: 'Pintura',
      label: 'Pintando',
      count: trabajos.filter((t) => t.estado === 'Pintura').length,
    },
    {
      id: 'Terminado',
      label: 'Completados',
      count: trabajos.filter((t) => t.estado === 'Terminado').length,
    },
  ]

  const filteredData = trabajos.filter((trabajo) => {
    const matchesTab = activeTab === 'all' || trabajo.estado === activeTab
    const matchesSearch =
      trabajo.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trabajo.cliente.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesSearch
  })

  const selectedCount = selectedIds.length

  const toggleSelection = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id]
    )
  }

  const toggleSelectAllVisible = () => {
    const visibleIds = filteredData.map((trabajo) => trabajo.id)
    const allVisibleSelected = visibleIds.every((id) => selectedIds.includes(id))

    setSelectedIds((current) =>
      allVisibleSelected
        ? current.filter((id) => !visibleIds.includes(id))
        : Array.from(new Set([...current, ...visibleIds]))
    )
  }

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return

    const shouldDelete = window.confirm(
      `¿Eliminar ${selectedIds.length} trabajo(s) seleccionado(s)?`
    )

    if (!shouldDelete) return

    setTrabajos((current) =>
      current.filter((trabajo) => !selectedIds.includes(trabajo.id))
    )
    setSelectedIds([])
  }

  const handleDeleteTrabajo = (id: string) => {
    const shouldDelete = window.confirm('¿Eliminar este trabajo?')
    if (!shouldDelete) return

    setTrabajos((current) => current.filter((trabajo) => trabajo.id !== id))
    setSelectedIds((current) => current.filter((selectedId) => selectedId !== id))
  }

  const columns = [
    {
      key: 'id' as const,
      label: '',
      sortable: false,
      width: '56px',
      render: (_value: string, row: Trabajo) => (
        <input
          type="checkbox"
          aria-label={`Seleccionar trabajo ${row.placa}`}
          checked={selectedIds.includes(row.id)}
          onChange={() => toggleSelection(row.id)}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
      ),
    },
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
    {
      key: 'id' as const,
      label: 'Acciones',
      sortable: false,
      width: '120px',
      render: (_value: string, row: Trabajo) => (
        <button
          type="button"
          onClick={() => handleDeleteTrabajo(row.id)}
          className="text-sm font-medium text-red-600 hover:text-red-700"
        >
          Eliminar
        </button>
      ),
    },
  ]

  return (
    <Layout title="Trabajos">
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <input
              type="text"
              placeholder="Buscar por placa o cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button variant="primary" size="md" onClick={() => navigate('/trabajos/crear')}>
              + Nuevo Trabajo
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3">
            <button
              type="button"
              onClick={toggleSelectAllVisible}
              className="text-sm font-medium text-gray-700 hover:text-primary"
            >
              {filteredData.length > 0 && filteredData.every((trabajo) => selectedIds.includes(trabajo.id))
                ? 'Deseleccionar visibles'
                : 'Seleccionar visibles'}
            </button>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <span className="text-sm text-gray-600">
                {selectedCount} seleccionado{selectedCount === 1 ? '' : 's'}
              </span>
              <Button
                variant="secondary"
                size="md"
                onClick={handleDeleteSelected}
                disabled={selectedCount === 0}
              >
                Eliminar seleccionados
              </Button>
            </div>
          </div>
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
