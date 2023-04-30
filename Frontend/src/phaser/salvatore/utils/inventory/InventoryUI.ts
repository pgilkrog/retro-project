import Phaser from 'phaser'
import type { InventoryManager } from './InventoryManager';
import { FoodItem, WeaponItem, type Item } from '../items';
import type { InventoryItem } from './InventoryItem';

export class InventoryUI extends Phaser.GameObjects.Container {
  private inventory: InventoryManager
  private itemElements: Map<InventoryItem, Phaser.GameObjects.Container>

  constructor(scene: Phaser.Scene, x: number, y: number, inventory: InventoryManager) {
    super(scene, x, y)

    this.inventory = inventory
    this.itemElements = new Map()

    const panel = new Phaser.GameObjects.Rectangle(
      scene, 
      0, 
      0, 
      200, 
      300, 
      0x000000
    )
    this.add(panel)

    this.inventory.getAllItems().forEach((item, index) => {
      const itemElement = this.createItemElement(item, index)
      this.itemElements.set(item, itemElement)
      this.add(itemElement)
    })
    this.setDepth(3001)
  }

  private createItemElement(item: InventoryItem, index: number) {
    const itemElement = new Phaser.GameObjects.Container(
      this.scene, 
      0, 
      index * 40
    )

    const background = new Phaser.GameObjects.Rectangle(
      this.scene, 
      0, 
      0, 
      180, 
      30, 
      0x333333
    ) 
    itemElement.add(background)

    // Create a text label for the item name and quantity
    const nameLabel = new Phaser.GameObjects.Text(
      this.scene, 
      1, 
      1, 
      item.item.name, 
      { fontSize: '16' }
    )
    const quantityLabel = new Phaser.GameObjects.Text(
      this.scene, 
      150, 
      5, 
      `x${item.quantity}`, 
      { fontSize: '16' }
    )
    itemElement.add(nameLabel)
    itemElement.add(quantityLabel)

    // Add item-specific UI elements based on the item's type
    if (item.item instanceof FoodItem) {
      const caloriesLabel = new Phaser.GameObjects.Text(
        this.scene, 
        10, 
        20, 
        `${(item.item as FoodItem).healing} calories`, 
        { fontSize: '12' }
      )
      itemElement.add(caloriesLabel)
    } else if (item.item instanceof WeaponItem) {
  
      const damageLabel = new Phaser.GameObjects.Text(
        this.scene, 
        10, 
        20, 
        `${(item.item as WeaponItem).damage} damage`, 
        { fontSize: '12' }
      )
      itemElement.add(damageLabel)
    }

    return itemElement
  }

  private updateInventoryUI() {
    this.inventory.getAllItems().forEach((item) => {
      const itemElement = this.itemElements.get(item)

      // Update the quantity label for the item
      const quantityLabel = itemElement?.getAt(1) as Phaser.GameObjects.Text
      quantityLabel.setText(`x${item.quantity}`)
    })
  }
}