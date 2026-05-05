import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface User {
  uid: string
  email: string
}

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null

  signup: (email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  setUser: (user: User | null) => void
  clearError: () => void
  initializeAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,

      signup: async (email: string, password: string) => {
        try {
          set({ loading: true, error: null })
          await new Promise(resolve => setTimeout(resolve, 500))
          set({ user: { uid: 'user-' + Date.now(), email }, loading: false })
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Signup failed', loading: false })
        }
      },

      login: async (email: string, password: string) => {
        try {
          set({ loading: true, error: null })
          await new Promise(resolve => setTimeout(resolve, 500))
          const newUser = { uid: 'user-' + Date.now(), email }
          set({ user: newUser, loading: false })
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Login failed', loading: false })
        }
      },

      logout: async () => {
        try {
          set({ loading: true, error: null })
          await new Promise(resolve => setTimeout(resolve, 300))
          set({ user: null, loading: false })
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Logout failed', loading: false })
        }
      },

      setUser: (user: User | null) => set({ user, loading: false }),

      clearError: () => set({ error: null }),

      initializeAuth: () => {
        // Firebase Auth initialization can be added here later
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => typeof window !== 'undefined' ? localStorage : sessionStorage),
      partialize: (state) => ({ user: state.user })
    }
  )
)
