import type { IErrorItem } from "@/models/IErrorItem"
import { defineStore } from "pinia"
import { ref, toRaw } from 'vue'
import axios from 'axios'
import { userStore } from "./userStore"

const url = import.meta.env.VITE_BASE_URL + '/error'

export const errorStore = defineStore("errors", () => {
  const error = ref<IErrorItem>()
  const errorList = ref<IErrorItem[]>([])
  const userstore = userStore()
  const errors = ref<IErrorItem[]>()

  const getErrors = async () => {
    const response = await axios.get(url).then((data) => {
      errors.value = data.data.errors
    })
    console.log(response)
  }

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
    createError(text)
  }

  const resetError = () => {
    error.value = undefined
  }

  const createError = (text: string) => {
    const response = axios.post(url, null, { 
      params: { 
        text: text, 
        date: Date.now(), 
        userId: userstore.userData?._id || 0 
      }
    })
    console.log('createError', response)
  }

  return {
    error,
    errorList,
    errors,
    getErrors,
    setErrorList,
    setError,
    resetError,
    createError
  }
})