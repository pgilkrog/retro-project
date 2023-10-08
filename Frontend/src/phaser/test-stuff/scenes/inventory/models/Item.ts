import type Phaser from 'phaser'

export class Item {
  public name: string
  public sprite: Phaser.GameObjects.Image | null
  public description?: string
  public width: number
  public height: number
  public amount: number
  public maxStack: number

  constructor(
    name: string,
    sprite: Phaser.GameObjects.Image | null,
    description: string,
    width: number, 
    height: number,
    amount: number, 
    maxStack: number
  ) {
    this.name = name
    this.sprite = sprite
    this.description = description
    this.width = width
    this.height = height
    this.amount = amount
    this.maxStack = maxStack
  }
}