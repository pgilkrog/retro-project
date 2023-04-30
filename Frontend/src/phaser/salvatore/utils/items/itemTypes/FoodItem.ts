import { Item } from '../index'
import { ItemTypes } from '@/phaser/salvatore/interfaces/enums'

export class FoodItem extends Item {
  public healing: number

  constructor(
    name: string, 
    description: string, 
    value: number,
    weight: number, 
    healing: number
  ) {
    super(
      name, 
      description, 
      ItemTypes.food, 
      value,
      weight
    )
    this.healing = healing
  }
}