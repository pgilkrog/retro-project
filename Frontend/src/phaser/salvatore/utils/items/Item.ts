import type { ItemTypes } from "../../interfaces/enums"

export class Item {
  public name: string
  public description: string
  public type: ItemTypes
  public value: number

  constructor(name: string, description: string, type: ItemTypes, value: number) {
    this.name = name
    this.description = description
    this.type = type
    this.value = value
  }
}
