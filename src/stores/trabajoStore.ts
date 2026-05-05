import { create } from 'zustand'
import { Trabajo } from '@/types/models'

interface TrabajoState {
  trabajos: Trabajo[]
  selectedTrabajo: Trabajo | null
  loading: boolean
  error: string | null
  
  fetchTrabajos: (userId: string) => Promise<void>
  fetchTrabajoById: (id: string) => Promise<Trabajo | null>
  createTrabajo: (trabajo: Omit<Trabajo, 'id'>) => Promise<string>
  updateTrabajo: (id: string, trabajo: Partial<Trabajo>) => Promise<void>
  deleteTrabajo: (id: string) => Promise<void>
  setSelectedTrabajo: (trabajo: Trabajo | null) => void
  clearError: () => void
}

// Mock data store - Firebase integration will be added in next iteration
const MOCK_TRABAJOS: Trabajo[] = []

export const useTrabajoStore = create<TrabajoState>((set) => ({
  trabajos: MOCK_TRABAJOS,
  selectedTrabajo: null,
  loading: false,
  error: null,
  
  fetchTrabajos: async (userId: string) => {
    // Mock implementation - replace with Firebase in next iteration
    try {
      set({ loading: true, error: null })
      await new Promise(resolve => setTimeout(resolve, 300))
      set({ trabajos: MOCK_TRABAJOS })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al obtener trabajos' })
    } finally {
      set({ loading: false })
    }
  },
  
  fetchTrabajoById: async (id: string) => {
    try {
      set({ loading: true, error: null })
      const trabajo = MOCK_TRABAJOS.find(t => t.id === id)
      if (trabajo) {
        set({ selectedTrabajo: trabajo })
      }
      return trabajo || null
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al obtener trabajo' })
      return null
    } finally {
      set({ loading: false })
    }
  },
  
  createTrabajo: async (trabajo: Omit<Trabajo, 'id'>) => {
    try {
      set({ loading: true, error: null })
      const id = 'trabajo-' + Date.now()
      const newTrabajo: Trabajo = { id, ...trabajo } as Trabajo
      MOCK_TRABAJOS.push(newTrabajo)
      set((state) => ({
        trabajos: [newTrabajo, ...state.trabajos]
      }))
      return id
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al crear trabajo' })
      throw error
    } finally {
      set({ loading: false })
    }
  },
  
  updateTrabajo: async (id: string, trabajo: Partial<Trabajo>) => {
    try {
      set({ loading: true, error: null })
      const index = MOCK_TRABAJOS.findIndex(t => t.id === id)
      if (index !== -1) {
        MOCK_TRABAJOS[index] = { ...MOCK_TRABAJOS[index], ...trabajo }
      }
      set((state) => ({
        trabajos: state.trabajos.map((t) => (t.id === id ? { ...t, ...trabajo } : t)),
        selectedTrabajo: state.selectedTrabajo?.id === id ? { ...state.selectedTrabajo, ...trabajo } : state.selectedTrabajo
      }))
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al actualizar trabajo' })
      throw error
    } finally {
      set({ loading: false })
    }
  },
  
  deleteTrabajo: async (id: string) => {
    try {
      set({ loading: true, error: null })
      const index = MOCK_TRABAJOS.findIndex(t => t.id === id)
      if (index !== -1) {
        MOCK_TRABAJOS.splice(index, 1)
      }
      set((state) => ({
        trabajos: state.trabajos.filter((t) => t.id !== id),
        selectedTrabajo: state.selectedTrabajo?.id === id ? null : state.selectedTrabajo
      }))
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al eliminar trabajo' })
      throw error
    } finally {
      set({ loading: false })
    }
  },
  
  setSelectedTrabajo: (trabajo: Trabajo | null) => set({ selectedTrabajo: trabajo }),
  
  clearError: () => set({ error: null })
}))
