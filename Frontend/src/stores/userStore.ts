import { defineStore } from "pinia"
import { errorStore } from "./errorStore"
import type { IFile, IUser, IUserSettings } from "@/models"
import DBHelper from "@/helpers/DBHelper"
import { toRaw } from 'vue'
import axios from "axios"

const url = 'http://localhost:4000/api/user'

export const userStore = defineStore("user", {
  state: () => ({
    _userData: {} as IUser,
    errorstore: errorStore(),
    _backgroundImages: [] as IFile[],
    _backgroundInUse: "" as string,
  }),
  getters: {
    getUserData: (state) => toRaw(state._userData),
    getUserBackgroundImages: (state) => toRaw(state._backgroundImages),
    getBackgroundInUse: (state) => state._backgroundInUse
  },
  actions: {
    async init() {
      // await this.loadUserData(userId)
      this.getUserById()
    },
    async loadUserData(userId: string) {
      DBHelper.getOneByUserId('users', userId).then((userData) => {
        this.setUserData(userData as IUser)
        this.setBackgroundInUse(userData.UseBackgroundImage)
        this.setUserBackgroundImages(userData.Files.filter((file: IFile) => file.Type === 'BackgroundImage'))
        console.log("USER DATA", userData)
      })
    },
    setUserData(userData: IUser) {
      this._userData = userData
    },
    setUserBackgroundImages(files: IFile[]) {
      this._backgroundImages = files
    },
    setBackgroundInUse(url: string) {
      this._backgroundInUse = url
    },
    async getUserById() {
      const res = await axios.get(url + '/' + sessionStorage.getItem('userId'))
      console.log("GET USER", res)
      this._userData = res.data.user as IUser
    },
    async updateUser(user: IUser) {
      const res = await axios.put(url + '/' + sessionStorage.getItem('userId'), user)
      console.log(res)
    },
    async updateUserSettings(settings: IUserSettings) {
      const res = await axios.put(url + '/settings/' + settings.id)
      console.log(res)
    }
  }
})