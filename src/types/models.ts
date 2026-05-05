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
  userId: string
  placa: string
  modelo?: string
  cliente: string
  tipo?: 'Pintura' | 'Restauración' | 'Mantenimiento'
  estado: 'Pendiente' | 'En proceso' | 'Pintura' | 'Terminado'
  precio: number
  descripcion?: string
  fotos?: string[]
  empleadoId?: string
  fecha?: string
  fechaCreacion?: Date | string
  fechaEntrega?: Date | string
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
  userId: string
  concepto: string
  categoria: 'Trabajos' | 'Ventas' | 'Servicios' | 'Otro'
  monto: number
  metodo?: 'Efectivo' | 'Transferencia' | 'Nequi' | 'Tarjeta'
  descripcion?: string
  trabajoId?: string
  fecha: Date | string
  createdAt?: Date
}

export interface Gasto {
  id: string
  userId: string
  concepto: string
  monto: number
  categoria: 'Materiales' | 'Servicios' | 'Transporte' | 'Salarios' | 'Otro'
  descripcion?: string
  comprobante?: string
  recurrente?: boolean
  fecha: Date | string
  createdAt?: Date
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
