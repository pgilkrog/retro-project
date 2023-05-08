import { defineStore } from "pinia"
import axios from "axios"
const url = 'http://localhost:4000/api/auth'
import type { IUser } from "@/models/index"
import setAuthToken from "@/helpers/setAuthToken"

export const authStore = defineStore("auth", {
  state: () => ({
    _isLoggedIn: false as Boolean,
    _user: {} as IUser,
    _checkedAuth: false as Boolean,
    _token: "",
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
        const response = await axios.post(url + '/login/', { email: email, password: password })
        const { token, user } = response.data
        sessionStorage.setItem('token', token)
        sessionStorage.setItem('userId', user._id)
        console.log("USER", user)
        this._user = user
        this._isLoggedIn = true
        this._checkedAuth = true
        console.log("LOGIN RESPONSE", response)        
      } catch (error) {
        console.log(error)
      }
    },
    async registerUser(userName: string, password: string) {
      try {
        const user = {email: userName, password: password}
        const response = await axios.post(url, user)
        console.log(response)
      } catch (error: any) {
        console.log(error.log)
      }
    },
    async signOut() {
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
