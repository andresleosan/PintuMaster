import React from 'react'
import Layout from '@/components/organisms/Layout'
import Card from '@/components/primitives/Card'

const ReportsPage: React.FC = () => {
  // Mock reports data
  const reports = [
    { id: 1, title: 'Ventas Mensuales', date: '2026-05-01', summary: 'Ingresos $12,500' },
    { id: 2, title: 'Trabajos Completados', date: '2026-05-01', summary: '16 trabajos completados' },
    { id: 3, title: 'Inventario Bajo', date: '2026-04-28', summary: '2 items por reabastecer' },
  ]

  return (
    <Layout title="Reportes">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((r) => (
            <Card key={r.id} shadow="sm">
              <div className="p-4">
                <h3 className="text-lg font-semibold">{r.title}</h3>
                <p className="text-sm text-gray-600">{r.date}</p>
                <p className="mt-2 text-sm">{r.summary}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default ReportsPage
