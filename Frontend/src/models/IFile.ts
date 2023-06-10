export class IFile{
  _id: string
  name: string
  originalName: string
  url: string
  size: number
  type: string
  userId: string
  createdAt: Date

  constructor(_id: string, name: string, originalName: string, url: string, size: number, type: string, userId: string, createdAt: Date) {
    this._id = _id
    this.name = name
    this.originalName = originalName
    this.url = url
    this.size = size
    this.type = type
    this.userId = userId
    this.createdAt = createdAt
  }
}
  