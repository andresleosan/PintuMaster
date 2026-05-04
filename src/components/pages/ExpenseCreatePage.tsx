import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '@/components/organisms'
import { Button, Input, Card } from '@/components/primitives'
import { Select, DatePicker } from '@/components/molecules'
import { useToast } from '@/components/organisms'

export const ExpenseCreatePage: React.FC = () => {
  const navigate = useNavigate()
  const { showToast } = useToast()

  const [formData, setFormData] = useState({
    concepto: '',
    categoria: 'Materiales',
    monto: '',
    fecha: new Date().toISOString().split('T')[0],
    descripcion: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string | number) => {
    setFormData((prev) => ({ ...prev, categoria: String(value) }))
  }

  const handleDateChange = (date: string) => {
    setFormData((prev) => ({ ...prev, fecha: date }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.concepto || !formData.monto) {
      showToast('Por favor completa todos los campos', 'error')
      return
    }

    console.log('Nuevo gasto:', formData)
    showToast('Gasto registrado exitosamente', 'success')

    setTimeout(() => {
      navigate('/finanzas')
    }, 2000)
  }

  return (
    <Layout title="Registrar Gasto">
      <div className="max-w-2xl mx-auto">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Concepto del Gasto"
              name="concepto"
              value={formData.concepto}
              onChange={handleInputChange}
              placeholder="Ej: Compra de pintura"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Categoría"
                options={[
                  { value: 'Materiales', label: 'Materiales' },
                  { value: 'Servicios', label: 'Servicios' },
                  { value: 'Fijos', label: 'Fijos' },
                  { value: 'Inversión', label: 'Inversión' },
                  { value: 'Otros', label: 'Otros' },
                ]}
                value={formData.categoria}
                onChange={handleCategoryChange}
              />

              <Input
                label="Monto"
                name="monto"
                type="number"
                value={formData.monto}
                onChange={handleInputChange}
                placeholder="0"
                required
              />
            </div>

            <DatePicker
              label="Fecha del Gasto"
              value={formData.fecha}
              onChange={handleDateChange}
              maxDate={new Date().toISOString().split('T')[0]}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción (Opcional)
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                placeholder="Detalles adicionales del gasto..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t">
              <Button
                variant="secondary"
                size="md"
                type="button"
                onClick={() => navigate('/finanzas')}
              >
                Cancelar
              </Button>
              <Button variant="primary" size="md" type="submit">
                Registrar Gasto
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  )
}

export default ExpenseCreatePage
