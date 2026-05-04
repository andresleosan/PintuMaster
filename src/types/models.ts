// Interfaces comunes de PintuMaster

export interface User {
  id: string
  email: string
  nombre: string
  rol: 'admin' | 'taller' | 'empleado'
  avatar?: string
  createdAt: Date
}

export interface Trabajo {
  id: string
  placa: string
  modelo?: string
  cliente: string
  tipo?: string
  estado: 'Pendiente' | 'En proceso' | 'Pintura' | 'Terminado'
  precio: number
  descripcion?: string
  fotos?: string[]
  empleadoId?: string
  fecha?: string
  fechaCreacion?: Date
  fechaEntrega?: Date
}

export interface Empleado {
  id: string
  nombre: string
  email: string
  rol: string
  comision: number
  activo: boolean
}

export interface Ingreso {
  id: string
  tipo: 'Trabajo' | 'Otro'
  monto: number
  metodo: 'Efectivo' | 'Transferencia' | 'Nequi' | 'Tarjeta'
  descripcion?: string
  trabajoId?: string
  fecha: Date
}

export interface Gasto {
  id: string
  concepto: string
  monto: number
  categoria: string
  descripcion?: string
  comprobante?: string
  recurrente: boolean
  fecha: Date
}

export interface Producto {
  id: string
  nombre: string
  categoria: string
  cantidad: number
  stockMinimo: number
  precio: number
  unidad: string
}
