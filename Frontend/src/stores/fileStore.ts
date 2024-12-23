import { defineStore } from 'pinia'
import axios from 'axios'
import { useErrorStore } from './errorStore'
import type { IFile, IPainting } from '@/models'
import { userStore } from './userStore'
import { ref } from 'vue'

const url = import.meta.env.VITE_BASE_URL + '/files'

export const fileStore = defineStore('filestore', () => {
  const userstore = userStore()
  const allFiles = ref<IFile[]>([])
  const errorstore = useErrorStore()

  const uploadFile = async (formData: any) => {
    try {
      const response = await axios.post(url + '/upload', formData)
      console.log(formData, response)
      const { filename, originalname, size, fieldname, path } = response.data.file
      const fileToStore: IFile = {
        _id: '',
        name: filename,
        originalName: originalname,
        size: size,
        type: fieldname,
        url: path,
        userId: userstore.userData?._id ?? '',
        createdAt: new Date(),
      }
      await axios.post(url, null, { params: fileToStore }).then(() => {
        getAllFiles()
      })
    } catch (error) {
      console.log(error)
      errorstore.createError('Error accured while uploading file')
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
    getAllFiles,
  }
})
