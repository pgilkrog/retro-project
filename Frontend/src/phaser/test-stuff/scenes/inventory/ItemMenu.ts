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
  private height: number = 34
  private width: number = 75
  private buttonSpace: number = 30
  private inventoryType: inventoryTypes
  private buttonY: number = 0
  private amountMenu
  private x: number = 0
  private y: number = 0
  private buttonsAmount: number = 0

  private readonly WHITE = '#FFFFFF'

  constructor(manager: InventoryManager, scene: Phaser.Scene, inventoryType: inventoryTypes) {
    this.scene = scene
    this.menuGroup = scene.add.group()
    this.game = manager
    this.inventoryType = inventoryType
    this.amountMenu = new AmountMenu(scene)
  }

  showMenu(cords: ICords,  item: InventoryItem) {
    this.buttonsAmount = 0
    this.menuGroup.clear(true, true)
    this.x = cords.x
    this.y = cords.y
    this.buttonY = cords.y - 17

    // Position the menu next to the right-clicked item
    this.menuGroup.setXY(this.x, this.y)

    this.createActionButton('Info', item, false, (amount: number) => {
      console.log('Info button clicked', item)
    })
    
    if (this.inventoryType === 'Player')  {
        this.createActionButton('Drop', item, true, (amount: number) => {
          this.game.removeItemFromInventory({ inventoryItem: item, amount })
          this.amountMenu.setVisible(false)
        })

        if (item.item.isEquippable)
          this.createActionButton('Equip', item, false, (amount: number) => {
            this.game.equibItem(item)
          })
        
        if (item.item.isUseable) 
          this.createActionButton('Use', item, true, (amount: number) => {
          })
    }
    else 
      this.createActionButton('Take', item, true, (amount: number) => {
        events.emit('transforItem', { inventoryItem: item, amount })
        this.amountMenu.setVisible(false)
      })
    
    if (item.amount > 1)
      this.createActionButton('Split', item, true, (amount: number) => {
        this.game.splitInventoryItem({ item, amountToSplit: amount })
        this.amountMenu.setVisible(false)
      });
  
    this.createActionButton('Close', item, false, (amount: number) => {})

    // Show the menu
    this.menuGroup.setDepth(1) // Adjust depth to appear on top
    this.menuGroup.setVisible(true)
    this.createMenuBackground()
  }

  private createActionButton(name: string, item: InventoryItem, withAmount: boolean, callback: (amount: number) => void) {
    this.buttonsAmount += 1
    const button = this.createContextMenuButton(name)
    button.on('pointerdown', () => {
      if (withAmount) {
        this.amountMenu.showMenu(this.x, this.y, item)
        this.amountMenu.createTakeButton(this.x, this.y, callback)        
      }
      this.menuGroup.setVisible(false)
    })
  }

  private createContextMenuButton(name: string) {
    const button = this.scene.add.text(this.x + 5, this.buttonY + this.buttonSpace, name, { color: this.WHITE });
    button.setInteractive();
    this.menuGroup.add(button);
    this.buttonY = button.y;
    return button;
  }

  createMenuBackground() {
    // Create a background for the menu
    const menuBackground = this.scene.add.graphics();
    menuBackground.fillStyle(0x000000, 0.9) // Background color with transparency
    menuBackground.fillRect(this.x, this.y, this.width, this.height * this.buttonsAmount) // Adjust width and height
    menuBackground.lineStyle(1, 0xffffff, 1) // Border
    menuBackground.strokeRect(this.x, this.y, this.width, this.height * this.buttonsAmount) // Adjust width and height
    // Add the menu graphics to the menuGroup
    this.menuGroup.add(menuBackground)
  }
}