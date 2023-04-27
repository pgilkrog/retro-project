import { Item, ItemTypes } from '../index'

export class FoodItem extends Item {
  public healing: number

  constructor(name: string, description: string, value: number, healing: number) {
    super(name, description, ItemTypes.food, value)
    this.healing = healing
  }
}