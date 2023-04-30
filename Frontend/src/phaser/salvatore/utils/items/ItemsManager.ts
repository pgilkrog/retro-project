import { FoodItem } from './itemTypes/FoodItem'
import type { Item } from './Item'
import { WeaponItem } from './itemTypes/WeaponItem'
import { AlchoholItem } from './itemTypes/AlchoholItem'

export class ItemsManager {
  private foodItems: Item[] = []
  private weaponItems: Item[] = []
  private alchoholItems: Item[] = []

  constructor() {
    this.initFoodItems()
    this.initWeaponItems()
  }

  initFoodItems() {
    this.createFoodItem(
      new FoodItem(
        "Bread", 
        "A loaf of bread", 
        5, 
        10,
        0.2
      )
    )

    this.createFoodItem(
      new FoodItem(
        'Apple', 
        'A lovely red apple', 
        5, 
        10,
        0.1
      )
    )    
  }

  initWeaponItems() {
    this.createWeaponItem(
      new WeaponItem(
        'Sawed Off', 
        'Sawed off shotgun for damage', 
        10, 
        50, 
        2.3
      )
    )
  }

  createFoodItem(item: FoodItem): void {
    const foodItem = new FoodItem(item.name, item.description, item.value, item.healing, item.weight)

    this.foodItems.push(foodItem)
  }

  createWeaponItem(item: WeaponItem): void {
    const weaponItem = new WeaponItem(item.name, item.description, item.value, item.damage, item.weight)

    this.weaponItems.push(weaponItem)  
  }

  createAlchoholItem(item: AlchoholItem): void {
    const alchoholItem = new AlchoholItem(item.name, item.description, item.value, item.weight)
  }

  getFoodItems(): Item[] {
    return this.foodItems
  }

  getWeaponItems(): Item[] {
    return this.weaponItems
  }

  getAlchoholItems(): Item[] {
    return this.alchoholItems
  }
}
