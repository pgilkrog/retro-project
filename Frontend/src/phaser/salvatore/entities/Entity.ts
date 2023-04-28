import { InventoryManager } from "../utils/inventory/InventoryManager"
import { ItemsManager, FoodItem, Item } from "../utils/items/index"
import type { EntityTypes } from "../interfaces/enums"

export class Entity extends Phaser.Physics.Arcade.Sprite {
  public health: number
  public maxHealth: number
  public respect: number
  public entityType: EntityTypes
  public speed: number

  public inventory: InventoryManager
  public itemsManager: ItemsManager

  constructor(
    scene: Phaser.Scene, 
    x: number, 
    y: number, 
    sprite: string, 
    health: number, 
    maxHealth: number, 
    respect: number, 
    speed: number,
    entityType: EntityTypes
  ) {
    super(scene, x, y, sprite)
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.health = health
    this.maxHealth = maxHealth
    this.respect = respect
    this.speed = speed
    this.entityType = entityType

    this.inventory = new InventoryManager()
    this.itemsManager = new ItemsManager()
    
    this.init()
  }

  init() {
    this.setCollideWorldBounds(true)
    this.body.setSize(40, 20, true)
    this.body.setOffset(0, 80)
    this.setScale(0.6)
    this.setInteractive()
    this.setImmovable(true)
  }
}