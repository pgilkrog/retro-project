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
import { userStore } from "./userStore"

export const authStore = defineStore("auth", {
  state: () => ({
    _isLoggedIn: false,
    _user: {} as User,
    _checkedAuth: false,
    errorstore: errorStore(),
    userstore: userStore(),
  }),
  getters: {
    getIsLoggedIn: (state) => state._isLoggedIn,
    getUser: (state) => state._user,
    getCheckedAuth: (state) => state._checkedAuth,
  },
  actions: {
    async init() {
      await this.checkIfUserIsLoggedIn()
    },
    async checkIfUserIsLoggedIn() {
      await onAuthStateChanged(auth, (user) => {
        console.log('USER', user)
        this._isLoggedIn = Boolean(user)
        this._user = user || {} as User
        this._checkedAuth = true
        if (user !== undefined && user !== null)
          this.userstore.init(user.uid)
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
            icon: '', 
            timeStamp: new Date()
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
            icon: '',
            timeStamp: new Date()
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
    }
  }
})