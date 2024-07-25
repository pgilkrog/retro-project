import { defineStore } from "pinia"
import { chatStore } from "./chatStore"
import { programsStore } from "./programsStore"
import type { IUser, IUserSettings } from "@/models/index"
import { ref } from 'vue'
import axios from "axios"
import setAuthToken from "@/helpers/setAuthToken"

const url = import.meta.env.VITE_BASE_URL + '/user'
type UserWithOnlineStatus = IUser & { online: boolean }; // Add online status type

export const userStore = defineStore("user", () => {
  const allUsers = ref<IUser[]>()
  const onlineUsers = reactive<string[]>([])
  const userData = ref<IUser>()

  const programstore = programsStore()
  const chatstore = chatStore()

  const getAllUsers = async (): Promise<void> => {
    setAuthToken(sessionStorage.getItem('token') as string)
    try {
      const response = await axios.get(url)
      const { data, statusText } = response

      if (statusText !== 'OK') return 

      const users = data.users.map((user: IUser): UserWithOnlineStatus => ({
        ...user,
        online: chatstore.onlineUsers.includes(user.email),
      }))

      setAllUsers(users)
  
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const getUserById = async (): Promise<void> => {
    const userId = sessionStorage.getItem('userId')

    if (userId == undefined) return 

    try {
      const response = await axios.get(`${url}/${userId}`)
      setUserData(response.data.user)
      userData.value
      programstore.getInstalledPrograms()
    } catch (error) {
      console.log(error)
    }
  }

  const updateUser = async (user: IUser): Promise<void> => {
    const res = await axios.put(url + '/' + user._id, null, { params: user })
    setUserData(res.data)
  }

  const updateUserSettings = async (settings: IUserSettings): Promise<void> => {
    try {
      await axios.put(`${url}/settings/${settings._id}`, null, { params: settings })
    } catch (error) {
      console.log(error) 
    }
  }

  const setUserData = (user: IUser): void => {
    userData.value = user
    programstore.setInstalledPrograms(user.installedPrograms)
  }

  const setAllUsers = (users: IUser[] | undefined): void => {
    allUsers.value = users
  }

  return {
    allUsers,
    userData,
    programstore,
    getAllUsers,
    setUserData,
    getUserById,
    updateUser,
    updateUserSettings
  }
})