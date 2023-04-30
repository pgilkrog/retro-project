import type { Item } from "../items"

export class InventoryItem {
  public item: Item
  public quantity: number

  constructor(item: Item, quantity: number) {
    this.item = item
    this.quantity = quantity
  }
}