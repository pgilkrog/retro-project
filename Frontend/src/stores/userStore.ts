import { defineStore } from "pinia"
import { errorStore } from "./errorStore"
import { programsStore } from "./programsStore"
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
    _backgroundImage: "" as string,
    _useBackgroundImage: false as boolean,
    _backgroundColour: "" as string,
    errorstore: errorStore(),
    programstore: programsStore()
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
    setUserData(user: any) {
      this._userData = {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        type: user.type,
        installedPrograms: user.installedPrograms,
        settings: {
          id: user.settings._id,
          backgroundColour: user.settings.backgroundColour,
          backgroundImage: user.settings.backgroundImage,
          useBackgroundImage: user.settings.useBackground,
          theme: user.settings.theme
        }
      } as IUser
      this._userData.id = user._id

      if (user.settings !== undefined) {
        this.setUserSettings(user.settings)
      }

      this.programstore.setInstalledPrograms(user.installedPrograms)
    },
    setUserSettings(settings: IUserSettings) {
      debugger
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
      this.setUserData(res.data.user)
      return this.getUserData
    },
    async updateUser(user: IUser) {
      // Need to set the settings to the settings id for the backend to read
      let tempUser = user
      tempUser.settings = (user.settings as IUserSettings).id
      const res = await axios.put(url + '/' + sessionStorage.getItem('userId'), null, { params: tempUser })
      console.log(res)
      this.setUserData(res.data)
    },
    async updateUserSettings(settings: IUserSettings) {
      const res = await axios.put(`${url}/settings/${settings.id}`, null, { params: settings })
      console.log("update user settings", res)
      this.setUserSettings(res.data)
    }
  }
})