import type { IErrorItem } from "@/models/IErrorItem"
import { defineStore } from "pinia"
import dbHelper from '@/helpers/DBHelper'

export const errorStore = defineStore("errors", {
  state: () => ({
    _error: {} as IErrorItem
  }),
  actions: {
    setError(error: IErrorItem) {
      this._error = error
      dbHelper.create('errorLogs', error)
    },
    resetError() {
      this._error = {text: '', icon: '', show: false, timeStamp: new Date()}
    }
  },
  getters: {
    getError: (state) => state._error
  }
})