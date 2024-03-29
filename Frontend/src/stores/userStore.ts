import { defineStore } from "pinia"
import { chatStore } from "./chatStore"
import { errorStore } from "./errorStore"
import { programsStore } from "./programsStore"
import type { IUser, IFile, IUserSettings } from "@/models/index"
import { toRaw, ref } from 'vue'
import axios from "axios"
import setAuthToken from "@/helpers/setAuthToken"

const url = import.meta.env.VITE_BASE_URL + '/user'

export const userStore = defineStore("user", () => {

  const allUsers = ref<IUser[]>([])
  const userData = ref<IUser>()
  const userSettings = ref<IUserSettings>()
  const userBackgroundImage = ref<string>("")
  const useBackgroundImage = ref<boolean>(false)
  const userBackgroundColour = ref<string>("")
  const errorstore = errorStore()
  const programstore = programsStore()
  const chatstore = chatStore()

  const getAllUsers = async () => {
    setAuthToken(sessionStorage.getItem('token') as string)
    const res = axios.get(url).then(data => {
      let tempData = data.data.users
      let tempArray: IUser[] = []
      for(const user in tempData) {
        tempArray.push(tempData[user] as IUser)
        tempData[user] = chatstore.onlineUsers.includes(tempData[user].email) ? true : false
      }
      allUsers.value = tempArray
      console.log("SET ALL USERS", res)
    })
  }

  const setUserData = async (user: any) => {
    userData.value = user as IUser

    if (user.settings !== undefined) {
      setUserSettings(user.settings)
    }

    programstore.setInstalledPrograms(user.installedPrograms)
  }

  const setUserSettings = (settings: IUserSettings) => {
    setUserBackgroundImage(settings.backgroundImage)
    setBackgroundColour(settings.backgroundColour)
    setUseBackgroundImage(settings.useBackground)
  }

  const setUserBackgroundImage = (image: string) => {
    userBackgroundImage.value = image
  }

  const setUseBackgroundImage = (bool: boolean) => {
    useBackgroundImage.value = bool
  }

  const setBackgroundColour = (colour: string) => {
    userBackgroundColour.value = colour
  }

  const getUserById = async () => {
    const res = await axios.get(url + '/' + sessionStorage.getItem('userId'))
    console.log("GET USER", res)
    res.data.user.id = res.data.user._id
    res.data.user.settings.id = res.data.user.settings._id
    setUserData(res.data.user)
    return userData.value
  }

  const updateUser = async (user: IUser) => {
    // tempUser.settings = (user.settings as IUserSettings).id
    const res = await axios.put(url + '/' + user._id, null, { params: user })
    console.log(res)
    setUserData(res.data)
  }

  const updateUserSettings = async (settings: IUserSettings) => {
    const res = await axios.put(`${url}/settings/${settings._id}`, null, { params: settings })
    console.log("update user settings", res)
    setUserSettings(res.data)
  }

  return {
    allUsers,
    userData,
    userSettings,
    userBackgroundImage,
    useBackgroundImage,
    userBackgroundColour,
    programstore,
    getAllUsers,
    setUserData,
    setUserSettings,
    setUserBackgroundImage,
    setUseBackgroundImage,
    setBackgroundColour,
    getUserById,
    updateUser,
    updateUserSettings
  }
})