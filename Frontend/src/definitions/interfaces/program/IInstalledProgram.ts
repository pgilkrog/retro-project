import type { IProgram } from './IProgram'

export interface IInstalledProgram {
  _id: string
  program: IProgram | undefined
  userId: string
  gridPosition: number
}
