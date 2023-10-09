import type { Item } from './Item'

export class InventoryItem {
  public item: Item
  public row: number
  public col: number
  public isDragging: boolean

  constructor(
    item: Item, 
    row: number,
    col: number,
    isDragging: boolean
  ) {console.log('InventoryItem constructor called:', item, row, col, isDragging);
    
    this.item = item
    this.row = row
    this.col = col
    this.isDragging = isDragging
  }
}