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
import setAuthToken from "@/helpers/setAuthToken"

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
      const localToken = localStorage.getItem('token')
      const localUser = localStorage.getItem('userId')
      if (localUser && localToken)
        await this.refreshToken()
      
      this._checkedAuth = true
    },
    async loginUser(email: string, password: string) {
      try {
        debugger
        const response = await axios.post(url + '/login/', { email: email, password: password })
        const { token, user } = response.data
        localStorage.setItem('token', token)
        localStorage.setItem('userId', user._id)
        this._user = user
        this._isLoggedIn = true
        this._checkedAuth = true
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
      localStorage.removeItem('userId')
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
      const localUserId= localStorage.getItem('userId')
      const localToken = localStorage.getItem('token')
      
      const response = await axios.post(url + '/refreshToken/', { id: localUserId})

      console.log(response)
      if (localToken)
        setAuthToken(localToken)

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userId', response.data.user._id)
      this.setToken(response.data.token)
      this._user = response.data.user
      this._isLoggedIn = true
      this._checkedAuth = true
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
