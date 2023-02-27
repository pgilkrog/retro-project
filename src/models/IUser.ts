import type { IFile } from "./IFile"

export class IUser {
  Id: string
  UserId: string
  Name: string
  Email: string
  Files: IFile[]
  BackgroundColor: string
  UseBackgroundImage: string

  constructor(id: string, userId: string, name: string, email: string, files: IFile[], backgroundColor: string, useBackgroundImage: string) {
    this.Id = id
    this.UserId = userId
    this.Name = name
    this.Email = email
    this.Files = files
    this.BackgroundColor = backgroundColor
    this.UseBackgroundImage = useBackgroundImage
  }
}