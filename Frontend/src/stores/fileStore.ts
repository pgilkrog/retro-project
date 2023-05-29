import { defineStore } from "pinia"
import axios from 'axios'
import { errorStore } from "./errorStore"

const url = 'http://localhost:4000/api/file'
const errorstore = errorStore()

export const fileStore = defineStore('file', () => {
  const uploadFile = (formData: any) => {
    try {
      const response = axios.post('/', formData)
      console.log(response)
    } catch {
      errorstore.createError('Error accured while uploading file')
    }
  }

  return {
    uploadFile
  }
})