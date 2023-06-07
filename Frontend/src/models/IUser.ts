import type { IFile, IUserSettings } from "./index"

export class IUser {
  _id: string
  firstName: string
  lastName: string
  email: string
  type: string
  files: IFile[]
  installedPrograms: string[]
  settings: IUserSettings

  constructor(
    id: string, 
    firstName: string, 
    lastName: string, 
    email: string, 
    type: string, 
    files: IFile[], 
    installedPrograms: string[], 
    settings: IUserSettings 
  ) {
    this._id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.type = type
    this.files = files
    this.installedPrograms = installedPrograms
    this.settings = settings
  }
}