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
    {
      id: 3,
      placa: 'GHI-789',
      cliente: 'Carlos Martínez',
      estado: 'Terminado',
      fecha: '2026-05-02',
    },
  ]

  const navigate = useNavigate()

  const handleCreateTrabajo = () => navigate('/trabajos/crear')
  const handleRegistrarIngreso = () => navigate('/finanzas/ingreso/crear')

  return (
    <Layout title="Dashboard">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-dark mb-2">Bienvenido</h1>
          <p className="text-gray-600">
            Aquí está un resumen de tu taller en tiempo real
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} shadow="md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-dark mt-2">
                    {stat.value}
                  </p>
                </div>
                <span className={`text-3xl p-3 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Works Table */}
        <Card shadow="md">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-dark">Trabajos Recientes</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                    Placa
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                    Cliente
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                    Estado
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
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
                    <td className="py-3 px-4 font-mono font-bold text-dark">
                      {work.placa}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{work.cliente}</td>
                    <td className="py-3 px-4">
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
                    <td className="py-3 px-4 text-gray-700 text-sm">
                      {new Date(work.fecha).toLocaleDateString('es-ES')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card shadow="md" className="bg-gradient-to-br from-primary to-red-700">
            <div className="text-white">
              <h3 className="text-lg font-bold mb-2">Nuevo Trabajo</h3>
              <p className="text-sm opacity-90 mb-4">
                Registra un nuevo vehiculo para reparación
              </p>
              <button onClick={handleCreateTrabajo} className="bg-white text-primary hover:bg-gray-100 px-4 py-2 rounded font-semibold transition">
                Crear
              </button>
            </div>
          </Card>

          <Card shadow="md" className="bg-gradient-to-br from-blue-600 to-blue-700">
            <div className="text-white">
              <h3 className="text-lg font-bold mb-2">Registrar Ingreso</h3>
              <p className="text-sm opacity-90 mb-4">
                Añade un nuevo pago o ingreso
              </p>
              <button onClick={handleRegistrarIngreso} className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded font-semibold transition">
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
