import type { Item } from "../items"

export class InventoryItem {
  public item: Item
  public quantity: number
  public inventoryIndex: number

  constructor(item: Item, quantity: number, inventoryIndex: number) {
    this.item = item
    this.quantity = quantity
    this.inventoryIndex = inventoryIndex
  }
}