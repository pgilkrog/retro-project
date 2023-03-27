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
import axios from "axios"
import { watch } from 'vue'
const url = 'http://localhost:4000/api/auth'
import type { IUser } from "@/models/index"

export const authStore = defineStore("auth", {
  state: () => ({
    _isLoggedIn: false as Boolean,
    _user: {} as IUser,
    _checkedAuth: false as Boolean,
    _token: localStorage.getItem('token'),
    _refreshToken: localStorage.getItem('refreshToken'),
    errorstore: errorStore(),
    userstore: userStore(),
  }),
  getters: {
    getIsLoggedIn: (state) => state._isLoggedIn,
    getUser: (state) => state._user,
    getCheckedAuth: (state) => state._checkedAuth,
    getToken: (state) => state._token,
    getRefreshToken: (state) => state._refreshToken
  },
  actions: {
    async init() {
      await this.checkIfUserIsLoggedIn()
    },
    async checkIfUserIsLoggedIn() {
      // await onAuthStateChanged(auth, (user) => {
      //   console.log('USER', user)
      //   this._isLoggedIn = Boolean(user)
      //   this._user = user || {} as User
      //   this._checkedAuth = true
      //   if (user !== undefined && user !== null)
      //     this.userstore.init(user.uid)
      // })
      
    },
    async loginUser(email: string, password: string) {
      try {
        const response = await axios.post(url + '/login/', { email: email, password: password })
        const { token, user } = response.data
        localStorage.setItem('token', token)
        this._user = user
        this._isLoggedIn = true
        console.log("LOGIN RESPONSE", response)        
      } catch (error) {
        console.log(error)
      }
    },
    setAuthData(token: string, refreshToken: string, user: IUser) {
      this._token = token
      this._refreshToken = refreshToken
      this._user = user
    },
    async registerUser(userName: string, password: string) {
      let user = {email: userName, password: password}
      const response = await axios.post(url, user)
      console.log(response)
    },
    async signOut() {
      // signOut(auth)
      this._isLoggedIn = false
      this._user = {} as IUser
      localStorage.removeItem('token')
    },
    async changePassword(password: string) {
      // updatePassword(this.getUser, password)
    },
    setToken(token: string) {
      this._token = token
      localStorage.setItem('token', token)
    },
    setRefreshToken(refreshToken: string): any {
      this._refreshToken = refreshToken
      localStorage.setItem('refreshToken', refreshToken)
      return { token: this.getToken, refeskToken: refreshToken, user: this.getUser }
    },
    async refreshToken() {
      const response = await axios.post(url + '/refreshToken', { id: this.getUser.Id})
      localStorage.setItem('token', response.data.token)
      return { token: response.data.token, rToken: this.getRefreshToken, user: this.getUser}
    }
    // async loginUser(email: string, password: string) {
      // signInWithEmailAndPassword(auth, email, password)
      //   .then((data: any) => {
      //     this._isLoggedIn = true
      //     this._user = data as User
      //   })
      //   .catch((error: FirebaseError) => {
      //     this.errorstore.setError({
      //       show: true,
      //       text: error.message,
      //       icon: '', 
      //       timeStamp: new Date()
      //     })
      //   })
    // },
  }
})
