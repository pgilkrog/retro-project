import { Item } from '../index'
import { ItemTypes } from '@/phaser/salvatore/interfaces/enums'

export class WeaponItem extends Item {
  public damage: number

  constructor(name: string, description: string, value: number, damage: number) {
    super(name, description, ItemTypes.weapon, value)
    this.damage = damage
  }
}