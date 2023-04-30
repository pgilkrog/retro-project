import type { IErrorItem } from "@/models/IErrorItem"
import { defineStore } from "pinia"
import { toRaw } from 'vue'

export const errorStore = defineStore("errors", {
  state: () => ({
    _error: undefined as IErrorItem | undefined,
    _errorList: [] as IErrorItem[]
  }),
  getters: {
    getAllErrors: (state) => state._errorList,
    getError: (state) => toRaw(state._error)
  },
  actions: {
    setErrorList() {
      // DBHelper.getAll('errorLogs').then(data => {
      //   let temp = []
      //   for(let item in data) {
      //     temp.push(data[+item] as IErrorItem)
      //   }
      //   this._errorList = temp
      // })
    },
    setError(error: IErrorItem) {
      this._error = error
      // dbHelper.create('errorLogs', error)
    },
    resetError() {
      this._error = undefined
    }
  }
})