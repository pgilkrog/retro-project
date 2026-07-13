import type { IProgram } from '@/models'

export interface IWindowFrame {
  showMenu?: boolean
  disableButtons?: boolean
  program: IProgram
  variant?: string
  isNotProgram?: boolean
  isMoveable?: boolean
  isStatic?: boolean
}
