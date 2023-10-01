import type { Item } from '../items'
import { InventoryItem } from './InventoryItem'

export class InventoryManager {
  private items: InventoryItem[] = []

  public addItem(item: Item, quantity: number, inventoryIndex: number) {
    const invItem = this.getItemFromInventory(item)

    if (invItem)
      invItem.quantity += quantity
    else
      this.items.push(new InventoryItem(item, quantity, inventoryIndex))
  }

  public removeItem(item: Item, quantity: number) {
    const invItem = this.getItemFromInventory(item)

    if (invItem) {
      invItem.quantity -= quantity
      if (invItem.quantity <= 0) {
        console.log("DELTED ITEM")
        const index = this.items.indexOf(invItem)
        this.items.splice(index, 1)
      }
    }
  }

  public checkHasItem(item: Item, quantity: number): boolean {
    const invItem = this.getItemFromInventory(item)
    return !!invItem && invItem.quantity >= quantity
  }

  public clearInventory() {
    this.items = []
  }

  public getItemFromInventory(item: Item): InventoryItem | undefined {
    return this.items.find(invItem => invItem.item.name === item.name)
  }

  public getAllItems(): InventoryItem[] {
    return this.items
  }
}