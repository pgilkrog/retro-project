import { Item } from './models/Item'
import type Phaser from 'phaser'

export class ItemsManager {
  private items: Item[] = []
  private scene: Phaser.Scene

  constructor(scene: Phaser.Scene) {
    this.scene = scene
  }

  initItems() {
    this.create1by1()
    this.create1by2()
    this.create2by2()
    this.create4by2()    
  }

  create1by1() {
    const newItem = new Item(
      '1 by 1', 
      this.scene.add.image(
        1300,
        100,
        'ball'
      ),
      'a tiny box',
      1,
      1,
      2,
      20
    )

    return newItem
  }

  create1by2() {
    const newItem = new Item(
      '1 by 2', 
      this.scene.add.image(
        1300,
        300,
        'paddle'
      ),
      'a box that is more longer than wide',
      1,
      2,
      1,
      10
    )

    return newItem
  }

  create2by2() {
    const newItem = new Item(
      '2 by 2', 
      this.scene.add.image(
        1300,
        500,
        'bigBox'
      ),
      'a tiny box',
      2,
      2,
      2,
      5
    )

    return newItem
  }

  create4by2() {
    const newItem = new Item(
      '4 by 2', 
      this.scene.add.image(
        1300,
        700,
        'largeBox'
      ),
      'a tiny box',
      4,
      2,
      1,
      1
    )

    return newItem
  }

  getItems(): Item[] {
    return this.items
  }
}