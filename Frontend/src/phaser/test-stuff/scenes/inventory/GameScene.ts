import Phaser, { Scene } from 'phaser'
import ContextMenu from './ItemMenu'
import InventoryManger from './InventoryManager'
import {ItemsManager} from './ItemManager'

export default class Game extends Scene {
  private itemManager
  private inventoryManger
  private inventoryManger2

  constructor() {
    super({ key: 'GameScene' })
    this.itemManager = new ItemsManager(this)
    this.inventoryManger = new InventoryManger(this, 100, 100,5, 8)
    this.inventoryManger2 = new InventoryManger(this, 100, 700, 4 , 8)
  }

  create() {
    this.itemManager.initItems()
    this.inventoryManger.create()
    this.inventoryManger2.create()

    this.createItems(this.inventoryManger)
    this.createItems(this.inventoryManger2)
  }

  createItems(inventory: InventoryManger) {
    inventory.addItemToInventory(this.itemManager.create1by1())
    inventory.addItemToInventory(this.itemManager.create1by1())
    inventory.addItemToInventory(this.itemManager.create1by2())
    inventory.addItemToInventory(this.itemManager.create2by2())
    inventory.addItemToInventory(this.itemManager.create4by2())
  }
}
