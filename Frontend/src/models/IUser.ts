import type { IFile, IUserSettings } from "./index"

export interface IUser {
  _id: string
  firstName: string
  lastName: string
  email: string
  type: string
  files: IFile[]
  installedPrograms: string[]
  settings: IUserSettings
  isOnline: boolean
}