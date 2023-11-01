import type Phaser from 'phaser'
import type { InventoryItem } from './models/InventoryItem'

export default class AmountMenu {
  private scene
  private menuGroup
  private height: number = 100
  private width: number = 100
  private amount: number = 1
  private amountText: any
  private readonly WHITE = '#FFFFFF'

  constructor(scene: Phaser.Scene) {
    this.scene = scene
    this.menuGroup = scene.add.group()
  }

  showMenu(x: number, y: number, item: InventoryItem) {
    this.menuGroup.clear(true, true)
    this.menuGroup.setXY(x, y)
    this.amount = 1

    this.createMenuBackground(x, y)
    this.createPlusButton(x, y, item)
    this.createMinusButton(x, y)
    // this.createTakeButton(x, y)

    this.amountText = this.scene.add.text(x + 10, y + 10, this.amount.toString()) 
    .setFont('32px Arial')
    .setStroke('#FFFFFF', 2)
    .setColor('#00FF00')

    this.menuGroup.add(this.amountText)
  }

  createMenuBackground(x: number, y: number) {
    // Create a background for the menu
    const menuBackground = this.scene.add.graphics()
    menuBackground.fillStyle(0x000000, 0.9) // Background color with transparency
    menuBackground.fillRect(x, y, this.width, this.height) // Adjust width and height
    menuBackground.lineStyle(1, 0xffffff, 1) // Border
    menuBackground.strokeRect(x, y, this.width, this.height) // Adjust width and height
    // Add the menu graphics to the menuGroup
    this.menuGroup.add(menuBackground)
  }

  createPlusButton(x: number, y: number, item: InventoryItem) {
    const plusButton = this.createButtonBasics('+', x + 60, y + 10)
    plusButton.on('pointerdown', () => {
      console.log('Info button clicked')
      if(this.amount + 1 < item.amount) {
        this.amount += 1
        this.reRenderText()        
      }
    })
  }
  
  createMinusButton(x: number, y: number) {
    const minusButton = this.createButtonBasics('-', x + 60, y + 40)
    minusButton.on('pointerdown', () => {
      console.log('Info button clicked')
      if(this.amount >= 1) {
        this.amount -= 1
        this.reRenderText()        
      }
    })
  }

  createTakeButton(x: number, y: number, onTake: (amount: number) => void) {
    const takeButton = this.createButtonBasics('Take', x + 10, y + 70)
    takeButton.on('pointerdown', () => {
      onTake(this.amount)
    })
  }

  createButtonBasics(name: string, x: number, y: number) {
    const button = this.scene.add.text(x + 5, y, name, { color: this.WHITE }) 
    button.setInteractive()
    this.menuGroup.add(button)
    return button
  }

  setVisible(bool: boolean) {
    this.menuGroup.setVisible(bool)
  }

  reRenderText() {
    this.amountText.setText(this.amount.toString())
  }
}