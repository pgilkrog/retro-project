export class IProgram {
  id: string
  name: string
  isActive: boolean
  image: string
  color: string
  displayName: string
  sortOrder: number

  constructor(_id: string, name: string, isActive: boolean, image: string, color: string, displayName: string, sortOrder: number) {
    this.id = _id
    this.name = name
    this.isActive = isActive
    this.image = image
    this.color = color
    this.displayName = displayName
    this.sortOrder = sortOrder
  }
}