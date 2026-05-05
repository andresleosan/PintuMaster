import React from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '@/components/organisms/Layout'
import Card from '@/components/primitives/Card'
import Badge from '@/components/primitives/Badge'

const DashboardPage: React.FC = () => {
  const stats = [
    { label: 'Trabajos Totales', value: 24, icon: '📋', color: 'bg-blue-100 text-blue-700' },
    { label: 'En Proceso', value: 7, icon: '⚙️', color: 'bg-yellow-100 text-yellow-700' },
    { label: 'Completados', value: 16, icon: '✓', color: 'bg-green-100 text-green-700' },
    { label: 'Ingresos Mes', value: '$12,500', icon: '💰', color: 'bg-green-100 text-green-700' },
  ]

  const recentWorks = [
    { id: 1, placa: 'ABC-123', cliente: 'Juan García', estado: 'En proceso', fecha: '2026-05-04' },
    { id: 2, placa: 'DEF-456', cliente: 'María López', estado: 'Pintura', fecha: '2026-05-03' },
  ]

  const navigate = useNavigate()

  return (
    <Layout title="Dashboard">
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-bold text-dark mb-0.5">Bienvenido</h1>
          <p className="text-sm text-gray-600">Resumen de tu taller en tiempo real</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <Card key={stat.label} shadow="md" className="py-2 px-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500 font-semibold leading-tight">{stat.label}</p>
                <span className={`text-base p-1 rounded-lg ${stat.color}`}>{stat.icon}</span>
              </div>
              <p className="text-2xl font-bold text-dark">{stat.value}</p>
            </Card>
          ))}
        </div>

        <Card shadow="md" className="py-3 px-4">
          <h2 className="text-base font-bold text-dark mb-3">Trabajos Recientes</h2>
          <div className="divide-y divide-gray-200">
            {recentWorks.map((work) => (
              <div key={work.id} className="py-2.5 flex items-center justify-between gap-2">
                <div>
                  <p className="font-mono font-bold text-dark text-sm">{work.placa}</p>
                  <p className="text-xs text-gray-500">{work.cliente}</p>
                  <p className="text-xs text-gray-400">{new Date(work.fecha).toLocaleDateString('es-ES')}</p>
                </div>
                <Badge
                  label={work.estado}
                  variant={
                    work.estado === 'Terminado' ? 'done'
                    : work.estado === 'En proceso' ? 'process'
                    : work.estado === 'Pintura' ? 'painting'
                    : 'pending'
                  }
                />
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card shadow="md" className="bg-gradient-to-br from-primary to-red-700 py-3 px-4">
            <div className="text-white">
              <h3 className="text-base font-bold mb-1">Nuevo Trabajo</h3>
              <p className="text-xs opacity-90 mb-3">Registra un nuevo vehiculo para reparacion</p>
              <button onClick={() => navigate('/trabajos/crear')} className="bg-white text-primary hover:bg-gray-100 px-3 py-1 rounded font-semibold transition text-sm">
                Crear
              </button>
            </div>
          </Card>
          <Card shadow="md" className="bg-gradient-to-br from-blue-600 to-blue-700 py-3 px-4">
            <div className="text-white">
              <h3 className="text-base font-bold mb-1">Registrar Ingreso</h3>
              <p className="text-xs opacity-90 mb-3">Anade un nuevo pago o ingreso</p>
              <button onClick={() => navigate('/finanzas/ingreso/crear')} className="bg-white text-blue-600 hover:bg-gray-100 px-3 py-1 rounded font-semibold transition text-sm">
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