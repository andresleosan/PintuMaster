import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '@/components/organisms'
import { Button, Input, Card } from '@/components/primitives'
import { Select, DatePicker, PhotoUpload } from '@/components/molecules'
import { useToast } from '@/components/organisms'

export const WorkCreatePage: React.FC = () => {
  const navigate = useNavigate()
  const { showToast } = useToast()

  const [formData, setFormData] = useState({
    placa: '',
    cliente: '',
    tipo: 'Pintura',
    descripcion: '',
    precio: '',
    fecha: new Date().toISOString().split('T')[0],
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string | number) => {
    setFormData((prev) => ({ ...prev, tipo: String(value) }))
  }

  const handleDateChange = (date: string) => {
    setFormData((prev) => ({ ...prev, fecha: date }))
  }

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.placa || !formData.cliente || !formData.precio) {
      showToast('Por favor completa todos los campos', 'error')
      return
    }

    // Mock submit
    console.log('Nuevo trabajo:', { ...formData, photo: selectedFile })
    showToast('Trabajo creado exitosamente', 'success')
    
    setTimeout(() => {
      navigate('/trabajos')
    }, 2000)
  }

  return (
    <Layout title="Nuevo Trabajo">
      <div className="max-w-2xl mx-auto">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Placa del Vehículo"
                name="placa"
                value={formData.placa}
                onChange={handleInputChange}
                placeholder="Ej: ABC-123"
                required
              />

              <Input
                label="Cliente"
                name="cliente"
                value={formData.cliente}
                onChange={handleInputChange}
                placeholder="Nombre del cliente"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Tipo de Trabajo"
                options={[
                  { value: 'Pintura', label: 'Pintura' },
                  { value: 'Restauración', label: 'Restauración' },
                  { value: 'Mantenimiento', label: 'Mantenimiento' },
                  { value: 'Reparación', label: 'Reparación' },
                ]}
                value={formData.tipo}
                onChange={handleSelectChange}
              />

              <Input
                label="Precio Estimado"
                name="precio"
                type="number"
                value={formData.precio}
                onChange={handleInputChange}
                placeholder="0"
                required
              />
            </div>

            <DatePicker
              label="Fecha de Entrega"
              value={formData.fecha}
              onChange={handleDateChange}
              minDate={new Date().toISOString().split('T')[0]}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción del Trabajo
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                placeholder="Describe los detalles del trabajo..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <PhotoUpload
              label="Foto del Vehículo"
              onFileSelect={handleFileSelect}
            />

            <div className="flex gap-3 justify-end pt-4 border-t">
              <Button
                variant="secondary"
                size="md"
                type="button"
                onClick={() => navigate('/trabajos')}
              >
                Cancelar
              </Button>
              <Button variant="primary" size="md" type="submit">
                Crear Trabajo
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  )
}

export default WorkCreatePage
