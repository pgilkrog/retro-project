import type { IFile, IUserSettings } from "./index"

export class IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  type: string
  files: IFile[]
  programIds: string[]
  settings: IUserSettings

  constructor(id: string, firstName: string, lastName: string, email: string, type: string, files: IFile[], programIds: string[], settings: IUserSettings) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.type = type
    this.files = files
    this.programIds = programIds
    this.settings = settings
  }
}