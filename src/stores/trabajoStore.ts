import { create } from 'zustand'
import { Trabajo } from '@/types/models'
import { db } from '@/services/firebase'
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'

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

export const useTrabajoStore = create<TrabajoState>((set) => ({
  trabajos: [],
  selectedTrabajo: null,
  loading: false,
  error: null,

  fetchTrabajos: async (userId: string) => {
    try {
      set({ loading: true, error: null })
      const trabajosCol = collection(db, 'trabajos')
      const q = query(trabajosCol, where('userId', '==', userId), orderBy('fechaCreacion', 'desc'))
      const snapshot = await getDocs(q)
      const trabajos: Trabajo[] = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))
      set({ trabajos })
    } catch (error: any) {
      set({ error: error?.message || 'Error al obtener trabajos' })
    } finally {
      set({ loading: false })
    }
  },

  fetchTrabajoById: async (id: string) => {
    try {
      set({ loading: true, error: null })
      const ref = doc(db, 'trabajos', id)
      const snap = await getDoc(ref)
      if (!snap.exists()) return null
      const trabajo = { id: snap.id, ...(snap.data() as any) } as Trabajo
      set({ selectedTrabajo: trabajo })
      return trabajo
    } catch (error: any) {
      set({ error: error?.message || 'Error al obtener trabajo' })
      return null
    } finally {
      set({ loading: false })
    }
  },

  createTrabajo: async (trabajo: Omit<Trabajo, 'id'>) => {
    try {
      set({ loading: true, error: null })
      const trabajosCol = collection(db, 'trabajos')
      const toSave = { ...trabajo, fechaCreacion: serverTimestamp() }
      const docRef = await addDoc(trabajosCol, toSave)
      const id = docRef.id
      // optional: update local state
      set((state) => ({ trabajos: [{ id, ...trabajo } as Trabajo, ...state.trabajos] }))
      return id
    } catch (error: any) {
      set({ error: error?.message || 'Error al crear trabajo' })
      throw error
    } finally {
      set({ loading: false })
    }
  },

  updateTrabajo: async (id: string, trabajo: Partial<Trabajo>) => {
    try {
      set({ loading: true, error: null })
      const ref = doc(db, 'trabajos', id)
      await updateDoc(ref, { ...trabajo })
      set((state) => ({
        trabajos: state.trabajos.map((t) => (t.id === id ? { ...t, ...trabajo } : t)),
        selectedTrabajo: state.selectedTrabajo?.id === id ? { ...state.selectedTrabajo, ...trabajo } : state.selectedTrabajo,
      }))
    } catch (error: any) {
      set({ error: error?.message || 'Error al actualizar trabajo' })
      throw error
    } finally {
      set({ loading: false })
    }
  },

  deleteTrabajo: async (id: string) => {
    try {
      set({ loading: true, error: null })
      const ref = doc(db, 'trabajos', id)
      await deleteDoc(ref)
      set((state) => ({ trabajos: state.trabajos.filter((t) => t.id !== id), selectedTrabajo: state.selectedTrabajo?.id === id ? null : state.selectedTrabajo }))
    } catch (error: any) {
      set({ error: error?.message || 'Error al eliminar trabajo' })
      throw error
    } finally {
      set({ loading: false })
    }
  },

  setSelectedTrabajo: (trabajo: Trabajo | null) => set({ selectedTrabajo: trabajo }),

  clearError: () => set({ error: null }),
}))
