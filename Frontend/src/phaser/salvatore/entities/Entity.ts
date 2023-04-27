import { InventoryManager } from "../utils/inventory/InventoryManager"
import { ItemsManager, FoodItem } from "../utils/items/index"

export class Entity extends Phaser.Physics.Arcade.Sprite {
  public health: number
  public maxHealth: number
  public respect: number
  public inventory: InventoryManager

  constructor(scene: Phaser.Scene, x: number, y: number, sprite: string, health: number, maxHealth: number, respect: number) {
    super(scene, x, y, sprite)
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.health = health
    this.maxHealth = health
    this.respect = respect
    this.inventory = new InventoryManager()
    
    this.init()
  }

  init() {
    this.setCollideWorldBounds(true)
    this.body.setSize(40, 20, true)
    this.body.setOffset(5, 80)
    this.setScale(0.6)
    this.setInteractive()
    this.setImmovable(true)
    const itemsMan = new ItemsManager()
    itemsMan.createFoodItem(new FoodItem("Bread", "A loaf of bread", 5, 10))
    this.inventory.addItem(itemsMan.getFoodItems()[0], 1)
  }
}