import Phaser from 'phaser'
import type { InventoryManager } from './InventoryManager';
import type { InventoryItem } from './InventoryItem';

export class InventoryUI extends Phaser.GameObjects.Container {
  private inventory: InventoryManager
  private itemElements: Map<InventoryItem, Phaser.GameObjects.Container>
  private invInd = [
    {x: -174, y: -125},
    {x: -124, y: -125},
    {x: 126, y: -125},
    {x: 176, y: -125},
    
    //Line two
    {x: -174, y: -85},
    {x: -124, y: -85},
    {x: 126, y: -85},
    {x: 176, y: -85},

    //Line three
    {x: -174, y: -45},
    {x: -124, y: -45},
    {x: 126, y: -45},
    {x: 176, y: -45},
    
    //Line four
    {x: -174, y: -5},
    {x: -124, y: -5},
    {x: 126, y: -5},
    {x: 176, y: -5},
    
    //Line Five
    {x: -174, y: 35},
    {x: -124, y: 35},
    {x: 126, y: 35},
    {x: 176, y: 35},

    //Line Six
    {x: -174, y: 75},
    {x: -124, y: 75},
    {x: 126, y: 75},
    {x: 176, y: 75},

    //Line Seven
    {x: -174, y: 115},
    {x: -124, y: 115},
    {x: 126, y: 115},
    {x: 176, y: 115},
  ]
  private entity: any

  constructor(
    scene: Phaser.Scene, 
    x: number, 
    y: number, 
    inventory: InventoryManager, 
    isPlayer: boolean,
    entity: any
  ) {
    super(scene, x, y)

    this.inventory = inventory
    this.entity = entity
    this.itemElements = new Map()

    const panel = isPlayer ? this.createUserBackground(scene) : this.createNPCBackground(scene)
    panel.setScale(isPlayer ? 0.5 : 1)
    this.add(panel)

    this.createBacks(scene, isPlayer)

    const grid = new Phaser.GameObjects.Grid(scene, 0, 0, 40, 40, 4, 7)
    grid.setScale(0.5)
    this.add(grid)

    this.inventory.getAllItems().forEach((item, index) => {
      const itemElement = this.createItemElement(item, item.inventoryIndex)
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

    itemElement.setSize(40, 40)
    itemElement.setInteractive()
        
    itemElement.on('pointerdown', () => {
      console.log("Inventory inventory Item", item.item.name, this.entity.name)
      this.inventory.removeItem(item.item, 1)
      this.updateSingleItem(itemElement, item)
    }, this)

    return itemElement
  }

  public updateInventoryUI() {
    this.inventory.getAllItems().forEach((item) => {
      const itemElement = this.itemElements.get(item)

      // Update the quantity label for the item
      const quantityLabel = itemElement?.getAt(1) as Phaser.GameObjects.Text
      if (!quantityLabel) return
      quantityLabel.setText(`x${item.quantity}`)
    })
  }

  public updateSingleItem(itemElement: any, item: any) {
    const quantityLabel = itemElement?.getAt(1) as Phaser.GameObjects.Text
    if (!quantityLabel) return

    if (item.quantity === 1)
      quantityLabel.setText('')
    else if (item.quantity <= 0) {
      this.itemElements.delete(item)
      console.log("remove element", this.itemElements)
    }
    else 
      quantityLabel.setText(`x${item.quantity}`)
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
      400, 
      300, 
      0x000000,
      0.5
    )
  }

  private createBacks(scene: Phaser.Scene, isPlayer: boolean) {
    const back = new Phaser.GameObjects.Rectangle(
      scene, 
      -148, 
      0, 
      100, 
      300, 
      0x000000,
      0.5
    )
    const back2 = new Phaser.GameObjects.Rectangle(
      scene, 
      152, 
      0, 
      100, 
      300, 
      0x000000,
      0.5
    )

    if (isPlayer) {
      this.add(back)      
      this.add(back2)
    }
  }
}