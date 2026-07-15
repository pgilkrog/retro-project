import type { IErrorItem } from '@/models/IErrorItem'
import { defineStore } from 'pinia'
import { userStore } from './userStore'
import { get, post } from '@/helpers/httpHelper'

const url = '/error'

export const useErrorStore = defineStore('errorStore', () => {
  const error = ref<IErrorItem>()
  const errorList = ref<IErrorItem[]>([])
  const errors = ref<IErrorItem[]>()

  const userstore = userStore()

  const getErrors = async () => {
    const response = await get<{ errors: IErrorItem[] }>(url)
    errors.value = response.errors
  }

  const setErrorList = () => {
    errorList.value.push()
  }

  const setError = (text: string) => {
    error.value = {
      icon: 'fa fa-bug',
      text: text,
      show: true,
      timeStamp: new Date(),
    }

    createError(text)
  }

  const resetError = () => {
    error.value = undefined
  }

  const createError = async (text: string) => {
    await post(url, {
      params: {
        text: text,
        date: Date.now(),
        userId: userstore.userData?._id || 0,
      },
    })
  }

  return {
    // States
    error,
    errorList,
    errors,

    // Actions
    getErrors,
    setErrorList,
    setError,
    resetError,
    createError,
  }
})
