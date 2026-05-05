import { create } from 'zustand'
import { Ingreso, Gasto } from '@/types/models'

interface FinanceState {
  ingresos: Ingreso[]
  gastos: Gasto[]
  loading: boolean
  error: string | null
  
  fetchIngresos: (userId: string) => Promise<void>
  createIngreso: (ingreso: Omit<Ingreso, 'id'>) => Promise<string>
  updateIngreso: (id: string, ingreso: Partial<Ingreso>) => Promise<void>
  deleteIngreso: (id: string) => Promise<void>
  
  fetchGastos: (userId: string) => Promise<void>
  createGasto: (gasto: Omit<Gasto, 'id'>) => Promise<string>
  updateGasto: (id: string, gasto: Partial<Gasto>) => Promise<void>
  deleteGasto: (id: string) => Promise<void>
  
  clearError: () => void
}

// Mock data stores
const MOCK_INGRESOS: Ingreso[] = []
const MOCK_GASTOS: Gasto[] = []

export const useFinanceStore = create<FinanceState>((set) => ({
  ingresos: MOCK_INGRESOS,
  gastos: MOCK_GASTOS,
  loading: false,
  error: null,
  
  // Ingresos
  fetchIngresos: async (userId: string) => {
    try {
      set({ loading: true, error: null })
      await new Promise(resolve => setTimeout(resolve, 300))
      set({ ingresos: MOCK_INGRESOS })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al obtener ingresos' })
    } finally {
      set({ loading: false })
    }
  },
  
  createIngreso: async (ingreso: Omit<Ingreso, 'id'>) => {
    try {
      set({ loading: true, error: null })
      const id = 'ingreso-' + Date.now()
      const newIngreso: Ingreso = { id, ...ingreso } as Ingreso
      MOCK_INGRESOS.push(newIngreso)
      set((state) => ({
        ingresos: [newIngreso, ...state.ingresos]
      }))
      return id
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al crear ingreso' })
      throw error
    } finally {
      set({ loading: false })
    }
  },
  
  updateIngreso: async (id: string, ingreso: Partial<Ingreso>) => {
    try {
      set({ loading: true, error: null })
      const index = MOCK_INGRESOS.findIndex(i => i.id === id)
      if (index !== -1) {
        MOCK_INGRESOS[index] = { ...MOCK_INGRESOS[index], ...ingreso }
      }
      set((state) => ({
        ingresos: state.ingresos.map((i) => (i.id === id ? { ...i, ...ingreso } : i))
      }))
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al actualizar ingreso' })
      throw error
    } finally {
      set({ loading: false })
    }
  },
  
  deleteIngreso: async (id: string) => {
    try {
      set({ loading: true, error: null })
      const index = MOCK_INGRESOS.findIndex(i => i.id === id)
      if (index !== -1) {
        MOCK_INGRESOS.splice(index, 1)
      }
      set((state) => ({
        ingresos: state.ingresos.filter((i) => i.id !== id)
      }))
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al eliminar ingreso' })
      throw error
    } finally {
      set({ loading: false })
    }
  },
  
  // Gastos
  fetchGastos: async (userId: string) => {
    try {
      set({ loading: true, error: null })
      await new Promise(resolve => setTimeout(resolve, 300))
      set({ gastos: MOCK_GASTOS })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al obtener gastos' })
    } finally {
      set({ loading: false })
    }
  },
  
  createGasto: async (gasto: Omit<Gasto, 'id'>) => {
    try {
      set({ loading: true, error: null })
      const id = 'gasto-' + Date.now()
      const newGasto: Gasto = { id, ...gasto } as Gasto
      MOCK_GASTOS.push(newGasto)
      set((state) => ({
        gastos: [newGasto, ...state.gastos]
      }))
      return id
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al crear gasto' })
      throw error
    } finally {
      set({ loading: false })
    }
  },
  
  updateGasto: async (id: string, gasto: Partial<Gasto>) => {
    try {
      set({ loading: true, error: null })
      const index = MOCK_GASTOS.findIndex(g => g.id === id)
      if (index !== -1) {
        MOCK_GASTOS[index] = { ...MOCK_GASTOS[index], ...gasto }
      }
      set((state) => ({
        gastos: state.gastos.map((g) => (g.id === id ? { ...g, ...gasto } : g))
      }))
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al actualizar gasto' })
      throw error
    } finally {
      set({ loading: false })
    }
  },
  
  deleteGasto: async (id: string) => {
    try {
      set({ loading: true, error: null })
      const index = MOCK_GASTOS.findIndex(g => g.id === id)
      if (index !== -1) {
        MOCK_GASTOS.splice(index, 1)
      }
      set((state) => ({
        gastos: state.gastos.filter((g) => g.id !== id)
      }))
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al eliminar gasto' })
      throw error
    } finally {
      set({ loading: false })
    }
  },
  
  clearError: () => set({ error: null })
}))
