import { defineStore } from "pinia"
import { errorStore } from "./errorStore"
import type { IUser, IFile, IUserSettings } from "@/models/index"
import { toRaw } from 'vue'
import axios from "axios"
import setAuthToken from "@/helpers/setAuthToken"

const url = 'http://localhost:4000/api/user'

export const userStore = defineStore("user", {
  state: () => ({
    _allUsers: [] as IUser[],
    _userData: {} as IUser,
    _userSettings: {} as IUserSettings,
    errorstore: errorStore(),
    _backgroundImage: "" as string,
    _useBackgroundImage: false as boolean,
    _backgroundColour: "" as string
  }),
  getters: {
    getUserData: (state) => toRaw(state._userData),
    getUserSettings: (state) => (state._userSettings),
    getAllUsers: (state) => (state._allUsers),

    getUserBackgroundImage: (state) => toRaw(state._backgroundImage),
    getUserBackgroundColour: (state) => (state._backgroundColour),
    getUseBackgroundImage: (state) => (state._useBackgroundImage)
  },
  actions: {
    async setAllUsers() {
      setAuthToken(sessionStorage.getItem('token') as string)
      const res = axios.get(url).then(data => {
        let tempData = data.data.users
        let tempArray: IUser[] = []
        for(const user in tempData) {
          tempArray.push({
            id: tempData[user]._id,
            email: tempData[user].email,
            firstName: tempData[user].firstName,
            lastName: tempData[user].lastName,
            type: tempData[user].type,
            installedPrograms: tempData[user].installedPrograms,
            settings: tempData[user].settings !== undefined ? {
              id: tempData[user].settings._id,
              backgroundColour: tempData[user].settings.backgroundColour,
              backgroundImage: tempData[user].settings.backgroundImage,
              useBackgroundImage: tempData[user].settings.useBackground,
              theme: tempData[user].settings.theme
            } : undefined
          } as IUser)
        }
        this._allUsers = tempArray
        console.log("SET ALL USERS", res)
      })
    },
    setUserData(userData: IUser) {
      this._userData = userData
    },
    setUserSettings(settings: IUserSettings) {
      this.setUserBackgroundImage(settings.backgroundImage)
      this.setBackgroundColour(settings.backgroundColour)
      this.setUseBackgroundImage(settings.useBackgroundImage)
    },
    setUserBackgroundImage(image: string) {
      this._backgroundImage = image
    },
    setUseBackgroundImage(bool: boolean) {
      this._useBackgroundImage = bool
    },
    setBackgroundColour(colour: string) {
      this._backgroundColour = colour
    },
    async getUserById() {
      const res = await axios.get(url + '/' + sessionStorage.getItem('userId'))
      console.log("GET USER", res)
      this._userData = {
        id: res.data.user._id,
        email: res.data.user.email,
        firstName: res.data.user.firstName,
        lastName: res.data.user.lastName,
        type: res.data.user.type,
        installedPrograms: res.data.user.installedPrograms,
        settings: {
          id: res.data.user.settings._id,
          backgroundColour: res.data.user.settings.backgroundColour,
          backgroundImage: res.data.user.settings.backgroundImage,
          useBackgroundImage: res.data.user.settings.useBackground,
          theme: res.data.user.settings.theme
        }
      } as IUser
      this._userData.id = res.data.user._id

      if (res.data.user.settings !== undefined) {
        this.setUserSettings(res.data.user.settings)
      }

      return this.getUserData
    },
    async updateUser(user: IUser) {
      const res = await axios.put(url + '/' + sessionStorage.getItem('userId'), null, { params: user })
      console.log(res)
      this._userData = res.data.user
    },
    async updateUserSettings(settings: IUserSettings) {
      console.log("UPDATE USERSETTINGS FRONTEND", settings.id, settings)
      const res = await axios.put(`${url}/settings/${settings.id}`, null, { params: settings })
      console.log("update user settings", res)
      this.setUserSettings(res.data)
    }
  }
})