import Phaser from 'phaser'
import type { InventoryManager } from './InventoryManager';
import type { InventoryItem } from './InventoryItem';

export class InventoryUI extends Phaser.GameObjects.Container {
  private inventory: InventoryManager
  private itemElements: Map<InventoryItem, Phaser.GameObjects.Container>
  private invInd = [
    {x: -174, y: -125},
    {x: -124, y: -125},
    {x: -74, y: -125},
    {x: -24, y: -125},
    {x: 26, y: -125},
    {x: 76, y: -125},
    {x: 126, y: -125},
    {x: 176, y: -125},
    
    //Line two
    {x: -174, y: -85},
    {x: -124, y: -85},
    {x: -74, y: -85},
    {x: -24, y: -85},
    {x: 26, y: -85},
    {x: -26, y: -85},
    {x: 126, y: -85},
    {x: 176, y: -85},

    //Line three
    {x: -174, y: -45},
    {x: -124, y: -45},
    {x: -74, y: -45},
    {x: -24, y: -45},
    {x: 26, y: -45},
    {x: -26, y: -45},
    {x: 126, y: -45},
    {x: 176, y: -45},
    
    //Line four
    {x: -174, y: -5},
    {x: -124, y: -5},
    {x: -74, y: -5},
    {x: -24, y: -5},
    {x: 26, y: -5},
    {x: -26, y: -5},
    {x: 126, y: -5},
    {x: 176, y: -5},
    
    //Line Five
    {x: -174, y: 35},
    {x: -124, y: 35},
    {x: -74, y: 35},
    {x: -24, y: 35},
    {x: 26, y: 35},
    {x: -26, y: 35},
    {x: 126, y: 35},
    {x: 176, y: 35},

    //Line Six
    {x: -174, y: 75},
    {x: -124, y: 75},
    {x: -74, y: 75},
    {x: -24, y: 75},
    {x: 26, y: 75},
    {x: -26, y: 75},
    {x: 126, y: 75},
    {x: 176, y: 75},

    //Line Seven
    {x: -174, y: 115},
    {x: -124, y: 115},
    {x: -74, y: 115},
    {x: -24, y: 115},
    {x: 26, y: 115},
    {x: -26, y: 115},
    {x: 126, y: 115},
    {x: 176, y: 115},
  ]

  constructor(
    scene: Phaser.Scene, 
    x: number, 
    y: number, 
    inventory: InventoryManager, 
    isPlayer: boolean
  ) {
    super(scene, x, y)

    this.inventory = inventory
    this.itemElements = new Map()

    const panel = isPlayer ? this.createUserBackground(scene) : this.createNPCBackground(scene)
    panel.setScale(0.5)
    this.add(panel)

    const back = new Phaser.GameObjects.Rectangle(
      scene, 
      0, 
      0, 
      400, 
      300, 
      0x000000,
      0.5
    )
    this.add(back)

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
      this.invInd[index].x, 
      this.invInd[index].y
    )

    const image = new Phaser.GameObjects.Image(
      this.scene,
      0, 
      0,
      item.item.image
    )
    image.setScale(0.5)
    itemElement.add(image)

    // Create a text label for the item name and quantity
    // const nameLabel = new Phaser.GameObjects.Text(
    //   this.scene, 
    //   1, 
    //   1, 
    //   item.item.name, 
    //   { fontSize: '16' }
    // )
    if(item.quantity > 1) {
      const quantityLabel = new Phaser.GameObjects.Text(
        this.scene, 
        5, 
        5, 
        `x${item.quantity}`, 
        { fontSize: '16' }
      )      
      itemElement.add(quantityLabel)
    }
    // itemElement.add(nameLabel)


    // Add item-specific UI elements based on the item's type
    // if (item.item instanceof FoodItem) {
    //   const caloriesLabel = new Phaser.GameObjects.Text(
    //     this.scene, 
    //     10, 
    //     20, 
    //     `${(item.item as FoodItem).healing} calories`, 
    //     { fontSize: '12' }
    //   )
    //   itemElement.add(caloriesLabel)
    // } else if (item.item instanceof WeaponItem) {
    //   const damageLabel = new Phaser.GameObjects.Text(
    //     this.scene, 
    //     10, 
    //     20, 
    //     `${(item.item as WeaponItem).damage} damage`, 
    //     { fontSize: '12' }
    //   )
    //   itemElement.add(damageLabel) 
    // }

    return itemElement
  }

  public updateInventoryUI() {
    this.inventory.getAllItems().forEach((item) => {
      const itemElement = this.itemElements.get(item)

      // Update the quantity label for the item
      const quantityLabel = itemElement?.getAt(1) as Phaser.GameObjects.Text
      quantityLabel.setText(`x${item.quantity}`)
    })
  }

  private createUserBackground(scene: Phaser.Scene) {
    return new Phaser.GameObjects.Image(
      scene,
      0, 
      0,
      'inventoryUI'
    )
  }

  private createNPCBackground(scene: Phaser.Scene) {
    return new Phaser.GameObjects.Rectangle(
      scene, 
      0, 
      0, 
      200, 
      300, 
      0x000000
    )
  }
}