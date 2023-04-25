export enum ItemTypes {
  weapon, 
  food,
  money,
  alcohol,
  trash
}

export class Item {
  public name: string
  public type: ItemTypes

  constructor(name: string, type: ItemTypes) {
    this.name = name
    this.type = type
  }
}