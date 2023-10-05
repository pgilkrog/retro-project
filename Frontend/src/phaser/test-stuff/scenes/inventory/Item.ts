import type Phaser from 'phaser'

export class Item {
  public name: string
  public sprite: Phaser.GameObjects.Image | null
  public description?: string

  constructor(
    name: string,
    sprite: Phaser.GameObjects.Image | null,
    description: string
  ) {
    this.name = name
    this.sprite = sprite
    this.description = description
  }
}