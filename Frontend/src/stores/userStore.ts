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
  const userData = ref<IUser>()

  const programstore = programsStore()
  const chatstore = chatStore()

  const isUserOnline = computed(() => (email: string) =>
    chatstore.onlineUsers.includes(email)
  ); // Use computed for online status

  const getAllUsers = async () => {
    setAuthToken(sessionStorage.getItem('token') as string)
    try {
      const response = await axios.get(url)
      const { data, statusText } = response

      if (statusText !== 'OK') return undefined

      const users = data.users.map((user: IUser): UserWithOnlineStatus => ({
        ...user,
        online: isUserOnline.value(user.email),
      }))

      setAllUsers(users)
  
    } catch (error) {
      console.error("Error fetching users:", error)
    }

  }

  const setUserData = async (user: IUser) => {
    userData.value = user
    programstore.setInstalledPrograms(user.installedPrograms)
  }

  const getUserById = async () => {
    const userId = sessionStorage.getItem('userId')

    if (userId == undefined) return undefined


    const res = await axios.get(`${url}/${userId}`)
    console.log("GET USER", res)
    setUserData(res.data.user)
    return userData.value
  }

  const updateUser = async (user: IUser) => {
    const res = await axios.put(url + '/' + user._id, null, { params: user })
    console.log(res)
    setUserData(res.data)
  }

  const updateUserSettings = async (settings: IUserSettings) => {
    const res = await axios.put(`${url}/settings/${settings._id}`, null, { params: settings })
    console.log("update user settings", res)
  }

  const setAllUsers = (users: IUser[] | undefined) => {
    allUsers.value = users
    console.log("SET ALL USERS", users)
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