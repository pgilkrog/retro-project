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

export interface IInstalledProgramDB {
  _id: string
  programId: string
  userId: string
  gridPosition: number
}

export interface IInstalledProgram {
  _id: string
  program: IProgram | undefined
  userId: string
  gridPosition: number
}