import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { db } from '@/services/firebase'
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { Trabajo } from '@/types/models'

const trabajosCol = collection(db, 'trabajos')

export function useTrabajos(userId: string | undefined) {
  return useQuery({
    queryKey: ['trabajos', userId],
    queryFn: async () => {
      if (!userId) return []
      const q = query(trabajosCol, where('userId', '==', userId), orderBy('fechaCreacion', 'desc'))
      const snap = await getDocs(q)
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Trabajo))
    },
    enabled: !!userId,
  })
}

export function useTrabajoById(id: string | undefined) {
  return useQuery({
    queryKey: ['trabajo', id],
    queryFn: async () => {
      if (!id) return null
      const ref = doc(db, 'trabajos', id)
      const snap = await getDoc(ref)
      if (!snap.exists()) return null
      return { id: snap.id, ...snap.data() } as Trabajo
    },
    enabled: !!id,
  })
}

export function useCreateTrabajo() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (trabajo: Omit<Trabajo, 'id'>) => {
      const toSave = { ...trabajo, fechaCreacion: serverTimestamp() }
      const ref = await addDoc(trabajosCol, toSave)
      return ref.id
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['trabajos'] })
    },
  })
}

export function useUpdateTrabajo() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Trabajo> }) => {
      const ref = doc(db, 'trabajos', id)
      await updateDoc(ref, data)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['trabajos'] })
    },
  })
}

export function useDeleteTrabajo() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const ref = doc(db, 'trabajos', id)
      await deleteDoc(ref)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['trabajos'] })
    },
  })
}
