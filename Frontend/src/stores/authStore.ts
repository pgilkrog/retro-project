import { defineStore } from "pinia"
import axios from "axios"
import type { IUser } from "@/models/index"
import setAuthToken from "@/helpers/setAuthToken"
import { errorStore } from "./errorStore"
import router from "@/router"

const url = import.meta.env.VITE_BASE_URL + '/auth'

export const useAuthStore = defineStore("auth",() => {
  const errorstore = errorStore()

  const isLoggedIn = ref<Boolean>(false)
  const user = ref<IUser>()
  const checkedAuth = ref<Boolean>(false)
  const token = ref<string>()
  const userId = ref<string>()

  const init = async (): Promise<void> => {
    await checkIfUserIsLoggedIn()
  }
  
  const checkIfUserIsLoggedIn = async (): Promise<void> => {
    token.value = sessionStorage.getItem('token') ?? undefined
    userId.value = sessionStorage.getItem('userId') ?? undefined

    if (!userId.value && !token.value) return 
    
    isLoggedIn.value = true
    checkedAuth.value = true

    await refreshToken()
  }

  const loginUser = async (email: string, password: string): Promise<void> => {
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

  const registerUser = async (userName: string, password: string): Promise<void> => {
    try {
      const user = {email: userName, password: password}
      const response = await axios.post(url, user)
      console.log(response)
    } catch (error: any) {
      console.log(error)
    }
  }
  
  const signOut = (): void => {
    isLoggedIn.value = false
    user.value = undefined
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userId')
    router.push({ name: 'login' })
  }

  const changePassword = (password: string) => {
    // updatePassword(this.getUser, password)
  }
  
  const setToken = (newToken: string): void => {
    token.value = newToken
    sessionStorage.setItem('token', newToken)
  }
  
  const refreshToken = async (): Promise<void> => {
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
