import { defineStore } from "pinia"
import axios from 'axios'
import { errorStore } from "./errorStore"
import type { IFile } from "@/models"
import { userStore } from './userStore'
import { ref } from 'vue'

const url = 'http://localhost:4000/api/files'

// const errorstore = errorStore()

export const fileStore = defineStore('filestore', () => {
  const userstore = userStore()
  const allFiles = ref<IFile[]>([])
  
  const uploadFile = async (formData: any) => {
    try {
      const response = await axios.post(url + '/upload', formData)
      console.log(response)
      const { filename, size, fieldname, path } = response.data.file
      const fileToStore = {
        _id: '',
        name: filename, 
        size: size,
        type: fieldname,
        url: path,
        userId: userstore.userData?._id,
        createdAt: new Date
      } as IFile
      await axios.post(url, null, { params: fileToStore })
    } catch {
      // errorstore.createError('Error accured while uploading file')
    }
  }

  const getAllFiles = async () => {
    try {
      const response = await axios.get(url)
      allFiles.value = response.data.files
      console.log(response)
    } catch (error: any) {
      console.warn(error)
    }
  }

  return {
    allFiles,
    uploadFile,
    getAllFiles
  }
})