export interface IProgram {
  _id: string
  name: string
  isActive: boolean
  image: string
  color: string
  displayName: string
  sortOrder: number
  type: string
}

export interface IProgramWindow {
  showMenu: boolean
  disableButtons: boolean
  variant: string
  isNotProgram: boolean
  isMoveable: boolean
}