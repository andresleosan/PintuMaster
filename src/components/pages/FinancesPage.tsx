import React, { useState } from 'react'
import { Layout } from '@/components/organisms'
import { Tabs, DataTable, Select } from '@/components/molecules'
import { Card } from '@/components/primitives'

interface Transaction {
  id: string
  concepto: string
  tipo: 'ingreso' | 'gasto'
  monto: number
  categoria: string
  fecha: string
  descripcion: string
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    concepto: 'Pintura ABC-123',
    tipo: 'ingreso',
    monto: 150000,
    categoria: 'Trabajos',
    fecha: '2026-05-04',
    descripcion: 'Pago trabajo pintura',
  },
  {
    id: '2',
    concepto: 'Restauración DEF-456',
    tipo: 'ingreso',
    monto: 450000,
    categoria: 'Trabajos',
    fecha: '2026-05-03',
    descripcion: 'Pago trabajo restauración',
  },
  {
    id: '3',
    concepto: 'Compra de pintura',
    tipo: 'gasto',
    monto: 85000,
    categoria: 'Materiales',
    fecha: '2026-05-02',
    descripcion: 'Compra de pintura y disolvente',
  },
  {
    id: '4',
    concepto: 'Alquiler local',
    tipo: 'gasto',
    monto: 800000,
    categoria: 'Fijos',
    fecha: '2026-05-01',
    descripcion: 'Alquiler del mes de mayo',
  },
  {
    id: '5',
    concepto: 'Mantenimiento GHI-789',
    tipo: 'ingreso',
    monto: 85000,
    categoria: 'Trabajos',
    fecha: '2026-04-28',
    descripcion: 'Pago trabajo mantenimiento',
  },
  {
    id: '6',
    concepto: 'Electricidad',
    tipo: 'gasto',
    monto: 120000,
    categoria: 'Servicios',
    fecha: '2026-04-27',
    descripcion: 'Recibo de electricidad',
  },
  {
    id: '7',
    concepto: 'Compra de equipos',
    tipo: 'gasto',
    monto: 2500000,
    categoria: 'Inversión',
    fecha: '2026-04-20',
    descripcion: 'Compresor de aire y herramientas',
  },
  {
    id: '8',
    concepto: 'Pintura JKL-012',
    tipo: 'ingreso',
    monto: 200000,
    categoria: 'Trabajos',
    fecha: '2026-04-19',
    descripcion: 'Pago trabajo parcial',
  },
]

export const FinancesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [filterMonth, setFilterMonth] = useState('2026-05')

  // Calcular resúmenes
  const ingresos = MOCK_TRANSACTIONS.filter(
    (t) => t.tipo === 'ingreso'
  ).reduce((sum, t) => sum + t.monto, 0)
  const gastos = MOCK_TRANSACTIONS.filter((t) => t.tipo === 'gasto').reduce(
    (sum, t) => sum + t.monto,
    0
  )
  const ganancia = ingresos - gastos

  const tabs = [
    { id: 'all', label: 'Todas' },
    {
      id: 'ingreso',
      label: 'Ingresos',
      count: MOCK_TRANSACTIONS.filter((t) => t.tipo === 'ingreso').length,
    },
    {
      id: 'gasto',
      label: 'Gastos',
      count: MOCK_TRANSACTIONS.filter((t) => t.tipo === 'gasto').length,
    },
  ]

  const filteredData = MOCK_TRANSACTIONS.filter((transaction) => {
    const matchesTab = activeTab === 'all' || transaction.tipo === activeTab
    const matchesMonth = transaction.fecha.startsWith(filterMonth)
    return matchesTab && matchesMonth
  })

  const columns = [
    {
      key: 'concepto' as const,
      label: 'Concepto',
      sortable: true,
    },
    {
      key: 'categoria' as const,
      label: 'Categoría',
      sortable: true,
      width: '120px',
    },
    {
      key: 'monto' as const,
      label: 'Monto',
      sortable: true,
      width: '120px',
      render: (value: number, row: Transaction) => (
        <span
          className={
            row.tipo === 'ingreso' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'
          }
        >
          {row.tipo === 'ingreso' ? '+' : '-'}${value.toLocaleString('es-CO')}
        </span>
      ),
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
    <Layout title="Finanzas">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-green-50 border-l-4 border-green-500">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Total Ingresos
            </h3>
            <p className="text-2xl font-bold text-green-600">
              ${ingresos.toLocaleString('es-CO')}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              +{((ingresos / (ingresos + gastos)) * 100).toFixed(0)}% del total
            </p>
          </Card>

          <Card className="bg-red-50 border-l-4 border-red-500">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Total Gastos
            </h3>
            <p className="text-2xl font-bold text-red-600">
              ${gastos.toLocaleString('es-CO')}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              -{((gastos / (ingresos + gastos)) * 100).toFixed(0)}% del total
            </p>
          </Card>

          <Card className="bg-blue-50 border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Ganancia Neta
            </h3>
            <p
              className={`text-2xl font-bold ${
                ganancia >= 0 ? 'text-blue-600' : 'text-red-600'
              }`}
            >
              ${ganancia.toLocaleString('es-CO')}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {ganancia >= 0 ? 'Ganancia' : 'Pérdida'} del mes
            </p>
          </Card>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <Select
            options={[
              { value: '2026-05', label: 'Mayo 2026' },
              { value: '2026-04', label: 'Abril 2026' },
              { value: '2026-03', label: 'Marzo 2026' },
              { value: '2026-02', label: 'Febrero 2026' },
            ]}
            value={filterMonth}
            onChange={(val) => setFilterMonth(String(val))}
            label="Filtrar por mes"
          />
        </div>

        {/* Tabs */}
        <Tabs items={tabs} defaultActive="all" onTabChange={setActiveTab} />

        {/* DataTable */}
        <DataTable
          columns={columns}
          data={filteredData}
          emptyMessage="No hay transacciones para el período seleccionado"
          itemsPerPage={8}
          showPagination={true}
        />
      </div>
    </Layout>
  )
}

export default FinancesPage
