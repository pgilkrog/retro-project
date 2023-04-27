import { FoodItem } from './itemTypes/FoodItem'
import type { Item } from './Item'
import { WeaponItem } from './itemTypes/WeaponItem'

export class ItemsManager {
  private foodItems: Item[] = []
  private weaponItems: Item[] = []

  constructor() {
    
  }

  createFoodItem(item: FoodItem): void {
    const foodItem = new FoodItem(item.name, item.description, item.value, item.healing)

    this.foodItems.push(foodItem)
  }

  createWeaponItem(item: WeaponItem): void {
    const weaponItem = new WeaponItem(item.name, item.description, item.value, item.damage)

    this.weaponItems.push(weaponItem)  
  }

  getFoodItems(): Item[] {
    return this.foodItems
  }

  getWeaponItems(): Item[] {
    return this.weaponItems
  }
}
