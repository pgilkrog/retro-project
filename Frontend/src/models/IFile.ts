export class IFile{
  Name: string
  Url: string
  Size: number
  Type: string

  constructor(name: string, url: string, size: number, type: string) {
    this.Name = name
    this.Url = url
    this.Size = size
    this.Type = type
  }
}
  