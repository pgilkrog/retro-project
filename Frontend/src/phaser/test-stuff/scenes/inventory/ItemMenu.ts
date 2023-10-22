import type Phaser from 'phaser'
import type InventoryManager from './InventoryManager'
import type {inventoryTypes} from './models/Enums'
import type { InventoryItem } from './models/InventoryItem'
import { sharedInstance as events } from '../../utils/EventCenter'
import AmountMenu from './AmountMenu'

interface ICords {
  x: number,
  y: number
}

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
  private x: number = 0
  private y: number = 0

  private readonly WHITE = '#FFFFFF'

  constructor(manager: InventoryManager, scene: Phaser.Scene, inventoryType: inventoryTypes) {
    this.scene = scene
    this.menuGroup = scene.add.group()
    this.game = manager
    this.inventoryType = inventoryType
    this.amountMenu = new AmountMenu(scene)
  }

  showMenu(cords: ICords,  item: InventoryItem) {
    this.menuGroup.clear(true, true)
    this.x = cords.x
    this.y = cords.y

    // Position the menu next to the right-clicked item
    this.menuGroup.setXY(this.x, this.y)

    this.createMenuBackground()
  
    // Create buttons in the context menu
    this.createInfoButton(item)
    this.inventoryType === 'Player' ? this.createDropButton(item) : this.createTakeButton(item)
    this.createCloseButton(item)

    // Show the menu
    this.menuGroup.setDepth(1) // Adjust depth to appear on top
    this.menuGroup.setVisible(true)
  }

  createMenuBackground() {
    // Create a background for the menu
    const menuBackground = this.scene.add.graphics();
    menuBackground.fillStyle(0x000000, 0.9) // Background color with transparency
    menuBackground.fillRect(this.x, this.y, this.width, this.height) // Adjust width and height
    menuBackground.lineStyle(1, 0xffffff, 1) // Border
    menuBackground.strokeRect(this.x, this.y, this.width, this.height) // Adjust width and height
    // Add the menu graphics to the menuGroup
    this.menuGroup.add(menuBackground)
  }

  createInfoButton(item: InventoryItem) {
    const infoButton = this.createButtonBasics('Info', this.y-20)  
    infoButton.on('pointerdown', () => {
      console.log('Info button clicked', item)
    })
  }

  createTakeButton(item: InventoryItem) {
    const takeButton = this.createButtonBasics('Take', this.buttonY)
    takeButton.on('pointerdown', () => {
      this.amountMenu.showMenu(this.x, this.y, item)
      this.amountMenu.createTakeButton(this.x, this.y, (amount: number) => {
        events.emit('transforItem', { inventoryItem: item, amount: amount })
        this.amountMenu.setVisible(false)
      })
      this.menuGroup.setVisible(false)
    })
  }

  createDropButton(item: InventoryItem) {
    const dropButton = this.createButtonBasics('Drop', this.buttonY)
    dropButton.on('pointerdown', () => {
      this.amountMenu.showMenu(this.x, this.y, item)
      this.amountMenu.createTakeButton(this.x, this.y, (amount: number) => {
        this.game.removeItemFromInventory({ inventoryItem: item, amount: amount })
        this.amountMenu.setVisible(false)
      })
      this.menuGroup.setVisible(false)
    })
  }

  createCloseButton(item: InventoryItem) {
    const closeButton = this.createButtonBasics('Close', this.buttonY)
    closeButton.on('pointerdown', () => {
      console.log('Close button clicked')
      this.menuGroup.setVisible(false)
    })
  }

  createButtonBasics(name: string, y: number) {
    const button = this.scene.add.text(this.x + 5, y + this.buttonSpace, name, { color: this.WHITE }) 
    button.setInteractive()
    this.menuGroup.add(button)
    this.buttonY = button.y
    return button
  }
}