import type { ItemTypes } from "../../interfaces/enums"

export class Item {
  public name: string
  public description: string
  public type: ItemTypes
  public value: number 
  public weight: number
  public image: string

  constructor(
    name: string, 
    description: string, 
    type: ItemTypes, 
    value: number,
    weight: number,
    image: string
  ) {
    this.name = name
    this.description = description
    this.type = type
    this.value = value
    this.weight = weight
    this.image = image
  }
}
