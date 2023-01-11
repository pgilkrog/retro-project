import { defineStore } from "pinia"
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword
} from "firebase/auth"
import { auth } from '@/firebase'
import { errorStore } from "./errorStore"
import type { FirebaseError } from "firebase/app"
import type { User } from "firebase/auth"

export const userStore = defineStore("user", {
  state: () => ({
    _isLoggedIn: false,
    _user: {} as User,
    errorstore: errorStore()
  }),
  actions: {
    async init() {
      await this.checkIfUserIsLoggedIn()
    },
    async checkIfUserIsLoggedIn() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this._isLoggedIn = true
          this._user = user
        } else {
          this._isLoggedIn = false
          this._user = {} as User
        }
      })
    },
    async loginUser(email: string, password: string) {
      signInWithEmailAndPassword(auth, email, password)
        .then((data: any) => {
          this._isLoggedIn = true
          this._user = data as User
        })
        .catch((error: FirebaseError) => {
          this.errorstore.setError({
            show: true,
            text: error.message,
            icon: ''
          })
        })
    },
    async registerUser(userName: string, password: string) {
      createUserWithEmailAndPassword(auth, userName, password)
        .then((data: any) => {
          this._isLoggedIn = true
        })        
        .catch((error: FirebaseError) => {
          this.errorstore.setError({
            show: true,
            text: error.message,
            icon: ''
          })
        })
    },
    async signOut() {
      signOut(auth)
      this._isLoggedIn = false
      this._user = {} as User
    },
    async changePassword(password: string) {
      updatePassword(this.getUser, password)
    },
  },
  getters: {
    getIsLoggedIn: (state) => state._isLoggedIn,
    getUser: (state) => state._user,
  }
})