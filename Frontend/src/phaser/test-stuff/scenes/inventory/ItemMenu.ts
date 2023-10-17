import type Phaser from 'phaser'
import type InventoryManager from './InventoryManager'
import type {inventoryTypes} from './models/Enums'
import type { InventoryItem } from './models/InventoryItem'
import { sharedInstance as events } from '../../utils/EventCenter'
import AmountMenu from './AmountMenu'

export default class ContextMenu {
  private scene
  private menuGroup
  private game: InventoryManager
  private height: number = 100
  private width: number = 75
  private buttonSpace: number = 30
  private inventoryType: inventoryTypes
  private buttonY: number = 0
  private amountMenu

  private readonly WHITE = '#FFFFFF'

  constructor(manager: InventoryManager, scene: Phaser.Scene, inventoryType: inventoryTypes) {
    this.scene = scene
    this.menuGroup = scene.add.group()
    this.game = manager
    this.inventoryType = inventoryType
    this.amountMenu = new AmountMenu(scene)
  }

  showMenu(x: number, y: number, item: InventoryItem) {
    this.menuGroup.clear(true, true)

    // Position the menu next to the right-clicked item
    this.menuGroup.setXY(x, y)

    this.createMenuBackground(x, y)
  
    // Create buttons in the context menu
    this.createInfoButton(item, x, y)
    this.inventoryType === 'Player' ? this.createDropButton(item, x, y) : this.createTakeButton(item, x, y)
    this.createCloseButton(item, x)

    // Show the menu
    this.menuGroup.setDepth(1) // Adjust depth to appear on top
    this.menuGroup.setVisible(true)
  }

  createMenuBackground(x: number, y: number) {
    // Create a background for the menu
    const menuBackground = this.scene.add.graphics();
    menuBackground.fillStyle(0x000000, 0.9) // Background color with transparency
    menuBackground.fillRect(x, y, this.width, this.height) // Adjust width and height
    menuBackground.lineStyle(1, 0xffffff, 1) // Border
    menuBackground.strokeRect(x, y, this.width, this.height) // Adjust width and height
    // Add the menu graphics to the menuGroup
    this.menuGroup.add(menuBackground)
  }

  createInfoButton(item: InventoryItem, x: number, y: number) {
    const infoButton = this.createButtonBasics('Info', x, y-20)  
    infoButton.on('pointerdown', () => {
      console.log('Info button clicked', item)
    })
  }

  createTakeButton(item: InventoryItem, x: number, y: number) {
    const takeButton = this.createButtonBasics('Take', x, this.buttonY)
    takeButton.on('pointerdown', () => {
      this.amountMenu.showMenu(x, y, item)
      this.amountMenu.createTakeButton(x, y, (amount: number) => {
        events.emit('transforItem', { inventoryItem: item, amount: amount })
        this.amountMenu.setVisible(false)
      })
      this.menuGroup.setVisible(false)
    })
  }

  createDropButton(item: InventoryItem, x: number, y:number) {
    const dropButton = this.createButtonBasics('Drop', x, this.buttonY)
    dropButton.on('pointerdown', () => {
      this.amountMenu.showMenu(x, y, item)
      this.amountMenu.createTakeButton(x, y, (amount: number) => {
        this.game.removeItemFromInventory({ inventoryItem: item, amount: amount })
        this.amountMenu.setVisible(false)
      })
      this.menuGroup.setVisible(false)
    })
  }

  createCloseButton(item: InventoryItem, x: number) {
    const closeButton = this.createButtonBasics('Close', x, this.buttonY)
    closeButton.on('pointerdown', () => {
      console.log('Close button clicked')
      this.menuGroup.setVisible(false)
    })
  }

  createButtonBasics(name: string, x: number, y: number) {
    const button = this.scene.add.text(x + 5, y + this.buttonSpace, name, { color: this.WHITE }) 
    button.setInteractive()
    this.menuGroup.add(button)
    this.buttonY = button.y
    return button
  }
}