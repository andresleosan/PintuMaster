import { create } from 'zustand'
import { Ingreso, Gasto } from '@/types/models'
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

export const useFinanceStore = create<FinanceState>((set) => ({
  ingresos: [],
  gastos: [],
  loading: false,
  error: null,

  // Ingresos
  fetchIngresos: async (userId: string) => {
    try {
      set({ loading: true, error: null })
      const ingresosCol = collection(db, 'ingresos')
      const q = query(ingresosCol, where('userId', '==', userId), orderBy('fecha', 'desc'))
      const snap = await getDocs(q)
      const ingresos: Ingreso[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))
      set({ ingresos })
    } catch (error: any) {
      set({ error: error?.message || 'Error al obtener ingresos' })
    } finally {
      set({ loading: false })
    }
  },

  createIngreso: async (ingreso: Omit<Ingreso, 'id'>) => {
    try {
      set({ loading: true, error: null })
      const ingresosCol = collection(db, 'ingresos')
      const toSave = { ...ingreso, createdAt: serverTimestamp() }
      const ref = await addDoc(ingresosCol, toSave)
      const id = ref.id
      set((state) => ({ ingresos: [{ id, ...ingreso } as Ingreso, ...state.ingresos] }))
      return id
    } catch (error: any) {
      set({ error: error?.message || 'Error al crear ingreso' })
      throw error
    } finally {
      set({ loading: false })
    }
  },

  updateIngreso: async (id: string, ingreso: Partial<Ingreso>) => {
    try {
      set({ loading: true, error: null })
      const ref = doc(db, 'ingresos', id)
      await updateDoc(ref, { ...ingreso })
      set((state) => ({ ingresos: state.ingresos.map((i) => (i.id === id ? { ...i, ...ingreso } : i)) }))
    } catch (error: any) {
      set({ error: error?.message || 'Error al actualizar ingreso' })
      throw error
    } finally {
      set({ loading: false })
    }
  },

  deleteIngreso: async (id: string) => {
    try {
      set({ loading: true, error: null })
      const ref = doc(db, 'ingresos', id)
      await deleteDoc(ref)
      set((state) => ({ ingresos: state.ingresos.filter((i) => i.id !== id) }))
    } catch (error: any) {
      set({ error: error?.message || 'Error al eliminar ingreso' })
      throw error
    } finally {
      set({ loading: false })
    }
  },

  // Gastos
  fetchGastos: async (userId: string) => {
    try {
      set({ loading: true, error: null })
      const gastosCol = collection(db, 'gastos')
      const q = query(gastosCol, where('userId', '==', userId), orderBy('fecha', 'desc'))
      const snap = await getDocs(q)
      const gastos: Gasto[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))
      set({ gastos })
    } catch (error: any) {
      set({ error: error?.message || 'Error al obtener gastos' })
    } finally {
      set({ loading: false })
    }
  },

  createGasto: async (gasto: Omit<Gasto, 'id'>) => {
    try {
      set({ loading: true, error: null })
      const gastosCol = collection(db, 'gastos')
      const toSave = { ...gasto, createdAt: serverTimestamp() }
      const ref = await addDoc(gastosCol, toSave)
      const id = ref.id
      set((state) => ({ gastos: [{ id, ...gasto } as Gasto, ...state.gastos] }))
      return id
    } catch (error: any) {
      set({ error: error?.message || 'Error al crear gasto' })
      throw error
    } finally {
      set({ loading: false })
    }
  },

  updateGasto: async (id: string, gasto: Partial<Gasto>) => {
    try {
      set({ loading: true, error: null })
      const ref = doc(db, 'gastos', id)
      await updateDoc(ref, { ...gasto })
      set((state) => ({ gastos: state.gastos.map((g) => (g.id === id ? { ...g, ...gasto } : g)) }))
    } catch (error: any) {
      set({ error: error?.message || 'Error al actualizar gasto' })
      throw error
    } finally {
      set({ loading: false })
    }
  },

  deleteGasto: async (id: string) => {
    try {
      set({ loading: true, error: null })
      const ref = doc(db, 'gastos', id)
      await deleteDoc(ref)
      set((state) => ({ gastos: state.gastos.filter((g) => g.id !== id) }))
    } catch (error: any) {
      set({ error: error?.message || 'Error al eliminar gasto' })
      throw error
    } finally {
      set({ loading: false })
    }
  },

  clearError: () => set({ error: null }),
}))
