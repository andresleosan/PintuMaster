import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getStorage, type FirebaseStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const isConfigValid = !!firebaseConfig.apiKey && firebaseConfig.apiKey.trim() !== ''

let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null
let storage: FirebaseStorage | null = null

if (isConfigValid) {
  try {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)
    storage = getStorage(app)
  } catch (error) {
    console.error('Firebase initialization failed:', error)
  }
}

export { app, auth, db, storage }
export default app

export function requireAuth(): Auth {
  if (!auth) throw new Error('Firebase authentication is not configured')
  return auth
}

export function requireDb(): Firestore {
  if (!db) throw new Error('Firestore is not configured')
  return db
}
