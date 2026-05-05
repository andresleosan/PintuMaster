import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '@/components/organisms/Layout'
import Card from '@/components/primitives/Card'
import Badge from '@/components/primitives/Badge'

const EmployeesPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const employees = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      rol: 'Técnico Senior',
      estado: 'Activo',
      telefono: '(+57) 300-123-4567',
      email: 'juan@pintumaster.com',
      trabajosCompletados: 48,
    },
    {
      id: 2,
      nombre: 'María González',
      rol: 'Técnico',
      estado: 'Activo',
      telefono: '(+57) 310-456-7890',
      email: 'maria@pintumaster.com',
      trabajosCompletados: 32,
    },
    {
      id: 3,
      nombre: 'Carlos López',
      rol: 'Aprendiz',
      estado: 'Activo',
      telefono: '(+57) 320-789-0123',
      email: 'carlos@pintumaster.com',
      trabajosCompletados: 12,
    },
    {
      id: 4,
      nombre: 'Ana Martínez',
      rol: 'Administrador',
      estado: 'Activo',
      telefono: '(+57) 300-234-5678',
      email: 'ana@pintumaster.com',
      trabajosCompletados: 5,
    },
  ]

  const stats = [
    {
      label: 'Empleados Activos',
      value: 4,
      color: 'bg-blue-100 text-blue-700',
    },
    {
      label: 'Trabajos Este Mes',
      value: 97,
      color: 'bg-green-100 text-green-700',
    },
    {
      label: 'Promedio Producción',
      value: '24.25',
      color: 'bg-purple-100 text-purple-700',
    },
  ]

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRolColor = (rol: string) => {
    switch (rol) {
      case 'Técnico Senior':
        return 'bg-blue-100 text-blue-700'
      case 'Técnico':
        return 'bg-green-100 text-green-700'
      case 'Aprendiz':
        return 'bg-yellow-100 text-yellow-700'
      case 'Administrador':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <Layout title="Empleados">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} shadow="sm">
              <div className={`p-4 rounded ${stat.color}`}>
                <p className="text-sm font-semibold opacity-80">{stat.label}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Search and Add */}
        <div className="flex gap-4 flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por nombre o correo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            onClick={() => navigate('#')}
            className="bg-primary hover:bg-red-700 text-white px-4 py-2 rounded font-semibold transition whitespace-nowrap"
          >
            + Nuevo Empleado
          </button>
        </div>

        {/* Employees Table */}
        <Card shadow="md">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Teléfono
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Trabajos
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {employee.nombre}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <Badge label={employee.rol} variant="success" />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{employee.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{employee.telefono}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {employee.trabajosCompletados}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Badge label={employee.estado} variant="done" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  )
}

export default EmployeesPage
