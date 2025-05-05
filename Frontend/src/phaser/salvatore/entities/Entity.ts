import { InventoryManager } from '../utils/inventory/InventoryManager'
import { ItemsManager } from '../utils/items/index'
import type { EntityTypes } from '../interfaces/enums'
import { InventoryUI } from '../utils/inventory/InventoryUI'

export class Entity extends Phaser.Physics.Arcade.Sprite {
  public health: number
  public maxHealth: number
  public respect: number
  public insight: number
  public entityType: EntityTypes
  public speed: number
  public carryWeight: number
  public name: string

  public inventory: InventoryManager
  public itemsManager: ItemsManager
  protected invUI: InventoryUI

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    sprite: string,
    health: number,
    maxHealth: number,
    respect: number,
    speed: number,
    entityType: EntityTypes,
    carryWeight: number,
    name: string
  ) {
    super(scene, x, y, sprite)
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.health = health
    this.maxHealth = maxHealth
    this.respect = respect
    this.speed = speed
    this.entityType = entityType
    this.insight = 1
    this.carryWeight = carryWeight
    this.name = name

    this.inventory = new InventoryManager()
    this.itemsManager = new ItemsManager()

    this.init()
  }

  init() {
    this.setCollideWorldBounds(true)
    this.body?.setSize(40, 20, true)
    this.body?.setOffset(0, 80)
    this.setScale(0.6)
    this.setInteractive()
  }

  createInventory(scene: Phaser.Scene, isPlayer: boolean) {
    this.invUI = new InventoryUI(scene, 400, 250, this.inventory, isPlayer, this)
    scene.add.existing(this.invUI)
  }

  toggleInventory(show: boolean) {
    this.invUI.setVisible(show)
    this.invUI.setPosition(this.x, this.y)
  }

  pathfinding(path: Phaser.Math.Vector2[]) {}
}
