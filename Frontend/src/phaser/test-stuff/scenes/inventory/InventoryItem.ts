import type { Item } from './Item'

export class InventoryItem {
  public item: Item
  public row: number
  public col: number
  public width: number
  public height: number
  public isDragging: boolean
  public amount: number
  public maxStack: number

  constructor(
    item: Item, 
    row: number,
    col: number,
    width: number, 
    height: number,
    isDragging: boolean,
    amount: number, 
    maxStack: number
  ) {
    this.item = item
    this.row = row
    this.col = col
    this.width = width
    this.height = height
    this.isDragging = isDragging
    this.amount = amount
    this.maxStack = maxStack
  }
}