import { defineStore } from "pinia"
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth"
import { auth } from '@/firebase'
import { errorStore } from "./errorStore"
import type { FirebaseError } from "firebase/app"

export const userStore = defineStore("user", {
  state: () => ({
    _isLoggedIn: false,
    _user: {},
    errorstore: errorStore()
  }),
  actions: {
    async init() {
      await this.checkIfUserIsLoggedIn()
    },
    async checkIfUserIsLoggedIn() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("USER", user)
          this._isLoggedIn = true
          this._user = user
        }
      })
    },
    async loginUser(email: string, password: string) {
      signInWithEmailAndPassword(auth, email, password)
        .then((data: any) => {
          this._isLoggedIn = true
          this._user = data
        })
        .catch((error: FirebaseError) => {
          debugger
          this.errorstore.setError({
            show: true,
            text: error.message,
            icon: ''
          })
        })
    },
    registerUser(userName: string, password: string) {
      createUserWithEmailAndPassword(auth, userName, password).then((data: any) => {
        console.log(data)
        this._isLoggedIn = true
      })
    },
    async signOut() {
      signOut(auth)
      this._isLoggedIn = false
      this._user = {}
    }
  },
  getters: {
    getIsLoggedIn: (state) => state._isLoggedIn,
    getUser: (state) => state._user,
  }
})