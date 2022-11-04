export class IProgram {
  Id: number
  Name: string
  IsActive: boolean
  Image: string

  constructor(id: number, name: string, isActive: boolean, image: string) {
    this.Id = id
    this.Name = name
    this.IsActive = isActive
    this.Image = image
  }
}