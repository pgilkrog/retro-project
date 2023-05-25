import type { IErrorItem } from "@/models/IErrorItem"
import { defineStore } from "pinia"
import { ref, toRaw } from 'vue'

export const errorStore = defineStore("errors", () => {
  const error = ref<IErrorItem>()
  const errorList = ref<IErrorItem[]>([])

  const setErrorList = () => {
    errorList.value.push()
  }

  const setError = (text: string) => {
    error.value = {
      icon: 'bi bi-bug-fill',
      text: text,
      show: true,
      timeStamp: new Date()
    } as IErrorItem
    
    let tempList = errorList.value as IErrorItem[]
    tempList.push(error.value)
  }

  const resetError = () => {
    error.value = undefined
  }

  return {
    error,
    errorList,
    setErrorList,
    setError,
    resetError
  }
})