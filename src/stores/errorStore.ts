import type { IErrorItem } from "@/models/IErrorItem"
import { defineStore } from "pinia"

export const errorStore = defineStore("programs", {
  state: () => ({
    _error: {} as IErrorItem
  }),
  actions: {
    setError(error: any) {
      this._error = error
    }
  },
  getters: {
    getError: (state) => state._error
  }
})