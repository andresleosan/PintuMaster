import React from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '@/components/organisms/Layout'
import Card from '@/components/primitives/Card'

const InventoryCreatePage: React.FC = () => {
  const navigate = useNavigate()

  const handleCancel = () => navigate('/inventario')

  return (
    <Layout title="Crear Item de Inventario">
      <Card shadow="md" className="max-w-2xl">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Nuevo Item de Inventario</h2>

          <form onSubmit={(e) => {
            e.preventDefault()
            navigate('/inventario')
          }} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Item *
              </label>
              <input
                type="text"
                placeholder="Ej: Pintura Roja Base Solvente"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Código y Categoría */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código *
                </label>
                <input
                  type="text"
                  placeholder="Ej: PIN-001"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Seleccionar...</option>
                  <option value="Pintura">Pintura</option>
                  <option value="Químicos">Químicos</option>
                  <option value="Herramientas">Herramientas</option>
                  <option value="Equipos">Equipos</option>
                  <option value="Seguridad">Seguridad</option>
                </select>
              </div>
            </div>

            {/* Stock y Stock Mínimo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad en Stock *
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Mínimo *
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Precio y Proveedor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio Unitario ($) *
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proveedor *
                </label>
                <input
                  type="text"
                  placeholder="Ej: SupplyPaint"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition font-semibold"
              >
                Crear Item
              </button>
            </div>
          </form>
        </div>
      </Card>
    </Layout>
  )
}

export default InventoryCreatePage
