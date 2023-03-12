import type { IErrorItem } from "@/models/IErrorItem"
import { defineStore } from "pinia"
import dbHelper from '@/helpers/DBHelper'
import { toRaw } from 'vue'

export const errorStore = defineStore("errors", {
  state: () => ({
    _error: undefined as IErrorItem | undefined
  }),
  getters: {
    getError: (state) => toRaw(state._error)
  },
  actions: {
    setError(error: IErrorItem) {
      this._error = error
      // dbHelper.create('errorLogs', error)
    },
    resetError() {
      this._error = undefined
    }
  }
})