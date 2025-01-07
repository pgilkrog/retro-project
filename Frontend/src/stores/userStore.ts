import { defineStore } from 'pinia'
import { chatStore } from './chatStore'
import type { IUser, IUserResponse, IUserSettings } from '@/models'
import { ref } from 'vue'
import setAuthToken from '@/helpers/setAuthToken'
import { get, put } from '@/helpers/httpHelper'

const url = '/user'
type UserWithOnlineStatus = IUser & { online: boolean } // Add online status type

export const userStore = defineStore('user', () => {
  const chatstore = chatStore()

  const allUsers = ref<IUser[]>()
  const userData = ref<IUser>()

  const getAllUsers = async (): Promise<void> => {
    setAuthToken(sessionStorage.getItem('token') ?? '')

    const response = await get<{ users: IUser[]; status: boolean }>(url)

    if (response.status == true) {
      const users = response.users.map(
        (user: IUser): UserWithOnlineStatus => ({
          ...user,
          online: chatstore.onlineUsers.includes(user.email),
        })
      )

      setAllUsers(users)
    }
  }

  const getUserById = async (): Promise<void> => {
    const userId = sessionStorage.getItem('userId')
    if (userId == undefined) {
      return
    }

    const response = await get<IUserResponse>(`${url}/${userId}`)
    if (response.status === true && response.user !== undefined) {
      setUserData(response.user)
    }
  }

  const updateUser = async (user: IUser): Promise<void> => {
    const response = await put<IUserResponse>(url + `/${user._id}`, { params: user })

    if (response.status === true && response.user !== undefined) {
      setUserData(response.user)
    }
  }

  const updateUserSettings = async (settings: IUserSettings): Promise<void> => {
    await put(`${url}/settings/${settings._id}`, settings)
  }

  const setUserData = (user: IUser) => {
    userData.value = user
  }

  const setAllUsers = (users: IUser[] | undefined): void => {
    allUsers.value = users
  }

  return {
    allUsers,
    userData,
    getAllUsers,
    setUserData,
    getUserById,
    updateUser,
    updateUserSettings,
  }
})
