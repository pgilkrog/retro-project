import type { IFile } from "./IFile"

export class IUser {
  Id: string
  UserId: string
  Name: string
  Email: string
  Files: IFile[]

  constructor(id: string, userId: string, name: string, email: string, files: IFile[]) {
    this.Id = id
    this.UserId = userId
    this.Name = name
    this.Email = email
    this.Files = files
  }
}