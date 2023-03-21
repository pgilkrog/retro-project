export class IProgram {
  Id: string
  Name: string
  IsActive: boolean
  Image: string

  constructor(_id: string, name: string, isActive: boolean, image: string) {
    this.Id = _id
    this.Name = name
    this.IsActive = isActive
    this.Image = image
  }
}