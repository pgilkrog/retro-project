export interface IProgram {
  _id: string
  name: string
  isActive: boolean
  image: string
  color: string
  displayName: string
  sortOrder: number
  type: string
  top: number
  left: number
}

export interface IProgramWindow {
  showMenu: boolean
  disableButtons: boolean
  variant: string
  isNotProgram: boolean
  isMoveable: boolean
}

export interface IInstalledProgram {
  program: IProgram
  userId: string
  gridPosition: number
}