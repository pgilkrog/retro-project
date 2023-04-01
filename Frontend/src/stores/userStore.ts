import { defineStore } from "pinia"
import { errorStore } from "./errorStore"
import type { IFile, IUser, IUserSettings } from "@/models"
import DBHelper from "@/helpers/DBHelper"
import { toRaw } from 'vue'
import axios from "axios"
import setAuthToken from "@/helpers/setAuthToken"

const url = 'http://localhost:4000/api/user'

export const userStore = defineStore("user", {
  state: () => ({
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

    getUserBackgroundImage: (state) => toRaw(state._backgroundImage),
    getUserBackgroundColour: (state) => (state._backgroundColour),
    getUseBackgroundImage: (state) => (state._useBackgroundImage)
  },
  actions: {
    async init() {
      this.getUserById()
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
    },
    async updateUser(user: IUser) {
      const res = await axios.put(url + '/' + sessionStorage.getItem('userId'), user)
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