import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { auth } from '@/services/firebase'
// @ts-ignore
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth'

interface User {
  uid: string
  email: string
}

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  isInitialized: boolean

  signup: (email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  setUser: (user: User | null) => void
  clearError: () => void
  initializeAuth: () => (() => void) | undefined
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,
      isInitialized: false,

      signup: async (email: string, password: string) => {
        try {
          set({ loading: true, error: null })
          const userCredential = await createUserWithEmailAndPassword(auth, email, password)
          const firebaseUser = userCredential.user
          set({
            user: { uid: firebaseUser.uid, email: firebaseUser.email || '' },
            loading: false
          })
        } catch (error: any) {
          const errorMessage = error?.message || 'Signup failed'
          set({ error: errorMessage, loading: false })
          throw error
        }
      },

      login: async (email: string, password: string) => {
        try {
          set({ loading: true, error: null })
          const userCredential = await signInWithEmailAndPassword(auth, email, password)
          const firebaseUser = userCredential.user
          set({
            user: { uid: firebaseUser.uid, email: firebaseUser.email || '' },
            loading: false
          })
        } catch (error: any) {
          const errorMessage = error?.message || 'Login failed'
          set({ error: errorMessage, loading: false })
          throw error
        }
      },

      logout: async () => {
        try {
          set({ loading: true, error: null })
          await signOut(auth)
          set({ user: null, loading: false })
        } catch (error: any) {
          const errorMessage = error?.message || 'Logout failed'
          set({ error: errorMessage, loading: false })
          throw error
        }
      },

      setUser: (user: User | null) => set({ user, loading: false }),

      clearError: () => set({ error: null }),

      initializeAuth: () => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
          if (firebaseUser) {
            set({
              user: { uid: firebaseUser.uid, email: firebaseUser.email || '' },
              isInitialized: true
            })
          } else {
            set({ user: null, isInitialized: true })
          }
        })
        return unsubscribe
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => typeof window !== 'undefined' ? localStorage : sessionStorage),
      partialize: (state) => ({ user: state.user })
    }
  )
)
