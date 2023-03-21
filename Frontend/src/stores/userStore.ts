import { defineStore } from "pinia"
import { errorStore } from "./errorStore"
import type { IFile, IUser } from "@/models"
import DBHelper from "@/helpers/DBHelper"
import { toRaw } from 'vue'

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
    async init(userId: string) {
      await this.loadUserData(userId)
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
    }
  }
})