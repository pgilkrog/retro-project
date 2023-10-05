import Phaser, { Scene } from 'phaser'
import ContextMenu from './ItemMenu'
import InventoryManger from './InventoryManager'

export default class Game extends Scene {
  private inventoryManger

  constructor() {
    super({ key: 'GameScene' })
    this.inventoryManger = new InventoryManger(this)
  }

  create() {
    this.inventoryManger.create()
  }
}
