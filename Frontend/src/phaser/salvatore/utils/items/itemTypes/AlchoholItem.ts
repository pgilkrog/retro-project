import { ItemTypes } from "@/phaser/salvatore/interfaces/enums";
import { Item } from "../Item";

export class AlchoholItem extends Item {
  constructor(
    name: string, 
    description: string, 
    value: number,
    weight: number
  ) {
    super(
      name, 
      description, 
      ItemTypes.alcohol, 
      value,
      weight
    )
  }
}