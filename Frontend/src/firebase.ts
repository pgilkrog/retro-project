import { initializeApp } from "firebase/app"
import { browserSessionPersistence, getAuth, setPersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDbbYFP4dgIr2azZsTfSv1UfkMXfvDc81Q",
  authDomain: "retro-project-e6344.firebaseapp.com",
  projectId: "retro-project-e6344",
  storageBucket: "retro-project-e6344.appspot.com",
  messagingSenderId: "214174830941",
  appId: "1:214174830941:web:db33e7460c92aa6f6258b4"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore(app)
const storage = getStorage()

setPersistence(auth, browserSessionPersistence)

export { app, auth, db, storage }