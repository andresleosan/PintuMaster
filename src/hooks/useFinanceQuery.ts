import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { db } from '@/services/firebase'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { Ingreso, Gasto } from '@/types/models'

const ingresosCol = collection(db, 'ingresos')
const gastosCol = collection(db, 'gastos')

export function useIngresos(userId: string | undefined) {
  return useQuery({
    queryKey: ['ingresos', userId],
    queryFn: async () => {
      if (!userId) return []
      const q = query(ingresosCol, where('userId', '==', userId), orderBy('fecha', 'desc'))
      const snap = await getDocs(q)
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Ingreso))
    },
    enabled: !!userId,
  })
}

export function useGastos(userId: string | undefined) {
  return useQuery({
    queryKey: ['gastos', userId],
    queryFn: async () => {
      if (!userId) return []
      const q = query(gastosCol, where('userId', '==', userId), orderBy('fecha', 'desc'))
      const snap = await getDocs(q)
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Gasto))
    },
    enabled: !!userId,
  })
}

export function useCreateIngreso() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (ingreso: Omit<Ingreso, 'id'>) => {
      const toSave = { ...ingreso, createdAt: serverTimestamp() }
      const ref = await addDoc(ingresosCol, toSave)
      return ref.id
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['ingresos'] }),
  })
}

export function useUpdateIngreso() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Ingreso> }) => {
      const ref = doc(db, 'ingresos', id)
      await updateDoc(ref, data)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['ingresos'] }),
  })
}

export function useDeleteIngreso() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const ref = doc(db, 'ingresos', id)
      await deleteDoc(ref)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['ingresos'] }),
  })
}

export function useCreateGasto() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (gasto: Omit<Gasto, 'id'>) => {
      const toSave = { ...gasto, createdAt: serverTimestamp() }
      const ref = await addDoc(gastosCol, toSave)
      return ref.id
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['gastos'] }),
  })
}

export function useUpdateGasto() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Gasto> }) => {
      const ref = doc(db, 'gastos', id)
      await updateDoc(ref, data)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['gastos'] }),
  })
}

export function useDeleteGasto() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const ref = doc(db, 'gastos', id)
      await deleteDoc(ref)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['gastos'] }),
  })
}
