import type Phaser from 'phaser'
import type InventoryManager from './InventoryManager'
import type {inventoryTypes} from './models/Enums'
import type { InventoryItem } from './models/InventoryItem'
import { sharedInstance as events } from '../../utils/EventCenter'

export default class ContextMenu {
  private scene
  private menuGroup
  private game: InventoryManager
  private height: number = 100
  private width: number = 75
  private buttonSpace: number = 30
  private inventoryType: inventoryTypes

  private readonly WHITE = '#FFFFFF'

  constructor(manager: InventoryManager, scene: Phaser.Scene, inventoryType: inventoryTypes) {
    this.scene = scene;
    this.menuGroup = scene.add.group()
    this.game = manager
    this.inventoryType = inventoryType
  }

  showMenu(x: number, y: number, item: InventoryItem) {
    this.menuGroup.clear(true, true)

    // Position the menu next to the right-clicked item
    this.menuGroup.setX(x)
    this.menuGroup.setY(y)

    this.createMenuBackground(x, y)
  
    // Create buttons in the context menu
    const infoButton = this.scene.add.text(x + 5, y + 5, 'Info', { color: this.WHITE })
    this.inventoryType === 'Player' ? this.createDropButton(item, x, infoButton) : this.createTakeButton(item, x, infoButton)
    const closeButton = this.scene.add.text(x + 5, 40 + y + this.buttonSpace, 'Close', { color: this.WHITE })
  
    // Set interactive behavior for buttons
    infoButton.setInteractive()
    closeButton.setInteractive()
  
    /** BUTTON ACTIONS **/
    infoButton.on('pointerdown', () => {
      console.log('Info button clicked', item)
    })

    closeButton.on('pointerdown', () => {
      console.log('Close button clicked')
      this.menuGroup.setVisible(false)
    })
  
    // Add buttons to the menu group
    this.menuGroup.add(infoButton)
    this.menuGroup.add(closeButton)

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

  createTakeButton(item: InventoryItem, x: number, button: any) {
    const takeButton = this.scene.add.text(x + 5, button.y + this.buttonSpace, 'Take', { color: this.WHITE })    
    takeButton.setInteractive()
    takeButton.on('pointerdown', () => {
      console.log('take button clicked')
      events.emit('transforItem', item)
      this.menuGroup.setVisible(false)
    })
    this.menuGroup.add(takeButton)
  }

  createDropButton(item: InventoryItem, x: number, button: any) {
    const dropButton = this.scene.add.text(x + 5, button.y + this.buttonSpace, 'Drop', { color: this.WHITE })
    dropButton.setInteractive()
    dropButton.on('pointerdown', () => {
      console.log('Delete button clicked')
      this.game.removeItemFromInventory(item)
      this.menuGroup.setVisible(false)
    })
    this.menuGroup.add(dropButton)
  }

}