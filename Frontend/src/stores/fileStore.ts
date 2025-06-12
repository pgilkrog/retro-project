import { defineStore } from 'pinia'
import type { IFile } from '@/models'
import { userStore } from './userStore'
import { post, get } from '@/helpers/httpHelper'

const url = '/files'

export const fileStore = defineStore('filestore', () => {
  const userstore = userStore()
  const allFiles = ref<IFile[]>([])
  const userFiles = ref<IFile[]>([])

  const uploadFile = async (formData: FormData) => {
    const response = await post<{
      data: {
        file: {
          filename: string
          originalname: string
          size: number
          fieldname: string
          path: string
        }
      }
    }>(url + '/upload', formData)

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

    await post(url, fileToStore)
    await getAllFiles()
  }

  const getAllFiles = async () => {
    const response = await get<{ files: IFile[] }>(url)
    allFiles.value = response.files
  }

  const getFilesByUserId = async (userId: string | undefined) => {
    if (userId != undefined) {
      const response = await get<{ files: IFile[] }>(`${url}/${userId}`)
      userFiles.value = response.files
    }
  }

  return {
    allFiles,
    userFiles,
    uploadFile,
    getAllFiles,
    getFilesByUserId,
  }
})
