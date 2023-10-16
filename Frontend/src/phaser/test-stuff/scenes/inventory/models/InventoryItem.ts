import type { Item } from './Item'

export class InventoryItem {
  public item: Item
  public row: number
  public col: number
  public isDragging: boolean
  public amount: number

  constructor(
    item: Item, 
    row: number,
    col: number,
    isDragging: boolean,
    amount: number
  ) {
    this.item = item
    this.row = row
    this.col = col
    this.isDragging = isDragging
    this.amount = amount
  }
}