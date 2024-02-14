import type Phaser from 'phaser'

export class Item {
  public id: number
  public name: string
  public sprite: Phaser.GameObjects.Image | null
  public description?: string
  public width: number
  public height: number 
  public maxStack: number
  public text: Phaser.GameObjects.Text | null
  public isEquippable: boolean
  public isUseable: boolean

  constructor(
    id: number,
    name: string,
    sprite: Phaser.GameObjects.Image | null,
    description: string,
    width: number, 
    height: number, 
    maxStack: number,
    text: Phaser.GameObjects.Text  | null,
    isEquippable: boolean,
    isUseable: boolean
  ) {
    this.id = id
    this.name = name
    this.sprite = sprite
    this.description = description
    this.width = width
    this.height = height
    this.maxStack = maxStack
    this.text = text
    this.isEquippable = isEquippable
    this.isUseable = isUseable
  }
}


