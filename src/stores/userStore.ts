import { defineStore } from "pinia"

export const userStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false
  }),
  actions: {
    loginUser(userName: string, password: string) {
      if(userName != "" && password != "")
        this.isLoggedIn = true
    },
    getIsLoggedIn() {
      return this.isLoggedIn
    }
  }
})