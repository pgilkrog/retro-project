import { defineStore } from "pinia"

export const userStore = defineStore("user", {
  state: () => ({
    _isLoggedIn: true
  }),
  actions: {
    loginUser(userName: string, password: string) {
      if(userName != "" && password != "")
        this._isLoggedIn = true
    },
  },
  getters: {
    getIsLoggedIn: (state) => state._isLoggedIn
  }
})