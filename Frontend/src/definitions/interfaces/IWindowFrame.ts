import type { IProgram } from '@/models'

export interface IWindowFrame {
  program: IProgram
  showMenu?: boolean
  disableButtons?: boolean
  variant?: string
  isNotProgram?: boolean
  isMoveable?: boolean
  isStatic?: boolean
}
