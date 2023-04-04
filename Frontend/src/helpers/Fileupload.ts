import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import type { IUser, IFile } from '@/models/index'
import { storage } from '../firebase'
import DBHelper from './DBHelper'
import { userStore } from '../stores/userStore'
import { authStore } from '@/stores/authStore'

export const onFileSelected = async (e: any) => {
  const userstore = userStore()
  const authstore = authStore()
  const userData = userstore.getUserData
  const file = e.target.files[0]

  if (file === undefined)
    return

  const storageRef = ref(storage, `${userData.Email}/${file.name}`)
  const uploadTask = uploadBytesResumable(storageRef, file)

  let progress = 0

  uploadTask.on("state_changed",
    (snapshot) => {
      progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
    },
    (error) => {
      alert(error)
    },
    async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
      saveNewBackgroundURL(file.name, downloadURL, file.size, "BackgroundImage", userData)
    }
  )

  return progress
}

const saveNewBackgroundURL = async (
  name: string,
  url: string,
  size: number,
  type: string,
  userData: IUser
) => {
  const user = await DBHelper.getOneByUserId('users', authStore().getUser.uid)
  user.Files.push({
    Name: name,
    Url: url,
    Size: size,
    Type: type
  } as IFile)
  await DBHelper.update('users', user)
}