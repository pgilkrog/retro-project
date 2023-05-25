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
  const checkedAuth = ref<Boolean>()
  const token = ref<String>("")

  const init = async () => {
    await checkIfUserIsLoggedIn()
  }
  
  const checkIfUserIsLoggedIn = async () => {
    const localToken = sessionStorage.getItem('token')
    const localUser = sessionStorage.getItem('userId')
    if (localUser && localToken)
      await refreshToken()
    
    checkedAuth.value = true
  }

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post(url + '/login/', { email: email, password: password })
      const { token, user } = response.data
      sessionStorage.setItem('token', token)
      sessionStorage.setItem('userId', user._id)
      console.log("USER", user)
      user.value = user
      isLoggedIn.value = true
      checkedAuth.value = true
      console.log("LOGIN RESPONSE", response)        
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
    const localUserId= sessionStorage.getItem('userId')
    const localToken = sessionStorage.getItem('token')
    
    const response = await axios.post(url + '/refreshToken/', { id: localUserId})

    console.log(response)
    if (localToken)
      setAuthToken(localToken)

    sessionStorage.setItem('userId', response.data.user._id)
    setToken(response.data.token)
    user.value = response.data.user
    isLoggedIn.value = true
    checkedAuth.value = true
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
