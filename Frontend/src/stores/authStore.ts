import { defineStore } from "pinia"
import axios from "axios"
const url = 'http://localhost:4000/api/auth'
import type { IUser } from "@/models/index"
import setAuthToken from "@/helpers/setAuthToken"
import { ref } from 'vue'
import { errorStore } from "./errorStore"

export const authStore = defineStore("auth",() => {
  const errorstore = errorStore()
  const isLoggedIn = ref<Boolean>(false)
  const user = ref<IUser>()
  const checkedAuth = ref<Boolean>(false)
 
  const token = ref<string | undefined>()
  const userId = ref<string | undefined>()

  const init = async () => {
    await checkIfUserIsLoggedIn()
  }
  
  const checkIfUserIsLoggedIn = async () => {
    token.value = sessionStorage.getItem('token') ?? undefined
    userId.value = sessionStorage.getItem('userId') ?? undefined

    if (!userId.value && !token.value) return 
    
    isLoggedIn.value = true
    checkedAuth.value = true

    await refreshToken()
  }

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post(url + '/login/', { email: email, password: password })
      const { token, user } = response.data

      sessionStorage.setItem('token', token)
      sessionStorage.setItem('userId', user._id)

      user.value = user
      isLoggedIn.value = true
      checkedAuth.value = true

    } catch (error: any) {
      console.log(error)
      let message = error.response.data.msg !== undefined ? error.response.data.msg : error.response.data.errors[0].msg
      errorstore.setError(message)
    }
  }

  const registerUser = async (userName: string, password: string) => {
    try {
      const user = {email: userName, password: password}
      const response = await axios.post(url, user)
      console.log(response)
    } catch (error: any) {
      console.log(error)
    }
  }
  
  const signOut = async () => {
    isLoggedIn.value = false
    user.value = {} as IUser
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userId')
  }

  const changePassword = (password: string) => {
    // updatePassword(this.getUser, password)
  }
  
  const setToken = (newToken: string) => {
    token.value = newToken
    sessionStorage.setItem('token', newToken)
  }
  
  const refreshToken = async () => {
    token.value = sessionStorage.getItem('token') ?? undefined
    userId.value = sessionStorage.getItem('userId') ?? undefined

    const response = await axios.post(url + '/refreshToken/', { id: userId.value})

    if (token.value) setAuthToken(token.value)

    sessionStorage.setItem('userId', response.data.user._id)
    setToken(response.data.token)
    user.value = response.data.user
  }

  return {
    isLoggedIn,
    user,
    checkedAuth,
    token,
    init,
    checkIfUserIsLoggedIn,
    loginUser,
    registerUser,
    signOut,
    changePassword,
    setToken,
    refreshToken,
  }
})
