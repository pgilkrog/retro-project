import type { IErrorItem } from "@/models/IErrorItem"
import { defineStore } from "pinia"

export const errorStore = defineStore("errors", {
  state: () => ({
    _error: {} as IErrorItem
  }),
  actions: {
    setError(error: any) {
      this._error = error
    },
    resetError() {
      this._error = {title: '', icon: '', show: false}
    }
  },
  getters: {
    getError: (state) => state._error
  }
})