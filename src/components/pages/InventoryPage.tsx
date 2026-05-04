import React, { useState } from 'react'
import { Layout } from '@/components/organisms'
import { DataTable, Select } from '@/components/molecules'
import { Card, Badge, Button } from '@/components/primitives'

interface InventoryItem {
  id: string
  nombre: string
  codigo: string
  categoria: string
  cantidad: number
  stockMinimo: number
  precio: number
  proveedor: string
}

const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: '1',
    nombre: 'Pintura Roja Base Solvente',
    codigo: 'PIN-001',
    categoria: 'Pintura',
    cantidad: 45,
    stockMinimo: 10,
    precio: 8500,
    proveedor: 'SupplyPaint',
  },
  {
    id: '2',
    nombre: 'Disolvente Acrílico',
    codigo: 'DIS-002',
    categoria: 'Químicos',
    cantidad: 12,
    stockMinimo: 5,
    precio: 12000,
    proveedor: 'ChemicalCo',
  },
  {
    id: '3',
    nombre: 'Lija P120',
    codigo: 'LIJ-003',
    categoria: 'Herramientas',
    cantidad: 3,
    stockMinimo: 8,
    precio: 2500,
    proveedor: 'ToolMaster',
  },
  {
    id: '4',
    nombre: 'Masilla Poliéster',
    codigo: 'MAS-004',
    categoria: 'Químicos',
    cantidad: 25,
    stockMinimo: 10,
    precio: 6800,
    proveedor: 'SupplyPaint',
  },
  {
    id: '5',
    nombre: 'Tinner Premium',
    codigo: 'TIN-005',
    categoria: 'Químicos',
    cantidad: 8,
    stockMinimo: 10,
    precio: 15000,
    proveedor: 'ChemicalCo',
  },
  {
    id: '6',
    nombre: 'Compresor de Aire',
    codigo: 'COM-006',
    categoria: 'Equipos',
    cantidad: 2,
    stockMinimo: 1,
    precio: 850000,
    proveedor: 'ToolMaster',
  },
  {
    id: '7',
    nombre: 'Pistola de Pintura HVLP',
    codigo: 'PIS-007',
    categoria: 'Equipos',
    cantidad: 5,
    stockMinimo: 2,
    precio: 185000,
    proveedor: 'ProTools',
  },
  {
    id: '8',
    nombre: 'Mascarilla N95',
    codigo: 'MAS-008',
    categoria: 'Seguridad',
    cantidad: 45,
    stockMinimo: 20,
    precio: 1200,
    proveedor: 'SafetyFirst',
  },
]

export const InventoryPage: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = Array.from(
    new Set(MOCK_INVENTORY.map((item) => item.categoria))
  )
  const categoryOptions = [
    { value: 'all', label: 'Todas las categorías' },
    ...categories.map((cat) => ({ value: cat, label: cat })),
  ]

  // Calcular resúmenes
  const lowStockItems = MOCK_INVENTORY.filter(
    (item) => item.cantidad <= item.stockMinimo
  ).length
  const totalItems = MOCK_INVENTORY.reduce((sum, item) => sum + item.cantidad, 0)
  const totalValue = MOCK_INVENTORY.reduce(
    (sum, item) => sum + item.cantidad * item.precio,
    0
  )

  const filteredData = MOCK_INVENTORY.filter((item) => {
    const matchesCategory =
      filterCategory === 'all' || item.categoria === filterCategory
    const matchesSearch =
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const columns = [
    {
      key: 'nombre' as const,
      label: 'Nombre',
      sortable: true,
    },
    {
      key: 'codigo' as const,
      label: 'Código',
      sortable: true,
      width: '100px',
    },
    {
      key: 'categoria' as const,
      label: 'Categoría',
      sortable: true,
      width: '100px',
    },
    {
      key: 'cantidad' as const,
      label: 'Stock',
      sortable: true,
      width: '80px',
      render: (value: number, row: InventoryItem) => (
        <span
          className={
            value <= row.stockMinimo ? 'text-red-600 font-semibold' : ''
          }
        >
          {value}
        </span>
      ),
    },
    {
      key: 'stockMinimo' as const,
      label: 'Mínimo',
      sortable: true,
      width: '80px',
    },
    {
      key: 'precio' as const,
      label: 'Precio Unit.',
      sortable: true,
      width: '120px',
      render: (value: number) => `$${value.toLocaleString('es-CO')}`,
    },
    {
      key: 'id' as const,
      label: 'Estado',
      sortable: false,
      width: '100px',
      render: (value: string, row: InventoryItem) =>
        row.cantidad <= row.stockMinimo ? (
          <Badge label="Bajo Stock" variant="alert" />
        ) : (
          <Badge label="Normal" variant="done" />
        ),
    },
  ]

  return (
    <Layout title="Inventario">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Items en Stock
            </h3>
            <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
            <p className="text-xs text-gray-500 mt-1">Unidades disponibles</p>
          </Card>

          <Card className="bg-yellow-50 border-l-4 border-yellow-500">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Bajo Stock
            </h3>
            <p className="text-2xl font-bold text-yellow-600">{lowStockItems}</p>
            <p className="text-xs text-gray-500 mt-1">Items por reabastecer</p>
          </Card>

          <Card className="bg-blue-50 border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Valor Total
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              ${totalValue.toLocaleString('es-CO')}
            </p>
            <p className="text-xs text-gray-500 mt-1">Inversión en inventario</p>
          </Card>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <input
            type="text"
            placeholder="Buscar por nombre o código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Select
            options={categoryOptions}
            value={filterCategory}
            onChange={(val) => setFilterCategory(String(val))}
          />
          <Button variant="primary" size="md">
            + Nuevo Item
          </Button>
        </div>

        {/* DataTable */}
        <DataTable
          columns={columns}
          data={filteredData}
          emptyMessage="No hay items que coincidan con tu búsqueda"
          itemsPerPage={8}
          showPagination={true}
        />
      </div>
    </Layout>
  )
}

export default InventoryPage
