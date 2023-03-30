import type { IFile, IUserSettings } from "./index"

export class IUser {
  id: string
  name: string
  email: string
  type: string
  files: IFile[]
  programIds: string[]
  settings: IUserSettings

  constructor(id: string, name: string, email: string, type: string, files: IFile[], programIds: string[], settings: IUserSettings) {
    this.id = id
    this.name = name
    this.email = email
    this.type = type
    this.files = files
    this.programIds = programIds
    this.settings = settings
  }
}