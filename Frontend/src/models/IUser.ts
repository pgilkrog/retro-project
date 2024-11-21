import type { IFile } from './index'

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

export interface IUserSettings {
  _id: string
  backgroundColour: string
  backgroundImage: string
  useBackground: boolean
  displayOption: string
  theme: string
}
