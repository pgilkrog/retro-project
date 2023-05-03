import Phaser from 'phaser'
import type { IConfig } from '../../interfaces/IConfig'

export default class InventoryUI extends Phaser.Scene {
  private config: IConfig

  constructor(config: IConfig) {
    super({ key: 'InventoryUIScene' })
    this.config = config
  }

  create() {
    
  }
}