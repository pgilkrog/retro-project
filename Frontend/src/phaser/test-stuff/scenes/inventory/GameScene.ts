import Phaser, { Scene } from 'phaser'
import ContextMenu from './ItemMenu'
import InventoryManger from './InventoryManager'

export default class Game extends Scene {
  private inventoryManger
  private inventoryManger2

  constructor() {
    super({ key: 'GameScene' })
    this.inventoryManger = new InventoryManger(this, 100, 100,5, 8)
    this.inventoryManger2 = new InventoryManger(this, 100, 700, 4 , 8)
  }

  create() {
    this.inventoryManger.create()
    this.inventoryManger2.create()
  }
}
