import React from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '@/components/organisms/Layout'
import Card from '@/components/primitives/Card'
import Badge from '@/components/primitives/Badge'

const DashboardPage: React.FC = () => {
  // Mock data
  const stats = [
    {
      label: 'Trabajos Totales',
      value: 24,
      icon: '📋',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      label: 'En Proceso',
      value: 7,
      icon: '⚙️',
      color: 'bg-yellow-100 text-yellow-700',
    },
    {
      label: 'Completados',
      value: 16,
      icon: '✓',
      color: 'bg-green-100 text-green-700',
    },
    {
      label: 'Ingresos Mes',
      value: '$12,500',
      icon: '💰',
      color: 'bg-green-100 text-green-700',
    },
  ]

  const recentWorks = [
    {
      id: 1,
      placa: 'ABC-123',
      cliente: 'Juan García',
      estado: 'En proceso',
      fecha: '2026-05-04',
    },
    {
      id: 2,
      placa: 'DEF-456',
      cliente: 'María López',
      estado: 'Pintura',
      fecha: '2026-05-03',
    },
  ]

  const navigate = useNavigate()

  const handleCreateTrabajo = () => navigate('/trabajos/crear')
  const handleRegistrarIngreso = () => navigate('/finanzas/ingreso/crear')

  return (
    <Layout title="Dashboard">
      <div className="space-y-3">
        {/* Header */}
        <div className="pb-1">
          <h1 className="text-2xl font-bold text-dark mb-1">Bienvenido</h1>
          <p className="text-sm text-gray-600">
            Aquí está un resumen de tu taller en tiempo real
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <Card key={stat.label} shadow="md" className="py-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-600 font-semibold">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-dark mt-1">
                    {stat.value}
                  </p>
                </div>
                <span className={`text-2xl p-2 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Works Table */}
        <Card shadow="md" className="py-3">
          <div className="mb-2">
            <h2 className="text-lg font-bold text-dark">Trabajos Recientes</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-2 px-3 font-semibold text-xs text-gray-700">
                    Placa
                  </th>
                  <th className="text-left py-2 px-3 font-semibold text-xs text-gray-700">
                    Cliente
                  </th>
                  <th className="text-left py-2 px-3 font-semibold text-xs text-gray-700">
                    Estado
                  </th>
                  <th className="text-left py-2 px-3 font-semibold text-xs text-gray-700">
                    Fecha
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentWorks.map((work) => (
                  <tr
                    key={work.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="py-2 px-3 font-mono font-bold text-dark text-sm">
                      {work.placa}
                    </td>
                    <td className="py-2 px-3 text-gray-700 text-sm">{work.cliente}</td>
                    <td className="py-2 px-3">
                      <Badge
                        label={work.estado}
                        variant={
                          work.estado === 'Terminado'
                            ? 'done'
                            : work.estado === 'En proceso'
                              ? 'process'
                              : work.estado === 'Pintura'
                                ? 'painting'
                                : 'pending'
                        }
                      />
                    </td>
                    <td className="py-2 px-3 text-gray-700 text-xs">
                      {new Date(work.fecha).toLocaleDateString('es-ES')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card shadow="md" className="bg-gradient-to-br from-primary to-red-700 py-3">
            <div className="text-white">
              <h3 className="text-base font-bold mb-1">Nuevo Trabajo</h3>
              <p className="text-xs opacity-90 mb-3">
                Registra un nuevo vehiculo para reparación
              </p>
              <button onClick={handleCreateTrabajo} className="bg-white text-primary hover:bg-gray-100 px-3 py-1 rounded font-semibold transition text-sm">
                Crear
              </button>
            </div>
          </Card>

          <Card shadow="md" className="bg-gradient-to-br from-blue-600 to-blue-700 py-3">
            <div className="text-white">
              <h3 className="text-base font-bold mb-1">Registrar Ingreso</h3>
              <p className="text-xs opacity-90 mb-3">
                Añade un nuevo pago o ingreso
              </p>
              <button onClick={handleRegistrarIngreso} className="bg-white text-blue-600 hover:bg-gray-100 px-3 py-1 rounded font-semibold transition text-sm">
                Registrar
              </button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default DashboardPage
