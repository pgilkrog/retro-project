export class IProgram {
  name: string
  isActive: boolean
  img: string

  constructor(name: string, isActive: boolean, img: string) {
    this.name = name
    this.isActive = isActive
    this.img = img
  }
}