import type Phaser from 'phaser'
import type InventoryManager from './InventoryManager'

export default class ContextMenu {
  private scene
  private menuGroup
  private game: InventoryManager
  private height: number = 100
  private width: number = 75
  private buttonSpace: number = 30

  constructor(manager: InventoryManager, scene: Phaser.Scene) {
    this.scene = scene;
    this.menuGroup = scene.add.group()
    this.game = manager
  }

  showMenu(x: number, y: number, item: any) {
    this.menuGroup.clear(true, true)

    // Position the menu next to the right-clicked item
    this.menuGroup.setX(x)
    this.menuGroup.setY(y)

    // Create a background for the menu
    const menuBackground = this.scene.add.graphics();
    menuBackground.fillStyle(0x000000, 0.9) // Background color with transparency
    menuBackground.fillRect(x, y, this.width, this.height) // Adjust width and height
    menuBackground.lineStyle(1, 0xffffff, 1) // Border
    menuBackground.strokeRect(x, y, this.width, this.height) // Adjust width and height
    // Add the menu graphics to the menuGroup
    this.menuGroup.add(menuBackground)
  
    // Create buttons in the context menu
    const infoButton = this.scene.add.text(x + 5, y + 5, 'Info', { color: '#ffffff' })
    const dropButton = this.scene.add.text(x + 5, infoButton.y + this.buttonSpace, 'Drop', { color: '#ffffff' })
    const closeButton = this.scene.add.text(x + 5, dropButton.y + this.buttonSpace, 'Close', { color: '#ffffff' })
  
    // Set interactive behavior for buttons
    infoButton.setInteractive()
    dropButton.setInteractive()
    closeButton.setInteractive()
  
    /** BUTTON ACTIONS **/
    infoButton.on('pointerdown', () => {
      console.log('Info button clicked', item)
    })
  
    dropButton.on('pointerdown', () => {
      console.log('Delete button clicked')
      this.game.removeItemFromInventory(item)
      this.menuGroup.setVisible(false)
    })

    closeButton.on('pointerdown', () => {
      console.log('Close button clicked')
      this.menuGroup.setVisible(false)
    })
  
    // Add buttons to the menu group
    this.menuGroup.add(infoButton)
    this.menuGroup.add(dropButton)
    this.menuGroup.add(closeButton)

    // Show the menu
    this.menuGroup.setDepth(1) // Adjust depth to appear on top
    this.menuGroup.setVisible(true)
  }
}