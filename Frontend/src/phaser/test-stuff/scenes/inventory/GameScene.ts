import Phaser, { Scene } from 'phaser'
import InventoryManger from './InventoryManager'
import {inventoryTypes} from './models/Enums'
import { sharedInstance as events } from '../../utils/EventCenter'

export default class Game extends Scene {
  private playerInventory= new InventoryManger(inventoryTypes.Player, this, 100, 100, 5, 10)
  private NPCInventory = new InventoryManger(inventoryTypes.NPC, this, 100, 700, 4, 8)

  constructor() {
    super({ key: 'GameScene' })
  }

  create() {
    this.playerInventory.create()
    this.NPCInventory.create()

    this.createItems(this.playerInventory)
    this.createItems(this.NPCInventory)

    events.on('transforItem', this.transforItem, this)
  }

  update(time: number, delta: number): void {
    //this.playerInventory.setPosition(10, 10)
  }

  createItems(inventory: InventoryManger) {
    inventory.checkItemInInventory("1 by 1", 60)
    inventory.checkItemInInventory("1 by 1", 1)
    inventory.checkItemInInventory("1 by 2", 1)
    inventory.checkItemInInventory("2 by 2", 4)
    inventory.checkItemInInventory("4 by 2", 2)
    inventory.checkItemInInventory("1 by 1", 1)
  }

  transforItem(props: any) {
    // Add the item to the new inventory
    const check = this.playerInventory.checkItemInInventory(props.inventoryItem.item.name!, props.amount)
    // first remove the item from its original inventory, 
    if (check?.itemCanBeMoved) {
      props.amount = check.amount
      this.NPCInventory.removeItemFromInventory(props)
    }
  }
}
