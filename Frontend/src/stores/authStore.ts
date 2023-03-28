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
    _token: "",
    errorstore: errorStore(),
    userstore: userStore(),
  }),
  getters: {
    getIsLoggedIn: (state) => state._isLoggedIn,
    getUser: (state) => state._user,
    getCheckedAuth: (state) => state._checkedAuth,
    getToken: (state) => state._token
  },
  actions: {
    async init() {
      await this.checkIfUserIsLoggedIn()
    },
    async checkIfUserIsLoggedIn() {
      const localToken = sessionStorage.getItem('token')
      const localUser = sessionStorage.getItem('userId')
      if (localUser && localToken)
        await this.refreshToken()
      
      this._checkedAuth = true
    },
    async loginUser(email: string, password: string) {
      try {
        debugger
        const response = await axios.post(url + '/login/', { email: email, password: password })
        const { token, user } = response.data
        sessionStorage.setItem('token', token)
        sessionStorage.setItem('userId', user._id)
        this._user = user
        this._isLoggedIn = true
        this._checkedAuth = true
        console.log("LOGIN RESPONSE", response)        
      } catch (error) {
        console.log(error)
      }
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
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('userId')
    },
    async changePassword(password: string) {
      // updatePassword(this.getUser, password)
    },
    setToken(token: string) {
      this._token = token
      sessionStorage.setItem('token', token)
    },
    async refreshToken() {
      const localUserId= sessionStorage.getItem('userId')
      const localToken = sessionStorage.getItem('token')
      
      const response = await axios.post(url + '/refreshToken/', { id: localUserId})

      console.log(response)
      if (localToken)
        setAuthToken(localToken)

      sessionStorage.setItem('userId', response.data.user._id)
      this.setToken(response.data.token)
      this._user = response.data.user
      this._isLoggedIn = true
      this._checkedAuth = true
    }
  }
})
