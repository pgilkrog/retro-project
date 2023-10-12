import Phaser, { Scene } from 'phaser'
import ContextMenu from './ItemMenu'
import InventoryManger from './InventoryManager'
import {ItemsManager} from './ItemManager'
import type { InventoryItem } from './models/InventoryItem'
import {inventoryTypes} from './models/Enums'
import { sharedInstance as events } from '../../utils/EventCenter'

export default class Game extends Scene {
  private itemManager
  private playerInventory
  private inventoryManger2

  constructor() {
    super({ key: 'GameScene' })
    this.itemManager = new ItemsManager(this)
    this.playerInventory = new InventoryManger(inventoryTypes.Player, this, 100, 100, 5, 8)
    this.inventoryManger2 = new InventoryManger(inventoryTypes.NPC, this, 100, 700, 4, 8)
  }

  create() {
    this.itemManager.initItems()
    this.playerInventory.create()
    this.inventoryManger2.create()

    this.createItems(this.playerInventory)
    this.createItems(this.inventoryManger2)

    events.on('transforItem', this.transforItem, this)
  }

  createItems(inventory: InventoryManger) {
    inventory.checkItemInInventory(this.itemManager.create1by1())
    inventory.checkItemInInventory(this.itemManager.create1by1())
    inventory.checkItemInInventory(this.itemManager.create1by2())
    inventory.checkItemInInventory(this.itemManager.create2by2())
    inventory.checkItemInInventory(this.itemManager.create4by2())
    inventory.checkItemInInventory(this.itemManager.create1by1())
  }

  transforItem(item: InventoryItem) {
    // Add the item to the new inventory
    this.playerInventory.checkItemInInventory(this.getItem(item.item.name)!)
    // first remove the item from its original inventory, 
    this.inventoryManger2.removeItemFromInventory(item)
  }

  getItem(name: string) {
    switch(name) {
      case '1 by 1':  {
        return this.itemManager.create1by1()        
      }
      case '1 by 2': {
        return this.itemManager.create1by2()
      }
      case '2 by 2': {
        return this.itemManager.create2by2()
      }
      case '4 by 2': {
        return this.itemManager.create4by2()
      }
    }


  }
}
