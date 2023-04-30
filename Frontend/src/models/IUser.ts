import type { IFile, IUserSettings } from "./index"

export class IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  type: string
  files: IFile[]
  installedPrograms: string[]
  settings: IUserSettings | string

  constructor(
    id: string, 
    firstName: string, 
    lastName: string, 
    email: string, 
    type: string, 
    files: IFile[], 
    installedPrograms: string[], 
    settings: IUserSettings | string
  ) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.type = type
    this.files = files
    this.installedPrograms = installedPrograms
    this.settings = settings
  }
}