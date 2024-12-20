import type { IErrorItem } from '@/models/IErrorItem'
import { defineStore } from 'pinia'
import { userStore } from './userStore'
import { get, post } from '@/helpers/httpHelper'

const url = import.meta.env.VITE_BASE_URL + '/error'

export const useErrorStore = defineStore('errorStore', () => {
  const error = ref<IErrorItem>()
  const errorList = ref<IErrorItem[]>([])
  const errors = ref<IErrorItem[]>()

  const userstore = userStore()

  const getErrors = async () => {
    const response = await get<{ data: { errors: IErrorItem[] } }>(url)
    errors.value = response.data.errors
  }

  const setErrorList = () => {
    errorList.value.push()
  }

  const setError = (text: string) => {
    error.value = {
      icon: 'bi bi-bug-fill',
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
    error,
    errorList,
    errors,
    getErrors,
    setErrorList,
    setError,
    resetError,
    createError,
  }
})
