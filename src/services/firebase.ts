import { initializeApp } from 'firebase/app'
// @ts-ignore
import { getAuth } from 'firebase/auth'
// @ts-ignore
import { getFirestore } from 'firebase/firestore'
// @ts-ignore
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyC66CuEa4-bMpTQuyHuVz7_pwJzDy85kr8",
  authDomain: "pintu-master.firebaseapp.com",
  projectId: "pintu-master",
  storageBucket: "pintu-master.firebasestorage.app",
  messagingSenderId: "932975429306",
  appId: "1:932975429306:web:be30980ee2a200982f2483"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
