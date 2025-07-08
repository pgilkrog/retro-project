import { defineStore } from 'pinia'
import type { IUser } from '@/models/index'
import setAuthToken from '@/helpers/setAuthToken'
import router from '@/router'
import { post } from '@/helpers/httpHelper'

const url = '/auth'

interface IAuthResponse {
  data: {
    token: string
    resUser: IUser
  }
}

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref<boolean>(false)
  const checkedAuth = ref<boolean>(false)

  const user = ref<IUser>()
  const token = ref<string>()
  const userId = ref<string>()

  const checkIfUserIsLoggedIn = async (): Promise<void> => {
    token.value = sessionStorage.getItem('token') ?? undefined
    userId.value = sessionStorage.getItem('userId') ?? undefined

    if (userId.value != undefined && token.value != undefined) {
      isLoggedIn.value = true
      checkedAuth.value = true

      await refreshToken()
    }
  }

  const loginUser = async (email: string, password: string): Promise<void> => {
    const response = await post<IAuthResponse>(url + '/login/', {
      email: email,
      password: password,
    })

    const { token, resUser } = response.data

    sessionStorage.setItem('token', token)
    sessionStorage.setItem('userId', resUser._id)

    user.value = resUser
    isLoggedIn.value = true
    checkedAuth.value = true
  }

  const registerUser = async (userName: string, password: string): Promise<void> => {
    const user = { email: userName, password: password }
    await post(url, user)
  }

  const signOut = (): void => {
    isLoggedIn.value = false
    user.value = undefined
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userId')
    router.push({ name: 'login' })
  }

  const setToken = (newToken: string): void => {
    token.value = newToken
    sessionStorage.setItem('token', newToken)
  }

  const refreshToken = async (): Promise<void> => {
    token.value = sessionStorage.getItem('token') ?? ''
    userId.value = sessionStorage.getItem('userId') ?? ''

    const response = await post<IAuthResponse>(url + '/refreshToken/', {
      id: userId.value,
    })

    if (token.value !== '') {
      setAuthToken(token.value)
    }

    sessionStorage.setItem('userId', response.data.resUser._id)

    setToken(response.data.token)
    user.value = response.data.resUser
  }

  return {
    isLoggedIn,
    user,
    checkedAuth,
    checkIfUserIsLoggedIn,
    loginUser,
    registerUser,
    signOut,
  }
})
